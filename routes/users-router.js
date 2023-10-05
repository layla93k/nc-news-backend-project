const usersRouter = require('express').Router();

const {getAllUsers, getUserByUsername} = require ('../Controllers/users-controllers.js')

usersRouter.get('/users', getAllUsers)
usersRouter.get('/users/:username', getUserByUsername)

module.exports = usersRouter;