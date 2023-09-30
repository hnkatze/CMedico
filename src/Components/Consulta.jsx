import { useState } from "react";
import AddConsulta from "./helpers/AddConsulta";


const Consulta = () => {
const [isOpen, setOpen] = useState(false);

const openModal = () => {
setOpen(true)
}
const closeModal = () => {
    setOpen(false)
    console.log("si entra pa")
}
  return(
    <>
    <div>
    <button onClick={openModal}>Crear Consulta</button>
    <AddConsulta isOpen = {isOpen} isClose = {closeModal} />
    </div>
    
    </>


  ); 
}

export default Consulta;


