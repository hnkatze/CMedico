import React from 'react'
import ReactDOM from 'react-dom/client'
import Navy from './Components/Navbar.jsx'
import Inventory from './Components/Inventory.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navy/>
    <Inventory />
  </React.StrictMode>,
)
