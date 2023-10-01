
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const deleteConsulta = async (setProductList, id) => {
  const productDoc = doc(db, "consutlas", id);

  try {
    await deleteDoc(productDoc);
    setProductList((prevList) => prevList.filter((product) => product.id !== id));
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
};

export { deleteConsulta };
