import React from "react";

export default function Button({ id, value, onClick, className }) {
  return (
    <button
      id={id}
      className={`btn ${className}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
}

