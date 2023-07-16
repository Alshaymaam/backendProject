const express = require('express')
const router = express.Router()
const noteController = require('../controller/noteController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route('/')
.get(noteController.getAllNotes)
.patch(noteController.updateNote)
.delete(noteController.deleteNote)
.post(noteController.createNewNote)
module.exports = router