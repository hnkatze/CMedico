import { useState } from "react";
import "../css/addconsulta.css";

function AddConsulta({ isClose, onSubmit }) {
  const [newFolio, setFolio] = useState(0);
  const [newUsedMedic, setUsedMedic] = useState(0);
  const [newCell, setCell] = useState(0);
  const [newName, setName] = useState("");
  const [newProce, setProce] = useState("");
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
    setCell(0);
    setFolio(0);
    setProce("");
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
      cell: newCell,
      Proce: newProce,
      Folio: newFolio,
      commit: newCommit,
      medicUsed: newUsedMedic,
    };
    onSubmit(newProductData);
    resetForm();
  };

  return (
    <div className="consulta-form-container">
      <h1>Agregar Consulta</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label>
              Nombre:
              <input
                type="text"
                placeholder="Ingrese un nombre"
                value={newName}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="col">
            <label>
              Apellido:
              <input
                type="text"
                placeholder="Ingrese un apellido"
                value={newLastName}
                onChange={(e) => setLastname(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>
              Numero/Folio:
              <input
                type="number"
                placeholder="Ingrese un número de folio"
                value={newFolio}
                onChange={(e) => setFolio(Number(e.target.value))}
              />
            </label>
          </div>
          <div className="col">
            <label>
              Numero/Telefono:
              <input
                type="number"
                placeholder="Ingrese un número de teléfono"
                value={newCell}
                onChange={(e) => setCell(Number(e.target.value))}
              />
            </label>
          </div>
        </div>
        <label>
          Edad:
          <input
            type="number"
            placeholder="Ingrese la edad"
            value={newAge}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </label>
        <label>
          Fecha:
          <input
            type="date"
            placeholder="Seleccione una fecha"
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
          Procedencia:
          <textarea
            value={newProce}
            onChange={(e) => setProce(e.target.value)}
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
