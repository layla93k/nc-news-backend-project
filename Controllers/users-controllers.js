const {fetchAllUsers, fetchUserByUsername} = require('../Models/users-models.js')




    exports.getAllUsers = (req, res, next) => {
        fetchAllUsers().then((users)=>{
            res.status(200).send({allUsers : users})
        }).catch((err) => {
            next(err)
         })
    }

    exports.getUserByUsername = (req, res, next) => {
        const {username} = req.params
        fetchUserByUsername(username).then((user)=>{
            res.status(200).send({user: user[0]})
        }).catch((err) => {
            next(err)
         })
    }