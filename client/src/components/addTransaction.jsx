import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './addTransaction.style.css'

const AddTransaction = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [transactionObj, setObj] = useState({
        transactionType: '',
        amount: '',
        receiver: '',
        sender: ''
    })

    useEffect(() => {
        console.log(transactionObj);
    }, [transactionObj])

    useEffect(() => {
        const getAllUsers = async () => {
            const request = await axios.get(`api/users/`)
            if (request.status === 200) {
                setUsers(request.data);
            }
        }
        getAllUsers();
    }, [])
    const handleOnChange = (e) => {
        e.target.style.border = '';
        if (e.target.name === 'amount')
            e.target.value = e.target.value.replace(/[^\d]/gi, '')
        if (e.target.name === 'transactionType' && e.target.value === 'withdrawal') {
            setObj(prevState => {
                return { transactionType: prevState.transactionType, amount: prevState.amount, receiver: prevState.receiver }
            })
            // delete transactionObj.sender;
        }
        setObj(prevState => (
            { ...prevState, [e.target.name]: e.target.value }
        ))
    }

    const findIfUserIsActive = (idOfWhoToCheck) => {
        let userToCheck = users.find(user => {
            if (user._id === idOfWhoToCheck)
                return true;
            return false;
        })
        return userToCheck.isActive;
    }
    const onFormSubmit = async (e) => {
        e.preventDefault();
        let isGoodToGo = true;
        Object.entries(transactionObj).forEach((item, index) => { //go over all the keys in the state object, check if any of them is empty
            if (item[1].length === 0) {
                e.target[index].style.border = '1px solid red'
                isGoodToGo = false; //if empty, set isGoodToGo to false, to prevent the api call from having empty values
            }
        })
        if (isGoodToGo) {
            let request;
            try {
            if (transactionObj.transactionType === 'deposit')
                request = await axios.post(`api/users/deposit/id=${transactionObj.receiver}`, { amount: transactionObj.amount })
            else if (transactionObj.transactionType === 'withdrawal')
                request = await axios.post(`api/users/withdraw/id=${transactionObj.receiver}`, { amount: transactionObj.amount })
            else if (transactionObj.transactionType === 'transferBetweenAccounts')
                request = await axios.post(`api/users/transfer/from=${transactionObj.sender}&to=${transactionObj.receiver}`, { amount: transactionObj.amount })
            else alert('invalid transaction type')
            if (request.status === 200) {
                alert('transaction done');
                navigate('/');
            }
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <div className="addTransaction">
            <form id='addTransactionForm' onSubmit={onFormSubmit}>
                <select name="transactionType" onChange={handleOnChange} defaultValue={-1}>
                    <option value={-1} disabled>Choose Operation</option>
                    <option value={'withdrawal'}>Withdraw</option>
                    <option value={'deposit'}>Deposit</option>
                    <option value={'transferBetweenAccounts'}>Transfer to someone</option>
                </select>
                <input type="text" name="amount" placeholder={"Choose your transaction amount"} onChange={handleOnChange} />

                {transactionObj.transactionType === 'transferBetweenAccounts' || transactionObj.transactionType === 'deposit' ?
                    (<><div>Sender</div>
                        <select name='sender' onChange={handleOnChange} defaultValue={-1}>
                            <option value={-1} disabled>Choose Sender</option>
                            {
                                users.map(user => {
                                    return findIfUserIsActive(user._id) ? 
                                    <option key={user._id} value={user._id}>{`${user.name}-ID=${user.passportID}`}</option>
                                    :
                                    <option key={user._id} value={user._id} disabled >{`${user.name}-ID=${user.passportID}`}</option>
                                })
                            }
                        </select></>)
                    : ('')
                }
                <div>Receiver</div>
                <select name="receiver" onChange={handleOnChange} defaultValue={-1}>
                    <option value={-1} disabled>Choose recipient</option>
                    {
                        users.map(user => {
                            return findIfUserIsActive(user._id) ? 
                            <option key={user._id} value={user._id}>{`${user.name}-ID=${user.passportID}`}</option>
                            :
                            <option key={user._id} value={user._id} disabled >{`${user.name}-ID=${user.passportID}`}</option>
                        })
                    }
                </select>
                <input type="submit" />
            </form>
        </div>
    )
}

export default AddTransaction;