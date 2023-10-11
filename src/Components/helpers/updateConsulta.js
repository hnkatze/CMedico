import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { message } from 'antd';

const updateCommit = async (id, newCommit) => {
  if(newCommit === ""){
    return;
  }
  else{
    const productDoc = doc(db, "consultas", id);
    try {
      await updateDoc(productDoc, { commit: newCommit });
      message.open({
        type:"success",
        content:"Se Agrego El Comentario"
      })
    } catch (error) {
      message.open({
        type:"error",
        content:"Ocurrio Un Durante El Ingreso Del Comentario"
      })
    }
  }  
};
const updateMedicUsed = async (id, newMedicUsed) => {
  if(newMedicUsed === ""){
    return;
  }
  else{
    const productDoc = doc(db, "consultas", id);
    try {
      await updateDoc(productDoc, { medicUsed: newMedicUsed });

    } catch (error) {
     console.log("Error Al Asignar" ,error)
    }
  }  
};

export { updateCommit, updateMedicUsed};
