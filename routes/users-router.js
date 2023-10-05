const usersRouter = require('express').Router();

const {getAllUsers} = require ('../Controllers/users-controllers.js')

usersRouter.get('/users', getAllUsers)

module.exports = usersRouter;