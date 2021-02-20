import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [friendList, setFriendList] = useState([]);

  const btnAdd = (req, res) =>{
    Axios.post('http://localhost:3001/add',{
      name:name,
      age:age
    }).then((response) =>{
      setFriendList([...friendList, 
        {_id: response.data._id, name:name, age:age}]);
    });
  };

  const friendUpdate = (id) =>{
    const newAge = prompt("Enter the new Age");

    Axios.put('http://localhost:3001/update', {newAge: newAge, id: id})
    .then(() =>{
      setFriendList(
        friendList.map((val) => {
        return val._id == id
        ?{_id: id, name: val.name, age: newAge}:val;
      }))
    });
  };

  const friendDelete = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
    .then(()=>{
      setFriendList(
        friendList.filter((val) => {
        return val._id !== id;
      })
      );
    });
  }

useEffect(() => {
  Axios.get('http://localhost:3001/read')
    .then((response) =>{
      setFriendList(response.data);
    }).catch(() =>{
      console.log("Error");
    })
},[]);

  return (
    <div className="App">
      <h1 className = "friend">Friends List</h1>
      <div className="inputs">
        <input type="text" placeholder= "name" onChange = {(event) => {
          setName(event.target.value)}}
        />
        <input type="number" placeholder= "age" onChange = {(event) => {
          setAge(event.target.value)}}/>

          <button onClick = {btnAdd}> Add </button>
      </div>
          <div className= "list">
              {friendList.map((val)=>{
                return (
                  <div className ="listbtn">
                    <h4>Name: {val.name}</h4>
                    <h4>Age: {val.age}</h4>
                  
                    <button onClick = {() => {
                        friendUpdate(val._id)
                      }}>
                        Update
                    </button>

                    <button onClick = {() => {
                        friendDelete(val._id)
                      }}>
                      Delete</button>
                  </div>
                );
              })}
          </div>
          
    </div>
    
);
}

export default App;
