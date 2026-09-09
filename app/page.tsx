"use client";


import { useState } from "react";


type Tarea = {
  id: number;
  texto: string;
  completada: boolean;
};


export default function Home() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [papelera, setPapelera] = useState<Tarea[]>([]);


  function agregarTarea() {
    if (tarea.trim() === "") {
      return;
    }


    const nuevaTarea: Tarea = {
      id: Date.now(),
      texto: tarea,
      completada: false,
    };


    setTareas([...tareas, nuevaTarea]);
    setTarea("");
  }


  function completarTarea(id: number) {
    setTareas(
      tareas.map((t) =>
        t.id === id
          ? { ...t, completada: !t.completada }
          : t
      )
    );
  }


  function eliminarTarea(id: number) {
    const tareaEliminada = tareas.find((t) => t.id === id);


    if (tareaEliminada) {
      setPapelera([...papelera, tareaEliminada]);
      setTareas(tareas.filter((t) => t.id !== id));
    }
  }


  return (
    <main>
      <h1>Mi To Do List</h1>


      <p className="contador">
        Tareas: {tareas.length}
      </p>


      <input
        type="text"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        placeholder="Escribe una tarea"
      />


      <button onClick={agregarTarea}>
        Agregar
      </button>


      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <input
              type="checkbox"
              checked={tarea.completada}
              onChange={() => completarTarea(tarea.id)}
            />


            <span
              style={{
                textDecoration: tarea.completada
                  ? "line-through"
                  : "none",
              }}
            >
              {tarea.texto}
            </span>


            <button onClick={() => eliminarTarea(tarea.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <h2>Papelera</h2>
      <ul>
        {papelera.map((tarea) => (
          <li key={tarea.id}>
            <span>{tarea.texto}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
