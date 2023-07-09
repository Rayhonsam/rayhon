import React from "react";
import { useState,useEffect } from "react";
import axios,{ Axios } from "axios";
import StudentList from "./studlist";

const List=(props)=>{
   return <li>{props.item.name}</li>
}
const Main=()=>{
    const[name,setname]=useState("")
    const[reg,setreg]=useState("")
    const[studlist,setlist]=useState([])
    const[attendancedata,setattdata]=useState({})
    const[studdata,setdata]=useState([])
    useEffect(()=>{
        const getdata=async()=>{
           try
           {
               const request=await fetch("http://localhost:3002/api/get");
               const response=await request.json()
               setdata([...studdata,response])
               studdata.forEach(element=>{
                console.log("ele",element)
               })
           }
           catch(err)
           {
            console.log(err);
           }
        }
        getdata();
    },[])
    const addtolist=async ()=>{
        try
        {
           console.log("submitted")
           const response=await axios.post("http://localhost:3002/api/insert",{name:name,reg:reg});
           setlist([...studlist,response.data]);
           console.log(response.data);
           alert("student added successfully");
           setname('')
           setreg('')
        }
        catch(err)
        {
            console.log(err)
        }
    }
    const handleattendancechange=(regno,attendance)=>{
        console.log(attendance+"a")
        setattdata((prevdata)=>({
            ...prevdata,[regno]:attendance    //[{"21it081":"present"}]
        }));
    };
    const handleupdateattendance=async()=>{
        console.log(attendancedata);
      const attendancearray=Object.entries(attendancedata).map(([reg,attendance])=>({
        reg,attendance,    //{"reg":"21it081","attendance":"present"}
      }));
      console.log("att",attendancearray)
     try
     {
        const response=await axios.post("http://localhost:3002/api/update",{attendancedata:attendancearray});
        alert(response.data);
     }
     catch(err)
     {
        console.log(err);
     }
    }
    return(
        <>
        <h1>BASIC ATTENDANCE MANAGEMENT SYSTEM</h1>
        <h1>ENTER THE NAME</h1>
        <input type="text" name="name" onChange={(e)=>setname(e.target.value)}/>
        <br></br>
        <h1>enter the regno</h1>
        <input type="text" name="reg" onChange={(e)=>setreg(e.target.value)}/>
        <br></br>
        <input type="submit" name="submit" onClick={addtolist}/>
        <StudentList studlist={studdata} handleattendancechange={handleattendancechange}/>
        <button type="button" value="update" onClick={handleupdateattendance}>update</button>
        </>
    )
}

export default Main;