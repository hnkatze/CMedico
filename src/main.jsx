import React from 'react'
import ReactDOM from 'react-dom/client'
import Navy from './Components/Navbar.jsx'
//import AddConsulta from './Components/helpers/AddConsulta.jsx'
//import Consulta from './Components/Consulta.jsx'
import Inventory from './Components/Inventory.jsx'
//import Consulta from './Components/Consulta.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navy/>
    <Inventory />
    {/* <Consulta /> */}
  </React.StrictMode>,
)
