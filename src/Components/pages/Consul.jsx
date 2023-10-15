import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import Navy from "./navbar";
import "../css/consul.css";
import { AddUsedProduct, updateCommit } from "../helpers";
import { Form, Table } from "react-bootstrap";

function Consul() {
  const [consulta, setConsulta] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [productConsulta, setProductConsulta] = useState([]);
  const [boOpen, setBoOpen] = useState(false);
  const [newCommit, setNewCommit] = useState("");

  const colect = () => {
    updateCommit(id, newCommit);
    addComment(newCommit);
    boClose();
  };
  const { id } = useParams();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeIsOpen = () => {
    setIsOpen(false);
  };
  const openBoModal = () => {
    setBoOpen(true);
  };
  const boClose = () => {
    setBoOpen(false);
  };
  useEffect(() => {
    const fetchMedicamentosConsulta = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "usedProduct"), where("idConsulta", "==", id))
      );
      const medicamentos = querySnapshot.docs.map((doc) => doc.data());

      setProductConsulta(medicamentos);
    };

    fetchMedicamentosConsulta();
  }, [id]);

  const fetchConsulta = async () => {
    const consultaDocRef = doc(db, "consultas", id);
    const consultaSnapshot = await getDoc(consultaDocRef);
    if (consultaSnapshot.exists()) {
      setConsulta(consultaSnapshot.data());
    } else {
      console.log("No existe una consulta con ese ID!");
    }
  };
  useEffect(() => {
    fetchConsulta();
  }, [id]);

  if (!consulta) return null;
  const addProductList = (newProduct) => {
    setProductConsulta([...productConsulta, newProduct]);
  };
  const addComment = (newComment) => {
    setProductConsulta([...productConsulta, { commit: newComment }]);
    fetchConsulta();
  };
  return (
    <>
      <Navy />
      <div className="center-content">
        <div className="card">
          <div className="card-header">
            <h3>Detalles de la Consulta</h3>
          </div>
          <div className="card-body">
            <p className="card-text">Folio: #{consulta.Folio}</p>
            <h2 className="card-title">
              {consulta.name} {consulta.lastName}
            </h2>
            <ul className="list-unstyled">
              <li>
                <strong>Edad:</strong> {consulta.age} años
              </li>
              <li>
                <strong>Teléfono:</strong> {consulta.cell}
              </li>
              <li>
                <strong>Fecha:</strong> {consulta.date}
              </li>
              <li>
                <strong>Hora:</strong> {consulta.time}
              </li>
              <li>
                <strong>Procedencia:</strong> {consulta.Proce}
              </li>
              <li>
                <strong>Comentario:</strong> {consulta.commit}
              </li>
            </ul>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary" onClick={openModal}>
              Agregar Medicamento
            </button>
            <button className="btn btn-primary" onClick={openBoModal}>
              Comentar
            </button>
          </div>
        </div>
        <dialog open={isOpen}>
          <AddUsedProduct
            closeIsOpen={closeIsOpen}
            idConsulta={id}
            onProductUsed={addProductList}
          />
        </dialog>
        <dialog open={boOpen}>
          <div className="modal-background" id="modal">
            <div className="modal-content">
              <span className="modal-close" onClick={boClose}>
                &times;
              </span>
              <h2 className="modal-title">Agregar Comentario</h2>
              <Form.Control
                as="textarea"
                value={newCommit}
                onChange={(e) => setNewCommit(e.target.value)}
                style={{
                  maxHeight: "200px",
                  minHeight: "50px",
                  resize: "vertical",
                }}
              />
              <div>
                <button className="modal-button" onClick={colect}>
                  Agregar Comentario
                </button>
                <button className="modal-button secondary" onClick={boClose}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </dialog>
        <Table striped bordered hover className="table custom-table">
          <thead>
            <tr>
              <th>Nombre Del Medicamento</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {productConsulta.map((medicamento, index) => (
              <tr key={index}>
                <td>{medicamento.nameProduct}</td>
                <td>{medicamento.usedAmount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Consul;
