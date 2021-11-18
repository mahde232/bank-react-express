const userModel = require('../models/user.model').userModel;

const getAllUsers = (req, res) => {
    userModel.find({}, (err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data);
    })
}

const getSpecificUser = (req, res) => {
    const { id } = req.params;
    userModel.findById(id, (err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data);
    })
}

const addNewUser = (req, res) => {
    const { name, passportID, cash, credit, isActive } = req.body;
    const user = new userModel({ name, passportID, cash, credit, isActive })
    user.save((err, data) => {
        if (err) return res.status(404).json(err.message);
        return res.status(200).json(data);
    })
}

const deleteUser = (req, res) => {
    const { id } = req.params;
    userModel.findByIdAndDelete(id, (err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(`User with ID=${id} deleted successfully`);
    })
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, passportID, cash, credit, isActive } = req.body;
    const updatedUser = { name, passportID, cash, credit, isActive }
    userModel.findByIdAndUpdate(id, updatedUser, { new: true, runValidators: true }, (err, data) => {
        if (err) return res.status(404).json(err.message);
        return res.status(200).json(data);
    })
}

const addCashToUser = (req, res) => {
    const { id } = req.params;
    const { cash } = req.body;

    userModel.findById(id, (err, user) => {
        if (err) return res.status(404).json(err.message);
        userModel.findByIdAndUpdate(id, { cash: (user.cash + parseInt(cash)) }, { new: true, runValidators: true }, (err, data) => {
            if (err) return res.status(404).json(err.message);
            return res.status(200).json(data);
        })
    })
}
const removeCashFromUser = (req, res) => {
    const { id } = req.params;
    const { cash } = req.body;

    userModel.findById(id, (err, user) => {
        if (err) return res.status(404).json(err.message);
        userModel.findByIdAndUpdate(id, { cash: (user.cash - parseInt(cash)) }, { new: true, runValidators: true }, (err, data) => {
            if (err) return res.status(404).json(err.message);
            return res.status(200).json(data);
        })
    })
}

const transfer = (req, res) => {
    const { from, to } = req.params;
    const { cash } = req.body;

    userModel.findById(from, (err, user1) => {
        if (err) return res.status(404).json(err.message);
        userModel.findByIdAndUpdate(from, { cash: (user1.cash - parseInt(cash)) }, { new: true, runValidators: true }, (err, user1Updated) => {
            if (err) return res.status(404).json(err.message);
            userModel.findById(to, (err, user2) => {
                if (err) return res.status(404).json(err.message);
                userModel.findByIdAndUpdate(to, { cash: (user2.cash + parseInt(cash)) }, { new: true, runValidators: true }, (err, user2Updated) => {
                    if (err) return res.status(404).json(err.message);
                    return res.status(200).json({user1: user1Updated, user2: user2Updated});
                })
            })
        })
    })
}

module.exports = {
    getAllUsers,
    getSpecificUser,
    addNewUser,
    deleteUser,
    updateUser,
    addCashToUser,
    removeCashFromUser,
    transfer
}