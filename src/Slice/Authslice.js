import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ userId, password }, { rejectWithValue }) => {
    try {
      const credentials = { userName: userId, password };
      const response = await axios.post(`${baseURL}auth/generate-token`, credentials);
      const token = response.data.token;
      const name = response.name;
      const role = response.data.role[0].authority;
      const UserId =response.userId;

      localStorage.setItem("Authtoken", token);
     console.log(role,"roleee")
      return { response,role, isAuthenticated: true };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
      token: localStorage.getItem("Authtoken") || null,
      isAuthenticated: !!localStorage.getItem("Authtoken"),
      loading: false,
      error: null
    },
    reducers: {
      logout: (state) => {
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("Authtoken");
      }
    },
    extraReducers: (builder) => {
      builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = action.payload.isAuthenticated; // Ensure this is true
        state.loading = false;
      })      
    }
  });
  

export const { logout } = authSlice.actions;
export default authSlice.reducer;
