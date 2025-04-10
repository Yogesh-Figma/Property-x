import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL, 
  // baseURL: "https://bma-staging-api.virtualintelligence.co.in/api/", 
  //  baseURL : "http://13.127.174.62:8181/",
   baseURL : "http://13.127.174.62:8282/",
  //  baseURL : "http://localhost:8181/",
  timeout: 5000, 
});

// Flag to track refresh status
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

// Attach access token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const storedToken = localStorage.getItem('Authtoken');
    if (storedToken) {
      config.headers['x-auth-token'] = storedToken; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors, including token refresh
axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['x-auth-token'] = token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('RefreshToken');
        if (!refreshToken) {
          throw new Error("No refresh token available.");
        }

        // const response = await axios.post("http://13.127.174.62:8181/auth/refresh-token", { refreshToken });
        const response = await axios.post("http://13.127.174.62:8282/auth/refresh-token", { refreshToken });
        // const response = await axios.post("https://bma-staging-api.virtualintelligence.co.in/api/auth/refresh-token", { refreshToken });

        const newAccessToken = response.data.accessToken;
        localStorage.setItem('Authtoken', newAccessToken);

        axiosInstance.defaults.headers.common['x-auth-token'] = newAccessToken;

        processQueue(null, newAccessToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        console.error('Refresh token expired. Redirecting to login...');
        localStorage.removeItem('Authtoken');
        localStorage.removeItem('RefreshToken');
        window.location.href = '/login'; // Redirect to login
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
