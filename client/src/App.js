import React, { useEffect, useState } from 'react'
import Table from './components/Table'
import Nav from './components/Nav'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from './components/AddUser';
import SpecificUser from './components/SpecificUser';
import AddTransaction from './components/addTransaction'
import {getAllUsersDAL} from './components/DAL/users.DAL'

export default function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getAllUsers = async () => {
      // const request = await axios.get(`api/users/`)
      const request = await getAllUsersDAL()
      if (request.status === 200)
        setUsers(request.data)
      else
        console.log('Error Fetching Data', request);
    }
    getAllUsers()
  },[])

  const addNewUser = (userObj) => {
    setUsers([...users, userObj])
  }

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Table users={users} />} />
          <Route path="/addUser" element={<AddUser informFatherOfNewUser={addNewUser} />} />
          <Route path="/specificUser/:passportID" element={<SpecificUser />} />
          <Route path="/addTransaction" element={<AddTransaction />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
