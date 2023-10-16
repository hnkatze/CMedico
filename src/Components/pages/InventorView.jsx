import { useEffect, useState } from "react";
import "../css/Inventory.css";
import { db } from "../../config/firebase";
import { getDocs, collection, message } from "../helpers";
import Navy from "./navbar";

function InventorView() {
  const [productList, setProductList] = useState([]);
  const productCollectionRef = collection(db, "products");
  const [messageApi, contextHolder] = message.useMessage();

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
      {contextHolder}
      <Navy />
      <div className="Inventory">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <div className="product-list">
          <table>
            <thead>
              <tr>
                <th>Marca</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Vencimiento</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.brand}</td>
                  <td>{product.name}</td>
                  <td>{product.amount}</td>
                  <td>{product.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default InventorView;
