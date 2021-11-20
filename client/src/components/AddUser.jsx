import axios from 'axios'
import React, { useState } from 'react'
import './AddUser.css'
import { useNavigate } from 'react-router-dom'

export default function AddUser({ informFatherOfNewUser }) {
    let navigate = useNavigate()
    const [user, setUser] = useState({
        passportID: '',
        name: '',
        cash: '',
        credit: '',
        isActive: ''
    })

    const handleInput = (e) => {
        e.target.style.border = ""
        if (e.target.name === 'cash' || e.target.name === 'credit') {
            e.target.value = e.target.value.replace(/[^\d]/gi, '')
        }
        setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let flag = true;

        Object.entries(user).forEach((item, idx) => {
            if (item[1].length === 0) {
                e.target[idx].style.border = "2px solid red"
                flag = false
            }
        })
        if (flag) {
            axios.post('api/users/', user).then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    informFatherOfNewUser(response.data)
                    navigate('/')
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <label>Passport ID</label>
                <input type="text" name="passportID" placeholder="Passport ID" onChange={e => handleInput(e)} />

                <label>User Name</label>
                <input type="text" name="name" placeholder="Name" onChange={e => handleInput(e)} />

                <label>Cash</label>
                <input type="text" name="cash" placeholder="Cash" onChange={e => handleInput(e)} />

                <label>Credit</label>
                <input type="text" name="credit" placeholder="Credit" onChange={e => handleInput(e)} />

                <label>Active account?</label>
                <select name="isActive" defaultValue={-1} onChange={e => handleInput(e)}>
                    <option key={-1} value={-1} disabled>Choose option</option>
                    <option key={true} value={true}>Active</option>
                    <option key={false} value={false}>Inactive</option>
                </select>

                <input type="submit" value="Submit" />
            </form>

        </div>

    )
}
