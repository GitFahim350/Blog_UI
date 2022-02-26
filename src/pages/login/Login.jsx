import { useState } from "react";
import "./login.css";
import axios from "axios";

import styled from "styled-components";

const Failure=styled.p`
  color: #ff473a;
`
export default function Login() {
  
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [error,seterror]=useState("")
  
  const handlesubmit=async(e)=>{
    e.preventDefault()


      try {
        const res=await axios.post('http://localhost:5000/api/user/login',{
        email,
        password,
      })
      console.log(res.data)
      
      } catch (error) {
        seterror(true)
      }
    }
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handlesubmit}>
        <label>Email</label>
        <input className="loginInput" onChange={(e)=>setemail(e.target.value)} type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="loginInput" onChange={(e)=>setpassword(e.target.value)} type="password" placeholder="Enter your password..." />
        <button className="loginButton" type="submit">Login</button>
        {error?<Failure>Invalid username or password</Failure>:<p></p>}
      </form>
        <button className="loginRegisterButton">Register</button>
    </div>
  );
}
