import { useEffect, useState } from "react";
import AddConsulta from "./helpers/AddConsulta";
import Navy from "./navbar";
import { getDocs, collection } from "firebase/firestore";
import{ db } from "../config/firebase";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteConsulta } from "./helpers/deleteConsulta";
import '../Components/css/consulta.css'

const Consulta = () => {
const [isOpen, setOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [productList, setProductList] = useState([]);
const [editingProductId, setEditingProductId] = useState(null);
const [isModalUpOpen, setIsModalUpOpen] = useState(false);

const productCollectionRef = collection(db, "consultas");
const openModal = () => {
setOpen(true)
}
const closeModal = () => {
    setOpen(false)
}
const openModalUp = (productId) => {
  setEditingProductId(productId);
  setIsModalUpOpen(true);
}; 
const closeModalUp = () => {
  setEditingProductId(null); 
  setIsModalUpOpen(false);
};
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};
const getProductList = async (setProductList) => {
  try {
    const data = await getDocs(productCollectionRef);
    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setProductList(filteredData);
  } catch (err) {
    console.error(err);
  }
};  
useEffect(() => {
 getProductList(setProductList);
},[]);

const filteredProducts = searchTerm
  ? productList.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  : productList;
  return(
    <>
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
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Fecha</th>
        <th>Hora/Ingreso</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {filteredProducts.map((consultas) => (
        <tr key={consultas.id}>
          <td>{consultas.name}</td>
          <td>{consultas.lastName}</td>
          <td>{consultas.date}</td>
          <td>{consultas.time}</td>
          <td>
            <button className="delete-button" onClick={() => deleteConsulta(setProductList, consultas.id)}>
              <FaTrash />
            </button>
            <button type='button' className="update-button" onClick={() => openModalUp(consultas.id)}>
              <FaEdit />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <dialog className="dialog" open={isOpen}>
  <AddConsulta isClose={closeModal} />
  </dialog>
  
</div>

    
    </>


  ); 
}

export default Consulta;


