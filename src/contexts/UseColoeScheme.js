import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  // Check local storage or system preference for initial theme
  const getPreferredTheme = () => {
    if (typeof window === "undefined") return false; // Ensure window is available (for SSR)

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme === "dark";
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [isDarkMode, setIsDarkMode] = useState(getPreferredTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark"); // For Tailwind users
    } else {
      root.setAttribute("data-theme", "light");
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
