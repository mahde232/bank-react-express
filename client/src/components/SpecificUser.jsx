import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {getSpecificUserDAL, updateUserDAL} from './DAL/users.DAL'

export default function SpecificUser() {
    const [isEditing, setEditing] = useState(false)
    const [editedCredit, setEditedCredit] = useState('')
    const [userToShow, setUserToShow] = useState(null);
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    useEffect(() => {
        const getSpecificUserData = async () => {
            const request = await getSpecificUserDAL(id); //best practise
            // const request = await axios.get(`http://localhost:${process.env.PORT || 8000}/api/users/id=${id}`) //hack/fix to make it work, not best practise
            // const request = await axios.get(`api/users/id=${id}`) //first version, had problems with path
            console.log('request=',request);
            if (request.status === 200) {
                setUserToShow(request.data);
            }
        }
        getSpecificUserData();
    }, []) //eslint-disable-line

    const updateCredit = async (e) => {
        if (editedCredit.length > 0) {
            if(editedCredit >= 0) {
                // const response = await axios.put(`http://localhost:${process.env.PORT || 8000}/api/users/id=${id}`, {credit: editedCredit})
                const response = await updateUserDAL(id, {credit: editedCredit})
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
                    <div>Credit: <input type='text' value={editedCredit} onChange={(e) => setEditedCredit(e.target.value.replace(/[^\d]/gi, ''))}/></div>
                    <div><input type='button' value='Done' onClick={updateCredit} /></div>
                </div>
                :
                <div style={{ display: 'flex', justifyContent: 'left' }}>
                    <div>Credit: {userToShow.credit}</div>
                    <div><input type='button' value='Edit' onClick={() => {setEditing(!isEditing); setEditedCredit(userToShow.credit)}} /></div>
                </div>
            }
            <div>Is active?: {""+userToShow.isActive}</div>
        </div> : <div>Nothing to show</div>
    )
}
