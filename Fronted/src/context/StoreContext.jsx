import { createContext, useEffect, useState } from "react";

import axios from "axios"
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url ="http://localhost:4000";
  const [food_list,setFoodList]=useState([]);
  const [token,setToken]=useState("")
const addToCart =async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((pre) => ({ ...pre, [itemId]: 1 }));
    } else 
    {
      setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId]+ 1 }));
    }
    if(token){
      await axios.post(url + "/api/cart/add",{itemId},{headers:{token}})
    }
  };
  const removeFromCart = async(itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const Item in cartItems) {
      if (cartItems[Item] > 0) {
        let itemInfo = food_list.find((product) => product._id === Item);
        totalAmount += itemInfo.price * cartItems[Item];
      }
    }
    return totalAmount;
  };
  const fetchFoodList= async ()=>{
    const response=await axios.get(url+"/api/food/list")
    setFoodList(response.data.data)
  }
  const loadCartData=async (token)=>{
    const response=await axios.post(url +"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData)
  }
  useEffect(()=>{
    
      async function loadData(){
        await fetchFoodList()
        if(localStorage.getItem("token"))
          {
            setToken(localStorage.getItem("token"))
            await loadCartData(localStorage.getItem("token"))
          }
      }
      loadData();
  },[]

  )
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
