import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Navy from "./navbar";
import "./css/consul.css";

function Consul() {
  const [consulta, setConsulta] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchConsulta = async () => {
      const consultaDocRef = doc(db, "consultas", id);
      const consultaSnapshot = await getDoc(consultaDocRef);
      if (consultaSnapshot.exists()) {
        setConsulta(consultaSnapshot.data());
      } else {
        console.log("No existe una consulta con ese ID!");
      }
    };

    fetchConsulta();
  }, [id]);

  if (!consulta) return null;

  return (
    <>
      <Navy />
      <div className="card">
        <h2>
          {consulta.name} {consulta.lastName}
        </h2>
        <h3>Edad: {consulta.age}</h3>
        <p>Fecha: {consulta.date}</p>
        <p>Hora: {consulta.time}</p>
        <p>Comentario: {consulta.commit}</p>
        <button className="btn-add-medicamento">Agregar Medicamento</button>
      </div>
    </>
  );
}

export default Consul;
