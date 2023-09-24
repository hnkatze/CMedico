import { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './css/Inventory.css';
import{ db } from "../config/firebase";
import { getDocs, collection, addDoc} from 'firebase/firestore'
import { deleteProduct } from './helpers/deleteProduct';
import { addProduct } from './helpers/addproduct';
import { updateAmount, updateEndDate, updateName } from './helpers/updateProduct';



function Inventory() {
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpOpen, setIsModalUpOpen] = useState(false);
  const productCollectionRef = collection(db, "products");

const [newProductName, setNewProductName] = useState("");
const [newProductBrand, setNewProductBrand] = useState("");
const [newProductAmount, setNewProductAmount] = useState(0);
const [newProductEndDate, setNewProductEndDate] = useState(0);



const [updateProductName, setUpdateProductName] = useState("");
const [updateProductAmount, setUpdateProductAmount] = useState(0);
const [updateProductEndDate, setUpdateProductEndDate] = useState("");

const [editingProductId, setEditingProductId] = useState(null);

const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModalUp = (productId) => {
    setEditingProductId(productId);
    setIsModalUpOpen(true);
  }; 
  const closeModalUp = () => {
    setEditingProductId(null); // Limpia el ID de edición al cerrar el modal
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
}, []);

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

const onSubmitProduct = async () => {
  try {
    const newProductData = {
      name: newProductName,
      brand: newProductBrand,
      amount: newProductAmount,
      endDate: newProductEndDate
    };

    await addProduct(productCollectionRef, newProductData); 
    
    const newProduct = {
      ...newProductData,
      id: Math.random().toString()
    };

    setProductList(prevList => [...prevList, newProduct]);
  } catch (err) {
    console.error(err);
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

return (

<>
<div className="Inventory">
<input
  type="text"
  placeholder="Buscar producto..."
  value={searchTerm}
  onChange={handleSearchChange}
  className="search-input" // Agrega la clase CSS aquí
/>

<button onClick={openModal}>Agregar Producto</button>
      
    <addProduct  isOpen= , onClose=  onSubmit = />
   

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
            <button className="update-button" onClick={() => openModalUp(product.id)}>
              <FaEdit />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
</table>
    </div>

    {isModalUpOpen && (
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
      <input
        className="form-input"
        placeholder="Cambie Fecha de Vencimiento..."
        value={updateProductEndDate}
        onChange={(e) => setUpdateProductEndDate(e.target.value)}
      />
      <button className="submit-button" onClick={handleUpdate}>
        Actualizar
      </button>
      <button className="close-button" onClick={closeModalUp}>
        Cerrar
      </button>
    </div>
  </div>
)}

    </div>

    </>
);

}

export default Inventory;