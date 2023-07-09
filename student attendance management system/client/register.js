import React from "react";
import { useState,useEffect } from "react";
import axios, { Axios } from "axios";
const Register=(props)=>{
    const[name,setname]=useState("")
    const[mail,setmail]=useState("")
    const[phone,setphone]=useState("")
    const[list,setlist]=useState([])
    const[response,setres]=useState("")
    useEffect(() => {
      const getdata=async()=>{
        const reqdata=await fetch("http://localhost:3002/api/get");
        const resdata=await reqdata.json()
        setlist([...list,resdata]);
        console.log(resdata);
      }
      getdata();
    }, []);
    
    const submit = async () => {
        try {
          props.addtrans({name:name,mail:mail,phone:phone })
          const response = await axios.post('http://localhost:3002/api/insert', { name:name,mail:mail,phone:phone });
          console.log("esponse");
          console.log("res"+response.data);
          setres(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    return(
        <>
        <h1>enter the name</h1>
        <input type="text" name="name" onChange={(e)=>setname(e.target.value)}/>
        <br></br>
        <h1>enter the phone no</h1>
        <input type="text" name="phone" onChange={(e)=>setphone(e.target.value)}/>
        <br></br>
        <h1>enter the mail</h1>
        <input type="text" name="mail" onChange={(e)=>setmail(e.target.value)}/>
        <br></br>
        <input type="submit" value="register" onClick={submit}/>
        {list.map((val,index)=>(
          <div key={index}>
            <h1>{index} {val[0].name}</h1>
          </div>
        ))}
        <div>"res{response}</div>
        </>
    )
}

export default Register;