import React, { useState } from 'react';
import { Link } from 'react-router-dom'

export default function TableItem({ user }) {
  const [userObj] = useState({
    _id: user._id,
    passportID: user.passportID,
    name: user.name,
    cash: user.cash,
    credit: user.credit,
    isActive: ""+user.isActive
  })
  return (
    <tr key={userObj.passportID}>
      <td><Link to={`/specificUser/${userObj._id}`} >{userObj.passportID}</Link></td>
      <td>{userObj.name}</td>
      <td>{userObj.cash}</td>
      <td>{userObj.credit}</td>
      <td>{userObj.isActive}</td>
    </tr>
  )
}
