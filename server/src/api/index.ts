import { getEquipments, getEquipmentsFromDesk, getEquipment, addEquipment, updateEquipment, deleteEquipment, getEquipmentsWithName, getDistinctEquipments,getDistinctEquipmentsCount, getEquipmentsSeperated } from './equipments.js'
import { getDesks, getDesksFromLab, getDesk, addDesk, updateDesk, deleteDesk, getDesksSeparated } from './desks.js'
import { getLabs, getLab, addLab, updateLab, deleteLab } from './labs.js'
import { getReservations, getReservation, getUserReservations, getEquipmentReservations, getDeskReservations, addReservation, updateReservation, cancelReservation, deleteReservation} from './reservations.js'
import { getSpaces, getSpace, addSpace, updateSpace, deleteSpace, addStorage } from './spaces.js'
import { getIssues, getIssue, getEquipmentIssues, getDeskIssues, getUserIssues, getLabIssues, addIssue, updateIssue, verifyIssue, resolveIssue, deleteIssue } from './issues.js'
import { getUsers, getUser, addUser, updateUser, deleteUser, changeScore} from './users.js'
import { Response } from 'express'
import handleRequestInit from '../utils/handle-request.js'

const handleRequest = handleRequestInit(sendResponse, sendError)

export default {
    getEquipments: handleRequest(getEquipments),
    getEquipmentsFromDesk: handleRequest(getEquipmentsFromDesk),
    getEquipment: handleRequest(getEquipment),
    addEquipment: handleRequest(addEquipment),
    updateEquipment: handleRequest(updateEquipment),
    deleteEquipment: handleRequest(deleteEquipment),
    getEquipmentsWithName: handleRequest(getEquipmentsWithName),
    getDistinctEquipments: handleRequest(getDistinctEquipments),
    getDistinctEquipmentsCount: handleRequest(getDistinctEquipmentsCount),
    getEquipmentsSeperated: handleRequest(getEquipmentsSeperated),
    getDesks: handleRequest(getDesks),
    getDesksFromLab: handleRequest(getDesksFromLab),
    getDesk: handleRequest(getDesk),
    addDesk: handleRequest(addDesk),
    updateDesk: handleRequest(updateDesk),
    deleteDesk: handleRequest(deleteDesk),
    getDesksSeparated: handleRequest(getDesksSeparated),
    getLabs: handleRequest(getLabs),
    getLab: handleRequest(getLab),
    addLab: handleRequest(addLab),
    updateLab: handleRequest(updateLab),
    deleteLab: handleRequest(deleteLab),
    getReservations: handleRequest(getReservations),
    getReservation: handleRequest(getReservation),
    getUserReservations: handleRequest(getUserReservations),
    getEquipmentReservations: handleRequest(getEquipmentReservations),
    getDeskReservations: handleRequest(getDeskReservations),
    addReservation: handleRequest(addReservation),
    updateReservation: handleRequest(updateReservation),
    cancelReservation: handleRequest(cancelReservation),
    deleteReservation: handleRequest(deleteReservation),
    getSpaces: handleRequest(getSpaces),
    getSpace: handleRequest(getSpace),
    addSpace: handleRequest(addSpace),
    updateSpace: handleRequest(updateSpace),
    deleteSpace: handleRequest(deleteSpace),
    addStorage: handleRequest(addStorage),
    getUsers: handleRequest(getUsers),
    getUser: handleRequest(getUser),
    addUser: handleRequest(addUser),
    updateUser: handleRequest(updateUser),
    deleteUser: handleRequest(deleteUser),
    changeScore: handleRequest(changeScore),
    getIssues: handleRequest(getIssues),
    getIssue: handleRequest(getIssue),
    getEquipmentIssues: handleRequest(getEquipmentIssues),
    getDeskIssues: handleRequest(getDeskIssues),
    getUserIssues: handleRequest(getUserIssues),
    getLabIssues: handleRequest(getLabIssues),
    addIssue: handleRequest(addIssue),
    updateIssue: handleRequest(updateIssue),
    verifyIssue: handleRequest(verifyIssue),
    resolveIssue: handleRequest(resolveIssue),
    deleteIssue: handleRequest(deleteIssue),
}

function sendResponse(obj:any, rsp:Response){
    rsp.json(obj)
}

function sendError(error:any, rsp:Response){
    rsp.status(error.status).json(error.message)
}