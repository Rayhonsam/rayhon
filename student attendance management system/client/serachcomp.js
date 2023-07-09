import React from "react";
import { useState,useEffect } from "react";
import axios,{Axios} from "axios";

const SearchComponent=({data,serachkey,setsearchlist})=>{
    const[name,setname]=useState("")
    const handlesearch=(event)=>{
       var value=event.target.value;
       setname(value);
      /* const filterdata=data.filter((item)=>{
        item[serachkey].toLowerCase().includes(value.toLowerCase())
       })
       console.log(filterdata);
       setsearchlist(filterdata);*/
       data.forEach(element => {
          const filterdata=element.filter((item)=>{
            if(item[serachkey].toLowerCase().includes(value.toLowerCase()))
            {
                console.log("i",item)
            }
          })
          setsearchlist(filterdata);
          console.log("f"+filterdata)
       });
    }
    return(
        <>
        <input type="text" name="name" value={name} onChange={handlesearch}/>
        
        </>
    )
}

export default SearchComponent;