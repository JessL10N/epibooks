import React, { useContext } from "react";
import { Button } from "react-bootstrap"; // Bootstrap button
import { ThemeContext } from "./context"; // Importa il ThemeContext

const ThemeToggle = () => {
  // Usa il contesto per ottenere lo stato e la funzione per alternare il tema
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

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
