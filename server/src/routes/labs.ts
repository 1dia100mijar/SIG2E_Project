import express from 'express'
import api from '../api/index.js'

const router = express.Router()

router.get('/lab', api.getLabs)
router.get('/lab/:id', api.getLab)
router.post('/lab', api.addLab)
router.put('/lab/:id', api.updateLab)
router.delete('/lab/:id', api.deleteLab)

export default router
