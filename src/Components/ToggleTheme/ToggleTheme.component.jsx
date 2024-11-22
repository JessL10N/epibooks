import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap"; // Bootstrap button

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Carica la preferenza della modalità dal localStorage (se presente)
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

  // Salva la modalità selezionata nel localStorage
  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("bg-dark", "text-light"); // Aggiungi la modalità dark usando Bootstrap
    } else {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("bg-dark", "text-light"); // Rimuovi la modalità dark
      document.body.classList.add("bg-light", "text-dark"); // Modalità light usando Bootstrap
    }
  }, [isDarkMode]);

  return (
    <Button
      onClick={toggleTheme}
      variant={isDarkMode ? "light" : "dark"} // Cambia il colore del pulsante a seconda della modalità
      className="mt-3"
    >
      {isDarkMode ? "Modalità Light" : "Modalità Dark"}
    </Button>
  );
};

export default ThemeToggle;
