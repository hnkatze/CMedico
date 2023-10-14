import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./css/Inventory.css";
import { db } from "../../config/firebase";
import {
  deleteProduct,
  AddProduct,
  updateAmount,
  updateEndDate,
  updateName,
  getDocs,
  collection,
  addDoc,
  message,
  Popconfirm,
  Button,
} from "../helpers";
import Navy from "./navbar";

function Inventor() {
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpOpen, setIsModalUpOpen] = useState(false);
  const productCollectionRef = collection(db, "products");
  const [updateProductName, setUpdateProductName] = useState("");
  const [updateProductAmount, setUpdateProductAmount] = useState(0);
  const [updateProductEndDate, setUpdateProductEndDate] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

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
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductList(filteredData);
    } catch (err) {
      messageApi.open({
        type: "success",
        content: "No Se Puede Obtener El Medicamento",
      });
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
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleAddProduct = async (newProductData) => {
    try {
      await addDoc(productCollectionRef, newProductData);
      const newProduct = {
        ...newProductData,
        id: Math.random().toString(),
      };
      setProductList((prevList) => [...prevList, newProduct]);
      setIsModalOpen(false);
      messageApi.open({
        type: "success",
        content: "Se Agrego El Medicamento",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "No Se Pudo Agregar El Medicamento",
      });
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

  const cancel = (e) => {
    console.log(e);
    message.error("Usuario Cancelo La Operacion ");
  };
  const confirm = () => {
    message.success("Se Borro Con Exito");
  };
  return (
    <>
      {contextHolder}
      <Navy />
      <div className="Inventory">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input" // Agrega la clase CSS aquí
        />
        <button type="button" onClick={openModal}>
          Agregar Producto
        </button>
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
                    <Popconfirm
                      title="Quitar Producto"
                      description="Esta Accion No Se Puede Revertir"
                      onConfirm={() => {
                        deleteProduct(setProductList, product.id);
                        confirm();
                      }}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger>
                        <FaTrash />
                      </Button>
                    </Popconfirm>

                    <button
                      type="button"
                      className="update-button"
                      onClick={() => openModalUp(product.id)}
                    >
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
              <input
                type="date"
                placeholder="Seleccione fecha"
                value={updateProductEndDate}
                onChange={(e) => setUpdateProductEndDate(e.target.value)}
              />
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
      <dialog open={isModalOpen}>
        <AddProduct onclose={setIsModalOpen} onSubmit={handleAddProduct} />
      </dialog>
    </>
  );
}

export default Inventor;
