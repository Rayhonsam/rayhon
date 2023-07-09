import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Login=()=>{
    const[name,setname]=useState("")
    const[password,setpass]=useState("")
    const submit=async()=>{
        try
        {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:3002/api/login',
                data: {
                    password: password
                }
            })
        //    const reqdata=await fetch("http://localhost:3002/api/login");
           console.log(response);
           if(response)
           {
            alert("successfully logged in");
           }
        }
        catch(err)
        {
            console.log("error")
        }
    }
    return(
        <>
        <h1>enter the name</h1>
        <input type="text" name="name" onChange={(e)=>setname(e.target.value)}/>
        <br></br> 
        <h1>enter the passord(mail)</h1>
        <input type="text" name="password" onChange={(e)=>setpass(e.target.value)}/>
        <br></br> 
        <input type="submit" name="submit" onClick={submit}/>
        </>
    )
}

export default Login;