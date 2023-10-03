import { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './css/Inventory.css';
import{ db } from "../config/firebase";
import { getDocs, collection, addDoc} from 'firebase/firestore'
import { deleteProduct } from './helpers/deleteProduct';
import { updateAmount, updateEndDate, updateName } from './helpers/updateProduct';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navy from './navbar';
import AddProduct from './helpers/AddProduct';

function Inventor() {
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpOpen, setIsModalUpOpen] = useState(false);
  const productCollectionRef = collection(db, "products");
  const [updateProductName, setUpdateProductName] = useState("");
  const [updateProductAmount, setUpdateProductAmount] = useState(0);
  const [updateProductEndDate, setUpdateProductEndDate] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalUp = (productId) => {
    setEditingProductId(productId);
    setIsModalUpOpen(true);
  }; 
  const closeModalUp = () => {
    setEditingProductId(null); 
    setIsModalUpOpen(false);
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

const handleUpdate = async () => {
  try {
    await updateName(editingProductId, updateProductName);
    await updateAmount(editingProductId, updateProductAmount);
    await updateEndDate(editingProductId, updateProductEndDate);

    closeModalUp();
    getProductList(setProductList);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  }
};


const handleAddProduct = async (newProductData) => {
  try {    
    await addDoc(productCollectionRef, newProductData);
    const newProduct = {
             ...newProductData,
             id: Math.random().toString()
           };
    setProductList(prevList => [...prevList, newProduct]);
    setIsModalOpen(false);
  } catch (error) {
    console.error("Error al agregar el producto:", error);

  }
};

const [searchTerm, setSearchTerm] = useState("");
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};
const filteredProducts = searchTerm
  ? productList.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  : productList;

  const dateget = (startDate) => {
    const dia = startDate.getDate();
    const mes = startDate.getMonth() + 1;
    const year = startDate.getFullYear();
  
    return dia + "/" + mes + "/" + year;
  }

return (
<>
<Navy/>
<div className="Inventory">
<input
  type="text"
  placeholder="Buscar producto..."
  value={searchTerm}
  onChange={handleSearchChange}
  className="search-input" // Agrega la clase CSS aquí
/>
<button type='button' onClick={openModal}>Agregar Producto</button>
  <div className="product-list">
  <table>
  <thead>
    <tr>
      <th>Marca</th>
      <th>Nombre</th>
      <th>Cantidad</th>
      <th>Vencimiento</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
      {filteredProducts.map((product) => (
        <tr key={product.id}>
          <td>{product.brand}</td>
          <td>{product.name}</td>
          <td>{product.amount}</td>
          <td>{product.endDate}</td>
          <td>
            <button className="delete-button" onClick={() => deleteProduct(setProductList,product.id)}>
              <FaTrash />
            </button>
            <button type='button' className="update-button" onClick={() => openModalUp(product.id)}>
              <FaEdit />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
</table>
    </div>
  </div>
  <dialog open={isModalUpOpen}>
  <div className="modal">
    <div className="form-container">
      <input
        className="form-input"
        placeholder="Cambiar Nombre..."
        value={updateProductName}
        onChange={(e) => setUpdateProductName(e.target.value)}
      />
      <input
        className="form-input"
        placeholder="Cambiar Cantidad..."
        value={updateProductAmount}
        onChange={(e) => setUpdateProductAmount(e.target.value)}
      />
      <div>
          <label htmlFor="">Cambiar Fecha De Vencimiento</label>
         <DatePicker selected={startDate} onChange={(e) => {setStartDate(e); setUpdateProductEndDate(dateget(e));}} />
          </div>
      <button className="submit-button" onClick={handleUpdate}>
        Actualizar
      </button>
      <button className="close-button" onClick={closeModalUp}>
        Cerrar
      </button>
    </div>
  </div>
  </dialog>
  <AddProduct isopen = {isModalOpen} onclose={setIsModalOpen} onSubmit ={handleAddProduct} />
  </>
);

}

export default Inventor;