import React, { useState } from 'react'
import Navbar from './component/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './component/footer/Footer.jsx'
import Login from './component/Login/Login.jsx'
import Verify from './pages/Verify/Verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'

function App() {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin}/>:<></>}
     <div className='app'>
       <Navbar setShowLogin={setShowLogin}/>
       <Routes>
        <Route path
        ='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        < Route path='/order' element={<PlaceOrder/>}/>
        < Route path='/verify' element={<Verify/>}/>
        < Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>

    </>
  )
}

export default App
