// import React, { createContext, useState, useContext } from "react";

// // Create the context
// const LoaderContext = createContext();

// // Create a custom hook to use the loader context
// export const useLoader = () => useContext(LoaderContext);

// // LoaderProvider component that wraps your application
// export const LoaderProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const showLoader = () => setIsLoading(true);
//   const hideLoader = () => setIsLoading(false);

//   return (
//     <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
//       {children}
//     </LoaderContext.Provider>
//   );
// };
