const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/', (req, res) => { //GetAllUsers
    userController.getAllUsers(req, res);
}).get('/id=:id', (req, res) => { //GetSpecificUser
    userController.getSpecificUser(req, res);
}).post('/', (req, res) => { //CreateNewUser
    userController.addNewUser(req, res);
}).delete('/id=:id', (req, res) => { //Delete
    userController.deleteUser(req, res);
}).put('/id=:id', (req, res) => { //Update whole user
    userController.updateUser(req, res);
}).post('/deposit/id=:id', (req, res) => { //deposit
    userController.addCashToUser(req, res);
}).post('/withdraw/id=:id', (req, res) => { //withdraw
    userController.removeCashFromUser(req, res);
}).post('/transfer/from=:from&to=:to', (req, res) => { //withdraw
    userController.transfer(req, res);
})

module.exports = router;