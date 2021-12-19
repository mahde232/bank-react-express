import React from 'react'
import './Table.css'
import TableItem from './TableItem'
import Nav from './Nav'
export default function Table({ users }) {
  return (<>
    {/* <Nav/> */}
    <table id="customers">
      <thead>
        <tr>
          <th>passportID (click for user page)</th>
          <th>Name</th>
          <th>Cash</th>
          <th>Credit</th>
          <th>Is active?</th>
        </tr>
      </thead>
      {
        users.length === 0 ? null : (
          <tbody>
            {users.map(user => {
              console.log(user);
              return <TableItem key={user._id} user={user}></TableItem>
            })}
          </tbody>
        )
      }
    </table>
    </>
  )
}
