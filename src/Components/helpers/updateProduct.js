import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const updateName = async (id, newName) => {
  if(newName === ""){
    return;
  }
  else{
    const productDoc = doc(db, "products", id);
    try {
      await updateDoc(productDoc, { name: newName });
    } catch (error) {
      console.error('Error al actualizar el nombre del producto:', error);
    }
  }  
};

const updateAmount = async (id, newAmount) => {
  if(newAmount === 0){
    return;
  }
  else{
  const productDoc = doc(db, "products", id);
  try {
    await updateDoc(productDoc, { amount: newAmount });
  } catch (error) {
    console.error('Error al actualizar la cantidad del producto:', error);
  }}
};

const updateEndDate = async (id, newEndDate) => {
  if(newEndDate===""){return;}
  else{
  const productDoc = doc(db, "products", id);
  try {
    await updateDoc(productDoc, { endDate: newEndDate });
  } catch (error) {
    console.error('Error al actualizar la fecha de vencimiento del producto:', error);
  }}
};

export { updateName, updateAmount, updateEndDate };
