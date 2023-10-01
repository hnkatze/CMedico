import { useState } from "react";
import '../css/consulta.css'

function AddConsulta({isOpen, isClose, }){
 const [nombre, setNombre] = useState('');
 const [apellido, setApellido] = useState('');
 const [fecha, setFecha] = useState('');
 const [hora, setHora] = useState('');
 const [sintomas, setSintomas] = useState('');

 const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nombre:', nombre);
    console.log('Apellido:', apellido);
    console.log('Fecha:', fecha);
    console.log('Hora:', hora);
    console.log('Síntomas:', sintomas);
 };

 return (
  isOpen && (
    <div className="consulta-form-container">
  <h1>Agregar Consulta</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>
          Apellido:
          <input type="text" 
          value={apellido} 
          onChange={(e) => setApellido(e.target.value)} />
        </label>
        <label>
          Fecha:
          <input type="date" 
          value={fecha} 
          onChange={(e) => setFecha(e.target.value)} />
        </label>
        <label>
          Hora:
          <input type="time" 
          value={hora} onChange={(e) => 
          setHora(e.target.value)} />
        </label>
        <label>
          Sintomas:
          <textarea value={sintomas} 
          onChange={(e) => setSintomas(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Agregar Consulta</button>
        <button type="button" onClick={isClose}>Cerrar</button>
    </form>
    </div>
 )
 ); 
}

export default AddConsulta;