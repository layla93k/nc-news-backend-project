const {fetchAllUsers} = require('../Models/users-models.js')




    exports.getAllUsers = (req, res, next) => {
        fetchAllUsers().then((users)=>{
            res.status(200).send({allUsers : users})
        }).catch((err) => {
            next(err)
         })
    }