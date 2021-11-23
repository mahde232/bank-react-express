import {getRequest, postRequest, deleteRequest, putRequest} from  './DAL'

//GET requests
export const getAllUsersDAL = async () => {
    return await getRequest(`users/`)
}
export const getSpecificUserDAL = async (id) => {
    return await getRequest(`users/id=${id}`)
}

//POST requests 
export const addNewUserDAL = async (objToSend) => {
    return await postRequest(`users/`, objToSend)
}
export const addCashToUserDAL = async (id, objToSend) => {
    return await postRequest(`users/deposit/id=${id}`, objToSend)
}
export const removeCashFromUserDAL = async (id, objToSend) => {
    return await postRequest(`users/withdraw/id=${id}`, objToSend)
}
export const transferFromToDAL = async (from,to, objToSend) => {
    return await postRequest(`users/transfer/from=${from}&to=${to}`, objToSend)
}

//DELETE requests
export const deleteUserDAL = async (id) => {
    return await deleteRequest(`users/id=${id}`)
}

//PUT requests
export const updateUserDAL = async (id, objToSend) => {
    return await putRequest(`users/id=${id}`, objToSend)
}