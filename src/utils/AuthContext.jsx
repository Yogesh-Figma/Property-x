// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem('token') || null);

//   const saveToken = (token) => {
//     localStorage.setItem('token', token);
//     setToken(token);
//   };

//   return (
//     <AuthContext.Provider value={{ token, saveToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

