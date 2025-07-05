import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';
function Login({ setShowLogin }) {

  const {url,setToken}=useContext(StoreContext)
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data,[name]:value }));
  };

  const onLogin = async (event )=>{
        event.preventDefault()
        let newUrl=url;
        if(currState === "Login"){
            newUrl += "/api/user/login"
        }
        else{
            newUrl +="/api/user/register"
        }
        const response=await axios.post(newUrl,data)
        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        else{
            console.log("error")
            alert(response.data.message)
        }
  }
  
  return (
    <div className="login">
      <form onSubmit={onLogin} className="login-container">
        <div className="login-title">
          <h2>{currState}</h2>
          <h2
            onClick={() => setShowLogin(false)}
          > X</h2>
        </div>
        <div className="login-input">
          {currState === "Login" ? (
            <> </>
          ) : (
            <input type=" text" name='name' onChange={onChangehandler}  value={data.name} placeholder="Your Name" required />
          )}

          <input  name='email' onChange={onChangehandler} value={data.email}  type="email" placeholder="Enter Your Email" required />
          <input name='password' onChange={onChangehandler} value={data.password} type="password" placeholder="Enter password" required />
        </div>
        <button type='submit' > {currState === "Sign up" ? "Create account" : "Login"}</button>
        <div className="login-popo-condition">
          <input type="checkbox" required />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit omnis
            reiciendis qui.
          </p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a New Account ?{" "}
            <span onClick={() => setCurrState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Allready have an account ?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
