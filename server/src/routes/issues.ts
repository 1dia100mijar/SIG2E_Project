import express from 'express'
import api from '../api/index.js'

const router = express.Router()

router.get('/issue', api.getIssues)
router.get('/issue/:id', api.getIssue)
router.get('/issue/equipment/:equipmentid', api.getEquipmentIssues)
router.get('/issue/desk/:deskid', api.getDeskIssues)
router.get('/issue/lab/:labid', api.getLabIssues)
router.get('/issue/user/:userid', api.getUserIssues)
router.post('/issue', api.addIssue)
router.put('/issue/:id', api.updateIssue)
router.put('/issue/:id/verify', api.verifyIssue)
router.put('/issue/:id/resolve', api.resolveIssue)
router.delete('/issue/:id', api.deleteIssue)

export default router