import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import ErrorPage from './Components/ErrorPage.jsx'
import Consulta from './Components/Consulta.jsx'
import HomePage from './Components/HomePage.jsx'
import Inventor from './Components/Inventor.jsx'
import Consul from './Components/Consul.jsx'


const router = createBrowserRouter([
  { 
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage/>
  },

{
  path: '/Inventor',
  element: <Inventor />, 
},

{
  path: '/Consulta',
  element: <Consulta />,
},
{
      path: '/Consulta/:id',
      element: <Consul />
},
 

]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
)
