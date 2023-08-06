import express from 'express'
import api from '../api/index.js'

const router = express.Router()

router.get('/desk', api.getDesks)
router.get('/desk/lab/:labid', api.getDesksFromLab)
router.get('/desk/separated', api.getDesksSeparated)
router.get('/desk/:id', api.getDesk)
router.post('/desk', api.addDesk)
router.put('/desk/:id', api.updateDesk)
router.delete('/desk/:id', api.deleteDesk)

export default router
