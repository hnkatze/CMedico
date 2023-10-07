import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddProduct({ onclose, onSubmit }) {
  const [startDate, setStartDate] = useState(new Date());
  const [newProductName, setNewProductName] = useState("");
  const [newProductBrand, setNewProductBrand] = useState("");
  const [newProductAmount, setNewProductAmount] = useState(0);
  const [newProductEndDate, setNewProductEndDate] = useState(0);

  const resett = () => {
    setNewProductName("");
    setNewProductBrand("");
    setNewProductEndDate(0);
    setNewProductAmount(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProductData = {
      name: newProductName,
      brand: newProductBrand,
      amount: newProductAmount,
      endDate: newProductEndDate,
    };
    onSubmit(newProductData);
    resett();
  };

  return (
    <div className="modal">
      <div className="form-container">
        <input
          className="form-input"
          placeholder="Nombre del Producto..."
          required
          title="Ingrese El Nombre."
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <input
          className="form-input"
          placeholder="Marca..."
          required
          title="Ingrese La Marca "
          onChange={(e) => setNewProductBrand(e.target.value)}
        />
        <input
          className="form-input"
          placeholder="Cantidad en existencia..."
          type="number"
          required
          title="Ingrese una cantidad.."
          onChange={(e) => setNewProductAmount(Number(e.target.value))}
        />
        <div>
          <label htmlFor="">Fecha De Vencimiento</label>
          <input
            type="date"
            placeholder="Seleccione fecha"
            value={newProductEndDate}
            onChange={(e) => setNewProductEndDate(e.target.value)}
          />
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          Agregar Producto
        </button>
        <button className="close-button" onClick={() => onclose(false)}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
