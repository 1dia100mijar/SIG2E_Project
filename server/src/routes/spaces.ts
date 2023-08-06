import express from 'express'
import api from '../api/index.js'

const router = express.Router()

router.get('/space', api.getSpaces)
router.get('/space/:id', api.getSpace)
router.post('/space', api.addSpace)
router.post('/storage', api.addStorage)
router.put('/space/:id', api.updateSpace)
router.delete('/space/:id', api.deleteSpace)
router.delete('/storage/:id', api.deleteSpace)

export default router