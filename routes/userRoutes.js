const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route('/')
.get(userController.getAllUsers)
.patch(userController.updateUser)
.delete(userController.deleteUser)
.post(userController.createNewUser)
module.exports = router