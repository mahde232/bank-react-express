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
        if (!data) return res.status(404).json({message: 'User does not exist!'});
        return res.status(200).json(data);
    })
}

const addNewUser = (req, res) => {
    const { name, passportID, cash, credit, isActive } = req.body;
    userModel.find({passportID: {$eq: passportID}},(err,data) => {
        if (err) return res.status(404).json(err.message)
        if (data.length === 0) {
            const user = new userModel({ name, passportID, cash, credit, isActive })
            user.save((err, data) => {
                if (err) return res.status(404).json(err.message);
                return res.status(200).json(data);
            })
        }
        else {
            return res.status(409).json({message: 'Error, passportID already exists!'})
        }
    })
}

const deleteUser = (req, res) => {
    const { id } = req.params;
    userModel.findByIdAndDelete(id, (err, data) => {
        if (err) return res.status(404).json(err.message);
        if (!data) return res.status(404).json({message: 'User does not exist!'});
        return res.status(200).json({message: `User with ID=${id} deleted successfully`});
    })
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, passportID, cash, credit, isActive } = req.body;
    const updatedUser = { name, passportID, cash, credit, isActive }
    userModel.findByIdAndUpdate(id, updatedUser, { new: true, runValidators: true }, (err, data) => {
        if (err) return res.status(404).json(err.message);
        return res.status(201).json(data);
    })
}

const addCashToUser = (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    userModel.findById(id, (err, user) => {
        if (err) return res.status(404).json(err.message);
        userModel.findByIdAndUpdate(id, { cash: (user.cash + parseInt(amount)) }, { new: true, runValidators: true }, (err, data) => {
            if (err) return res.status(404).json(err.message);
            return res.status(200).json(data);
        })
    })
}
const removeCashFromUser = (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    userModel.findById(id, (err, user) => {
        if (err) return res.status(404).json(err.message);
        if(user.cash + user.credit - parseInt(amount) >= 0)
        userModel.findByIdAndUpdate(id, { cash: (user.cash - parseInt(amount)) }, { new: true, runValidators: true }, (err, data) => {
            if (err) return res.status(404).json(err.message);
            return res.status(200).json(data);
        })
        else return res.status(401).json({message: "User doesn't have enough cash"})
    })
}

const transfer = (req, res) => {
    const { from, to } = req.params;
    const { amount } = req.body;

    userModel.findById(from, (err, user1) => {
        if (err) return res.status(404).json(err.message);
        if(user1.cash + user1.credit - parseInt(amount) >= 0)
        userModel.findByIdAndUpdate(from, { cash: (user1.cash - parseInt(amount)) }, { new: true, runValidators: true }, (err, user1Updated) => {
            if (err) return res.status(404).json(err.message);
            userModel.findById(to, (err, user2) => {
                if (err) return res.status(404).json(err.message);
                userModel.findByIdAndUpdate(to, { cash: (user2.cash + parseInt(amount)) }, { new: true, runValidators: true }, (err, user2Updated) => {
                    if (err) return res.status(404).json(err.message);
                    return res.status(200).json({user1: user1Updated, user2: user2Updated});
                })
            })
        })
        else return res.status(401).json({message: "Sender doesn't have enough cash"});
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