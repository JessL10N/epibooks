import React, { createContext, useState, useEffect } from "react";

// Crea un contesto per il tema
const ThemeContext = createContext();

// Componente provider che gestisce lo stato del tema
const ThemeProvider = ({ children }) => {
  // Stato per gestire la modalità light/dark
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Carica la preferenza dal localStorage (se esiste)
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  // Funzione per alternare tra light e dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Salva la modalità nel localStorage e applica le classi al body
  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("bg-dark", "text-light");
      document.body.classList.remove("bg-light", "text-dark");
    } else {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("bg-dark", "text-light");
      document.body.classList.add("bg-light", "text-dark");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Esporta il contesto e il provider
export { ThemeContext, ThemeProvider };
