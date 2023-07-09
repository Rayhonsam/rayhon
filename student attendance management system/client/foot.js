import react from "react";
import { useState,useEffect } from "react";
import { ReactDOM } from "react";
import  Axios  from "axios";
const Console=()=>{
    const[mname,setname]=useState("")
    const[mrev,setrev]=useState("")
    const[mlist,setlist]=useState([])
    useEffect(()=>{
        Axios.get("http://localhost:3001/api/get").then((response)=>{
          console.log(response)
           
        })
    },[])
    const submit=()=>{
       Axios.post("http://localhost:3001/api/insert",{
        mname:mname,mrev:mrev,
       }).then(()=>{
        alert("inserted");
       });
       
    }
    return(
        <>
          <h1>crud application</h1>
          <input type="text" name="mname" onChange={(e)=>setname(e.target.value)}/>
          <input type="text" name="mrev" onChange={(e)=>setrev(e.target.value)}/>
          <input type="submit" value="submit" onClick={submit}/>
          {mlist.map(val => <div>
              <h1>{val.mname}</h1>
               <h1>{val.mrev}</h1>
            </div>
          )}
        </>
    )
}

export default Console;