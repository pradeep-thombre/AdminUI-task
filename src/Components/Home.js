import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Table from "./Table"
import "./Home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Home = () =>{
  const[emp,setEmp] = useState([]);
  const[searchBar, setsearchBar] = useState("");
  const [searchedEmp, setSearchedEmp] = useState([]);


  // fetches the employees from given API
  const getEmp = async() =>{
    try{
      await axios.get("http://localhost:4000/users")
      .then((response => {
        console.log(response.data.data.data)
        setEmp(response.data.data.data.map((row) => ({ 
          ...row, 
          isChecked: false 
        })));
      }))
    }catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    getEmp()
  },[]);
 
  const deleteClick = (id)=>{
    let allEmp = [...emp];
    allEmp = allEmp.filter(employee => employee.id !== id);
    setEmp(allEmp);
  }

  const delSelected =()=>{
   let duplicateEmployees = [...emp];
   duplicateEmployees = duplicateEmployees.filter(employee => !employee.isChecked);
   setEmp(duplicateEmployees);
  }

  const checkClick = (id) =>{
    let allEmp = [...emp];
    allEmp.forEach(employee=>{
      if(employee.id === id){
        employee.isChecked = !employee.isChecked;
      }
    })
    setEmp(allEmp);
  }

  const editClick = (row) => {
    let allEmp = [...emp]
    allEmp = allEmp.map(employee => {
      if (employee.id === row.id) {
        return Object.assign(employee, row)
      }
      return employee;
    })
    setEmp(allEmp)
  }
  

  useEffect(()=>{
     if(searchBar.length>0){
       setSearchedEmp(emp.filter(employee=>{
         if(employee.name.toLowerCase().includes(searchBar.toLowerCase())
         || employee.email.toLowerCase().includes(searchBar.toLowerCase())
         || employee.role.toLowerCase().includes(searchBar.toLowerCase())
         ){
           return employee;
         }
       }))
     }else{
       setSearchedEmp(emp);
     }
  },[searchBar,emp]);

return (
  <div className="container">

    <div id="get-users">                                                            
      <h1 id='heading'><img id='adminImg' src='Admin.png'></img> Geektrust Users</h1>                                                 
    </div>

    <div className="search-box-container">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input className="search-box" name="search" value={searchBar}
            onChange={(e) => setsearchBar(e.target.value)}
            placeholder="Search by name, email or role" />
            
    </div> 
    <div id="table">
      {searchedEmp && <Table employees={searchedEmp} checkClick={checkClick}
        onDelete={deleteClick} onDeleteSelected={delSelected} onEdit={editClick} />}
    </div>
  </div>
);

};
export default Home;
