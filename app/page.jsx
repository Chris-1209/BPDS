"use client";
import { useState } from "react";
import "./globals.css";

export default function Home() {
  const [texto, setTexto] = useState("");
  const [tareas, setTareas] = useState([]);

  function agregar() {
    if (texto.trim() === "") return;
    setTareas([...tareas, { id: Date.now(), titulo: texto.trim(), hecha: false }]);
    setTexto("");
  }

  function alternar(id) {
    setTareas(tareas.map(t => t.id === id ? { ...t, hecha: !t.hecha } : t));
  }

  function eliminar(id) {
    setTareas(tareas.filter(t => t.id !== id));
  }

  return (
    <main className="contenedor">
      <h1>To Do List</h1>

      <div className="formulario">
        <input 
          className="caja-input"
          value={texto} 
          onChange={(e) => setTexto(e.target.value)} 
          placeholder="Escribir tarea..."
        />
        <button className="boton-agregar" onClick={agregar}>
          Agregar
        </button>
      </div>

      <ul className="lista">
        {tareas.map(t => (
          <li key={t.id} className="item-tarea">
            <div className="contenido-tarea">
              <input 
                type="checkbox" 
                checked={t.hecha} 
                onChange={() => alternar(t.id)} 
              />
              <span className={t.hecha ? "tachado" : "normal"}>
                {t.titulo}
              </span>
            </div>

            <button className="boton-eliminar" onClick={() => eliminar(t.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </main>
  );
}