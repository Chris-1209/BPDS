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

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [textoEditado, setTextoEditado] = useState("");

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

  function iniciarEdicion(tarea: Tarea) {
    setEditandoId(tarea.id);
    setTextoEditado(tarea.texto);
  }

  function guardarEdicion(id: number) {
    if (textoEditado.trim() === "") return;

    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, texto: textoEditado } : t
      )
    );
    setEditandoId(null);
    setTextoEditado("");
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setTextoEditado("");
  }

  const tareasCompletadas = tareas.filter((t) => t.completada).length;

  return (
    <main>
      <h1>Mi To Do List</h1>

      <div className="contadores">
        <p className="contador">Total: {tareas.length}</p>
        <p className="contador">Completadas: {tareasCompletadas} de {tareas.length}</p>
      </div>

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
        {tareas.map((tareaItem) => (
          <li key={tareaItem.id}>
            {editandoId === tareaItem.id ? (
              <>
                <input
                  type="text"
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                />
                <button onClick={() => guardarEdicion(tareaItem.id)}>
                  Guardar
                </button>
                <button onClick={cancelarEdicion}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={tareaItem.completada}
                  onChange={() => completarTarea(tareaItem.id)}
                />

                <span
                  style={{
                    textDecoration: tareaItem.completada
                      ? "line-through"
                      : "none",
                  }}
                >
                  {tareaItem.texto}
                </span>

                <button onClick={() => iniciarEdicion(tareaItem)}>
                  Editar
                </button>
                <button onClick={() => eliminarTarea(tareaItem.id)}>
                  Eliminar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h2 className="papelera-texto">Papelera</h2>
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
