import React from "react";
import { useState,useEffect } from "react";
import validator from 'validator'
const Password=()=>{
    const[password,setpassword]=useState("")
    var[length,setlength]=useState(0);
    const[upper,setupper]=useState(false);
    const[lower,setlower]=useState(false);
    const[char,setchar]=useState(false);
    const[no,setno]=useState(false);
    var[password1,setpass]=useState("");
    var col="";
    const validate=(value)=>{
      if(validator.isStrongPassword(value,{
        minLength:8,minLowercase:1,minUppercase:1,minSymbols:1,minNumbers:1
      }))
      {
        setpassword('is strong password');
      }
      else
      {
        setpassword('is not strong password');
      }
    }
    const gencol=(password)=>{
        if(password==="is strong password"){
            return "green"
          }
          else{
            return "red";
          }
    }
    const genpassword=()=>{
      var max=length;
      var min=0;
      var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()<>,.?/[]{}-=_+|/0123456789";
      for(var i=0;i<length;i++)
      {
           var rn=Math.floor(Math.random()*chars.length);
           password1+=chars.substring(rn,rn+1);
      }
    }
    return(
        <>
        <h1>enter the password:</h1>
        <input type="text" name="password" onChange={(e)=>validate(e.target.value)}/>
        <span style={{color:gencol(password)}}>{password}</span>
        <h1>length</h1>
        <input type="text" name="length" onChange={(e)=>setlength(e.target.value)}/>
        <br></br>
        <h1>uppercase</h1>
        <input type="checkbox" name="upper" onChange={(e)=>setupper(!upper)}/>
        <br></br>
        <h1>lowercase</h1>
        <input type="checkbox" name="lower" onChange={(e)=>setlower(!lower)}/>
        <br></br>
        <h1>specialchar</h1>
        <input type="checkbox" name="lower" onChange={(e)=>setchar(!char)}/>
        <br></br>
        <h1>number</h1>
        <input type="checkbox" name="lower" onChange={(e)=>setno(!no)}/>
        <input type="submit" onClick={genpassword()}/>
        <br></br>
        <h1>{password1}</h1>
        </>
    )
}

export default Password;