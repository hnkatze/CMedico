import { doc, deleteDoc} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { message } from 'antd';

const deleteConsulta = async (setProductList, id, medicUsed) => {
  const productDoc = doc(db, "consultas", id);
  if(medicUsed !== 0){
     message.open({
      type:"error",
      content:"No Puede Borrar La Consulta Porque Tiene Medicamentos Dentro"
    })
  }
  else{
     await deleteDoc(productDoc);

    setProductList((prevList) => prevList.filter((product) => product.id !== id));
   message.open({
      type:"success",
      content:"La Consulta Se Borro Con Exito"
  
    })
  }
  
};

export { deleteConsulta };

