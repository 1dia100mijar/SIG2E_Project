import express from 'express'
import api from '../api/index.js'

const router = express.Router()

router.get('/user', api.getUsers)
router.get('/user/:id', api.getUser)
router.post('/user', api.addUser)
router.put('/user/:id', api.updateUser)
router.put('/user/:id/score', api.changeScore)
router.delete('/user/:id', api.deleteUser)

export default router