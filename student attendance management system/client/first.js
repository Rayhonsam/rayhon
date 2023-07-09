import React from "react";
import { useState,useEffect } from "react";
import Register from "./register";
import {Link}  from "react-router-dom";
const First=()=>{
    const[transaction,settransaction]=useState([])
    const addtrans=(info)=>{
        const arr=[...transaction];
        arr.push(info)
        settransaction(arr)
        console.log(arr)
    }
    return(
        <>
         <Register addtrans={addtrans}/>
         <Link to="/login">Login</Link>
        </>
    )
}

export default First