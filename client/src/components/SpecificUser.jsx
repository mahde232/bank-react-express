import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const URL = 'https://bankapi-server.herokuapp.com'

export default function SpecificUser() {
    const [isEditing, setEditing] = useState(false)
    const [editedCredit, setEditedCredit] = useState('')
    const [userToShow, setUserToShow] = useState(null);
    const location = useLocation();
    const passportID = location.pathname.split('/')[2];

    useEffect(() => {
        const getSpecificUserData = async () => {
            const request = await axios.get(`${URL}/users/${passportID}`)
            if (request.status === 200) {
                setUserToShow(request.data);
            }
        }
        getSpecificUserData();
    }, []) //eslint-disable-line

    const updateCredit = async (e) => {
        if (editedCredit.length > 0) {
            if(editedCredit >= 0) {
                const response = await axios.post(`${URL}/updateCredit/${passportID}`, {credit: editedCredit})
                if (response.status === 201) {
                    setEditing(false)
                    setUserToShow({...userToShow,credit: editedCredit})
                }
                else
                    alert(response.data)
            }
            else alert('Credit must be positive');
        }
        else alert('dont leave empty fields');
    }

    return (
        userToShow ? <div>
            <div>Passport ID: {userToShow.passportID}</div>
            <div>Name: {userToShow.name}</div>
            <div>Cash: {userToShow.cash}</div>
            {isEditing ?
                <div style={{ display: 'flex', justifyContent: 'left' }}>
                    <div>Credit: <input type='number' value={editedCredit} onChange={(e) => setEditedCredit(e.target.value)}/></div>
                    <div><input type='button' value='Done' onClick={updateCredit} /></div>
                </div>
                :
                <div style={{ display: 'flex', justifyContent: 'left' }}>
                    <div>Credit: {userToShow.credit}</div>
                    <div><input type='button' value='Edit' onClick={() => {setEditing(!isEditing); setEditedCredit(userToShow.credit)}} /></div>
                </div>
            }
            <div>Is active?: {userToShow.isActive.toString()}</div>
        </div> : <div>Nothing to show</div>
    )
}
