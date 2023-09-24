import { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './Inventory.css';
import{ db } from "../config/firebase";
import { getDocs, collection, addDoc} from 'firebase/firestore'
import { deleteProduct } from './helpers/deleteProduct';
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
    await addDoc(productCollectionRef, {
      name: newProductName,
      brand: newProductBrand,
      amount: newProductAmount,
      endDate: newProductEndDate
    });

    
    const newProduct = {
      name: newProductName,
      brand: newProductBrand,
      amount: newProductAmount,
      endDate: newProductEndDate,
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
      
      {isModalOpen && (
        <div className="modal">
          <div className="form-container">
            <input
              className="form-input"
              placeholder="Nombre del Producto..."
              required
              title='Ingrese El Nombre.'
              onChange={(e) => setNewProductName(e.target.value)}
            />
            <input
              className="form-input"
              placeholder="Marca..."
              required
              title='Ingrese La Marca '
              onChange={(e) => setNewProductBrand(e.target.value)}
            />
            <input
              className="form-input"
              placeholder="Cantidad en existencia..."
              type="number"
              required
              title='Ingrese una cantidad..'
              onChange={(e) => setNewProductAmount(Number(e.target.value))}
            />
            <input
              className="form-input"
              placeholder="Fecha vencimiento = 10/01/2023..."
              required
              title='Ingrese La Fecha De Vencimiento'
              onChange={(e) => setNewProductEndDate(e.target.value)}
              
            />
            <button className="submit-button" onClick={onSubmitProduct}>Agregar Producto</button>
            <button className="close-button" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
   

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