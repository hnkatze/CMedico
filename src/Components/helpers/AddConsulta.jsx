import { useState } from "react";
import "../css/addconsulta.css";

function AddConsulta({ isClose, onSubmit }) {
  const [newName, setName] = useState("");
  const [newLastName, setLastname] = useState("");
  const [newDate, setDate] = useState("");
  const [newAge, setAge] = useState(0);
  const [newTime, setTime] = useState("");
  const [newCommit, setCommit] = useState("");

  const resetForm = () => {
    setName("");
    setLastname("");
    setDate("");
    setAge(0);
    setTime("");
    setCommit("");
  };
  const closeResett = () => {
    resetForm();
    isClose();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newProductData = {
      name: newName,
      lastName: newLastName,
      age: newAge,
      date: newDate,
      time: newTime,
      commit: newCommit,
    };
    onSubmit(newProductData);
    resetForm();
  };

  return (
    <div className="consulta-form-container">
      <h1>Agregar Consulta</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            placeholder="ingrese un nombre"
            value={newName}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            placeholder="ingrese un apellido"
            value={newLastName}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
        <label>
          Edad:
          <input
            type="number"
            placeholder="ingrese un apellido"
            value={newAge}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </label>
        <label>
          Fecha:
          <input
            type="date"
            placeholder="Seleccione fecha"
            value={newDate}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Hora:
          <input
            type="time"
            placeholder="Seleccione una hora"
            value={newTime}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <label>
          Sintomas:
          <textarea
            value={newCommit}
            onChange={(e) => setCommit(e.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Agregar Consulta
        </button>
        <button type="button" onClick={closeResett}>
          Cerrar
        </button>
      </form>
    </div>
  );
}

export default AddConsulta;
