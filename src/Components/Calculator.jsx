import React, { useState } from "react";
import Button from "./Button";
import Display from "./Display";
import { buttons } from "../data/buttons";

export default function Calculator() {
  const [input, setInput] = useState("0");
  const [isResult, setIsResult] = useState(false);
  const getButtonClass = (value) => {
  if (value === "=") return "btn-success mt-2";    
  if (value === "AC") return "btn-danger mt-2";     ; 
  return "btn-secondary mt-2";
};


  const handleClick = (value) => {
  const operators = ["+", "-", "*", "/"];
  const lastChar = input[input.length - 1];
  const secondLastChar = input[input.length - 2];

  // Reinicia la calculadora
  if (value === "AC") {
    setInput("0");
    setIsResult(false);
    return;
  }

  // Evalúa la expresión
  if (value === "=") {
    try {
      const result = eval(input);
      setInput(result.toString());
      setIsResult(true); // Marca que se mostró un resultado
    } catch (error) {
      console.error("Error al evaluar:", error);
      setInput("Error");
      setIsResult(true);
    }
    return;
  }

  // Si se mostró un resultado y se presiona un número, reinicia
  if (isResult && !operators.includes(value) && value !== ".") {
    setInput(value);
    setIsResult(false);
    return;
  }

  // Manejo de operadores consecutivos
  if (operators.includes(value)) {
    if (operators.includes(lastChar)) {
      // Permite secuencia como "5 + -"
      if (value === "-" && lastChar !== "-") {
        setInput(input + value);
        setIsResult(false);
        return;
      }

      // Si hay dos operadores seguidos, reemplaza ambos por el nuevo
      if (operators.includes(secondLastChar)) {
        setInput(input.slice(0, -2) + value);
        setIsResult(false);
        return;
      }

      // Reemplaza el último operador por el nuevo
      setInput(input.slice(0, -1) + value);
      setIsResult(false);
      return;
    }

    // Añade operador normalmente
    setInput(input + value);
    setIsResult(false);
    return;
  }

  // Previene múltiples puntos decimales en el mismo número
  if (value === ".") {
    const parts = input.split(/[+\-*/]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes(".")) return;
  }

  // Reemplaza el "0" inicial por el nuevo número
  if (input === "0" && value !== ".") {
    setInput(value);
  } else {
    setInput(input + value);
  }

  setIsResult(false); // Siempre que se agregue algo, ya no estamos en modo resultado
};


  return (
    <div className="calculator container mt-5">
      <Display  value={input} />
      <div className="row">
        {buttons.map((btn) => (
          <div className="col-4 mb-2" key={btn.id}>
          <Button
            key={btn.id}
            {...btn}
            onClick={() => handleClick(btn.value)}
            className={`${getButtonClass(btn.value)} w-100 py-3 fs-5`}
          />
          </div>
        ))}
      </div>
    </div>
  );
}
