import express from 'express'
import api from '../api/index.js'

const router = express.Router()

router.get('/reservation', api.getReservations)
router.get('/reservation/:id', api.getReservation)
router.get('/reservation/user/:userid', api.getUserReservations)
router.get('/reservation/equipment/:equipmentid', api.getEquipmentReservations)
router.get('/reservation/desk/:deskid', api.getDeskReservations)
router.post('/reservation', api.addReservation)
router.put('/reservation/:id', api.updateReservation)
router.put('/reservation/:id/cancel', api.cancelReservation)
router.delete('/reservation/:id', api.deleteReservation)

export default router
