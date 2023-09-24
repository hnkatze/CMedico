
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const deleteProduct = async (setProductList, id) => {
  const productDoc = doc(db, "products", id);

  try {
    await deleteDoc(productDoc);

    // Actualiza la lista de productos después de eliminar el producto
    setProductList((prevList) => prevList.filter((product) => product.id !== id));
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
};

export { deleteProduct };
