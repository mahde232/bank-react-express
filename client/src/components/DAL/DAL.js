import axios from 'axios'

const getRequest = async (url)=>{
    return await axios.get(`/api/${url}`)
}
const postRequest = async (url, objToSend)=>{
    return await axios.post(`/api/${url}`, objToSend)
}
const deleteRequest = async (url)=>{
    return await axios.delete(`/api/${url}`)
}
const putRequest = async (url, objToSend)=>{
    return await axios.put(`/api/${url}`, objToSend)
}

export {
    getRequest,
    postRequest,
    deleteRequest,
    putRequest
}