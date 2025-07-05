import React from 'react'
import Navbar from './comoponents/navbar/Navbar'
import Sidebar from './comoponents/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Order'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  const url="http://localhost:4000"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
       <Sidebar/>
       <Routes>
        <Route path='/add' element={<Add url={url}/>}>
        </Route>
        <Route path='/List' element={<List url={url}/>}>
        </Route>
        <Route path='/order' element={<Order url={url}/>}>
        </Route>
        
       </Routes>
      </div>
    </div>
  )
}

export default App
