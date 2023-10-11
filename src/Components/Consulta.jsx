import { useEffect, useState } from "react";
import Navy from "./navbar";
import { db } from "../config/firebase";
import { FaTrash, FaSignInAlt } from "react-icons/fa";
import "../Components/css/consulta.css";
import { Link } from "react-router-dom";
import {
  getDocs,
  collection,
  addDoc,
  message,
  deleteConsulta,
  AddConsulta,
  Card,
  Row,
  Col,
} from "./helpers/";
import { FireOutlined } from "@ant-design/icons";

const Consulta = () => {
  const [isOpen, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const productCollectionRef = collection(db, "consultas");
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const handleAddConsulta = async (newProductData) => {
    try {
      const docRef = await addDoc(productCollectionRef, newProductData);
      const docId = docRef.id;

      const newProductWithId = {
        ...newProductData,
        id: docId,
      };

      setProductList((prevList) => [...prevList, newProductWithId]);
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "Se Agrego La Consulta",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "No Se Pudo Agrego La Consulta",
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const getProductList = async (setProductList) => {
    try {
      const data = await getDocs(productCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getProductList(setProductList);
  }, []);

  const filteredProducts = searchTerm
    ? productList.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : productList;
  return (
    <>
      {contextHolder}
      <Navy />
      <div className="component-container">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button onClick={openModal}>Crear Consulta</button>
        <table>
          <thead>
            <tr>
              <th>#/Folio</th>
              <th>Nombre</th>
              <th>Numero De Telefono</th>
              <th>Fecha</th>
              <th>Hora/Ingreso</th>
              <th>Medicamentos/Usados</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((consultas) => (
              <tr key={consultas.id}>
                <td>{consultas.Folio}</td>
                <td>
                  {consultas.name} {consultas.lastName}
                </td>
                <td>{consultas.cell}</td>
                <td>{consultas.date}</td>
                <td>{consultas.time}</td>
                <td>{consultas.medicUsed}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteConsulta(
                        setProductList,
                        consultas.id,
                        consultas.medicUsed
                      )
                    }
                  >
                    <FaTrash />
                  </button>
                  <Link
                    className="update-button"
                    to={`/Consulta/${consultas.id}`}
                  >
                    {" "}
                    <FaSignInAlt />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <dialog className="dialog" open={isOpen}>
          <AddConsulta isClose={closeModal} onSubmit={handleAddConsulta} />
        </dialog>
      </div>
    </>
  );
};

export default Consulta;
