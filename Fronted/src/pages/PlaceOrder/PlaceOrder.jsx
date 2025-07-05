import React, { useContext, useEffect, useState ,useNavigate} from 'react'
import'./PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
function PlaceOrder() {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)
  
  const [data,setData]=useState({
    firstName:'',
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  })
  const onChnageHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  // useEffect(()=>{
  //     console.log(data)
  // },[data])
  const placeOrder=async(event)=>{
        event.preventDefault();
        console.log("hello")
        let orderItems=[];
        food_list.map((item)=>{
            if(cartItems[item._id]>0){
              let itemInfo=item;
              itemInfo["qauntity"]=cartItems[item._id];
              orderItems.push(itemInfo);
            }
        })
        let orderData ={
          items:orderItems,
          address:data, 
          amount:getTotalCartAmount()+2,
        }
        try {
          let response = await axios.post(url + "/api/order/place", orderData, {
              headers: { token },
          });
      
          console.log("Response:", response);
      
          if (response.data.success) {
              const { session_url } = response.data;
              window.location.replace(session_url);
          } else {
              alert("Error placing order!");
          }
      } catch (error) {
          console.error("Axios Error:", error.response ? error.response.data : error.message);
          alert("Order placement failed. Check console for details.");
      }
        console.log(orderItems)
  }
  
 
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
              <input required name='firstName' type="text"onChange={onChnageHandler} value={data.firstName} placeholder='FirstName'/>
              <input  required   name='lastName' onChange={onChnageHandler} value={data.lastName}type="text" placeholder='LastName'/>
        </div>
        <input name='email' required  onChange={onChnageHandler} value={data.email} type="email" placeholder='Email Address' />
        <input  required  name='street' onChange={onChnageHandler} value={data.street} type="text" placeholder='Street' />
        
        <div className="multi-fields">
              <input  required  name='city' onChange={onChnageHandler} value={data.city} type="text" placeholder='city'/>
              <input required   name='state' onChange={onChnageHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
              <input  required  name='zipCode' onChange={onChnageHandler} value={data.zipCode} type="text" placeholder='Zip code'/>
              <input  required  name='country' onChange={onChnageHandler} value={data.country} type="text" placeholder='country'/>
        </div>
        <input required type="text"  name='phone' onChange={onChnageHandler} value={data.phone} placeholder='phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>

              </div>
              <hr />
              <div className="cart-total-details">
                   <p>DeliveryFee</p>
                   <p>${getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                  <p>Total</p>
                  <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
              </div>
              <button type='submit'>Procced to payment</button>
            </div>
            </div>
      </div>
      
    </form>
  )
}

export default PlaceOrder

