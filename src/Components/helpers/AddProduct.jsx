import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddProduct({ isopen, onclose, onSubmit })
{  
  const [startDate, setStartDate] = useState(new Date());
  const [newProductName, setNewProductName] = useState("");
  const [newProductBrand, setNewProductBrand] = useState("");
  const [newProductAmount, setNewProductAmount] = useState(0);
  const [newProductEndDate, setNewProductEndDate] = useState(0);

  const handleSubmit = () => {
    const newProductData = {
      name: newProductName,
      brand: newProductBrand,
      amount: newProductAmount,
      endDate: newProductEndDate
    };
    onSubmit(newProductData);
  };

  const dateget = (startDate) => {
    const dia = startDate.getDate();
    const mes = startDate.getMonth() + 1;
    const year = startDate.getFullYear();
    return dia + "/" + mes + "/" + year;
  }
  return (
    
    isopen && (
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
          <div>
          <label htmlFor="">Fecha De Vencimiento</label>
         <DatePicker selected={startDate} onChange={(e) => {setStartDate(e); setNewProductEndDate(dateget(e));}} />
          </div>
       
          {/* <input
            className="form-input"
            placeholder="Fecha vencimiento = 10/01/2023..."
            required
            title='Ingrese La Fecha De Vencimiento'
            onChange={(e) => setNewProductEndDate(e.target.value)}
            
          /> */}
          <button className="submit-button" onClick={handleSubmit}>Agregar Producto</button>
          <button className="close-button" onClick={onclose}>Cerrar</button>
        </div>
      </div>
    )
  );
}

export default AddProduct;
