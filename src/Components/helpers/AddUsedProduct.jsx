import { useState, useEffect } from "react";
import { Select, InputNumber, Button, message } from "antd";
import { collection, getDocs, getDoc, addDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import "../css/addmedic.css";
import { updateAmount } from "./updateProduct";
import { updateMedicUsed } from "./updateConsulta";
const { Option } = Select;

const AddUsedProduct = ({ closeIsOpen, idConsulta, onProductUsed }) => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [medicamentoId, setMedicamentoId] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const medicamentoRef = collection(db, "products");
  const usedProductRef = collection(db, "usedProduct");
  useEffect(() => {
    // Consulta la colección de medicamentos para obtener todas las opciones
    const fetchMedicamentos = async () => {
      const medicamentosRef = collection(db, "products");
      const snapshot = await getDocs(medicamentosRef);

      const options = snapshot.docs.map((doc) => {
        const data = doc.data();
        return (
          <Option key={doc.id} value={doc.id}>
            {data.name}
          </Option>
        );
      });

      setMedicamentos(options);
    };

    fetchMedicamentos();
  }, []);

  const collec = (event) => {
    event.preventDefault();
    const newproductUsed = {
      idConsulta: idConsulta,
      nameProduct: "",
      usedAmount: cantidad,
    };
    onSubmit(newproductUsed);
  };

  const onSubmit = async (data) => {
    const medicamentoDocRef = doc(medicamentoRef, medicamentoId);
    const medicamentoDoc = await getDoc(medicamentoDocRef);

    const consultaDocRef = doc(db, "consultas", idConsulta);
    const consultaSnapshot = await getDoc(consultaDocRef);
    const consultaData = consultaSnapshot.data();
    if (medicamentoDoc.exists()) {
      const medicamentoData = medicamentoDoc.data();
      data.nameProduct = medicamentoData.name;
      if (medicamentoData.amount >= data.usedAmount) {
        await addDoc(usedProductRef, data);

        updateAmount(medicamentoId, medicamentoData.amount - data.usedAmount);
        updateMedicUsed(idConsulta, consultaData.medicUsed + 1);
        message.open({
          type: "success",
          content: "Se Agregó Correctamente",
        });
        onProductUsed(data);
      } else {
        alert("No hay suficiente stock del medicamento seleccionado.");
      }
    } else {
      message.open({
        type: "error",
        content: "No Hay Suficiente Stock",
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={collec}>
        <label className="form-label-select">
          Medicamento:
          <Select
            className="custom-select"
            value={medicamentoId}
            onChange={(value) => setMedicamentoId(value)}
            showSearch
            placeholder="Selecciona un medicamento"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {medicamentos}
          </Select>
        </label>
        <div>
          <label className="form-label">
            Cant:
            <InputNumber
              min={1}
              max={50}
              defaultValue={cantidad}
              onChange={(value) => setCantidad(value)}
            />
          </label>
        </div>
        <div className="buttons">
          <Button
            type="primary"
            htmlType="submit"
            className="submit-button"
            onClick={collec}
          >
            Agregar
          </Button>
          <Button
            type="primary"
            htmlType="button"
            onClick={closeIsOpen}
            className="button-button"
          >
            X
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUsedProduct;
