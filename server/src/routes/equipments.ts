import express from 'express'
import api from '../api/index.js'

const router = express.Router()

router.get('/equipment', api.getEquipments)
router.get('/equipment/desk/:deskid', api.getEquipmentsFromDesk)
router.post('/equipment', api.addEquipment)
router.put('/equipment/:id', api.updateEquipment)
router.delete('/equipment/:id', api.deleteEquipment)
router.get('/equipment/name/:name', api.getEquipmentsWithName)
router.get('/equipment/distinct', api.getDistinctEquipments)
router.get('/equipment/distinct/count', api.getDistinctEquipmentsCount)
router.get('/equipment/seperated', api.getEquipmentsSeperated)
router.get('/equipment/:id', api.getEquipment)


export default router