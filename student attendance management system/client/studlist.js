import React, { useState } from "react";
import SearchComponent from "./serachcomp";

const StudentList = ({studlist, handleattendancechange}) => {
  const [searchlist, setsearchlist] = useState(studlist);
  const [searchlist1, setsearchlist1] = useState([]);
  const serachkey="name" 
  const[name,setname]=useState("")
  const handlesearch=async (event)=>{
     var value=event.target.value;
     setname(value);
     var list = [];
     console.log("stud",studlist)
     await searchlist1.forEach(element => {
      list.push(element);
     });

     await setsearchlist1([]);

     console.log(list);
     list = [];
     
     await studlist.forEach(element => {
        const filterdata=element.filter((item)=>{
          if(item[serachkey].toLowerCase().includes(value.toLowerCase()))
          {
              list.push(item)
              setsearchlist1(list);
          }
          else
          {
               if(searchlist1.includes(item))
               {
                  var index=searchlist1.findIndex(i=>i.id=item.id)
                  if(index!=-1)
                  {
                    searchlist.splice(index,1);
                  }
               }
          }
        })
     });
  }
  return (
    <>
      <table>
        <tr>

          <td>name</td>
          <td>regno</td>
          <td>attendance</td>
        </tr>
        {searchlist1.map((item, index) => (
  <tr key={index}> 
    <td>{item.name}</td>
    <td>{item.reg}</td>
    <td>
      <input
        type="submit"
        value="present"
        onClick={() => handleattendancechange(item.reg, "present")} 
      />
    </td>
    <td>
      <input
        type="submit"
        value="absent"
        onClick={() => handleattendancechange(item.reg, "absent")} 
      />
    </td>
  </tr>
))}

      </table>
      <input type="text" name="name" value={name} onChange={handlesearch}/>
    </>
  );
};

export default StudentList;
