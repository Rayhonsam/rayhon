import React, { useEffect, useState } from "react";

const List=(props)=>{
    console.log("samo")
    return <li>{props.list.brand}</li>
}
const Sam1 = (props) => {
    const cars = [
        {id: 1, brand: 'Ford'},
        {id: 2, brand: 'BMW'},
        {id: 3, brand: 'Audi'}
      ];
  const[car,setcar]=useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  })
  const [col, setCol] = useState(true);
  const[values,setval]=useState({})
  const submit = () => {
    setCol(!col);
  };
  const[count,setcount]=useState(0)

  useEffect(() => {
    setTimeout(() => {
      setcount((count) => count + 1);
    }, 1000);
  }, []); 
  const genCol = (col) => {
    return col ? "red" : "green";
  };

  const change=(event)=>{
      const name=event.target.name;
      const val=event.target.value;
      setval(values,{...values,[name]:val});
  }

  const sub=(event)=>{
    event.preventDefault();
    alert(values.toString());
  }
   const changecol=()=>{
     setcar(vals=>{
        return {...vals,"color":"blue"}
     })
   }
  return (
    <>
      <h1>name is {props.name}</h1>
      <span style={{ color: genCol(col) }}>content is react</span>
      <h1>{props.car.name}</h1>
      <input type="submit" onClick={submit} value="submit1" />
      <ul>
        {cars.map((ca)=>(
            <List list={ca}/>
        ))}
       {
        cars.length>0 &&
        <>
        {
            cars.map((ca)=>(
                <List list={ca}/>
            ))
        }
        </>
       }
      </ul>
      <h1>enter the name</h1>
      <input type="text" name="name" onChange={()=>change}/>
      <input type="submit" onClick={sub}/>
      <br></br>
      <h1>{car.color}</h1>
      <input type="submit" value="changecolour" onClick={changecol}/>
      <h1>count:{count}</h1>
    </>
  );
};

class Sam extends React.Component{
    constructor()
    {
        super();
        this.state={"colour":"red"}
    }
    submit=()=>{
        this.setState({colour:"blue"})
    }
    render(){
        const car={"name":"audi","price":12300,"com":"google"};
        return(
            <>
            <h1>color is {this.state.colour} and name is {this.props.name}</h1>
            <Sam1 name={this.props.name} car={car} />
            <input type="submit" onClick={this.submit}/>
            </>
        )
    }
}


export default Sam;
