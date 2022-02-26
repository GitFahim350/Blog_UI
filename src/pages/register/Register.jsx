import axios from "axios"
import { useRef, useState } from "react"
import "./register.css"
import styled from "styled-components"


const Success=styled.p`
  color: green;
`

const Failure=styled.p`
  color: #f01616;
`



export default function Register() {
    const handlesubmit=async(e)=>{
        e.preventDefault()
        try {
          const res=await axios.post('http://localhost:5000/api/user/register',{
          username,
          email,
          password,
        })
        console.log(res.data)
        window.location.replace("/login");
        } catch (error) {
          seterror(true)
        }
        


    }
    const [username,setusername]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [error,seterror]=useState(false)
    return (
      <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handlesubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" onChange={(e)=>{setusername(e.target.value)}} placeholder="Enter your username..." />
        <label>Email</label>
        <input className="registerInput" type="text" onChange={(e)=>{setemail(e.target.value)}} placeholder="Enter your email..." />
        <label>Password</label>
        <input className="registerInput" type="password" onChange={(e)=>{setpassword(e.target.value)}} placeholder="Enter your password..." />
        <button className="registerButton" type="submit">Register</button>

        {
          error?
          <Failure>User name or password has already taken</Failure>:
          <Success></Success>
        }
      </form>
        <button className="registerLoginButton">Login</button>
    </div>
    )
}
