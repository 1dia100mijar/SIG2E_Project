import { Request, Response } from 'express'
import services from '../services/index.js'

export async function getEquipments(req: Request, rsp: Response) {
    return await services.getEquipments()
}

export async function getEquipmentsFromDesk(req: Request, rsp: Response) {
    return await services.getEquipmentsFromDesk(Number(req.params.deskid))
}

export async function getEquipment(req: Request, rsp: Response) {
    return await services.getEquipment(Number(req.params.id))
}

export async function addEquipment(req: Request, rsp: Response) {
    const equipment = await services.addEquipment(Number(req.body.deskid), req.body.location, req.body.designation, req.body.condition)
    if(equipment) rsp.status(201)
    return equipment
}

export async function updateEquipment(req: Request, rsp: Response) {
    return await services.updateEquipment(Number(req.params.id), req.body.deskid, req.body.location, req.body.equipmentnr, req.body.designation, req.body.availability, req.body.condition)
}
export async function deleteEquipment(req: Request, rsp: Response) {
    return await services.deleteEquipment(Number(req.params.id))
}

export async function getEquipmentsWithName(req: Request, rsp: Response) {
    return await services.getEquipmentsWithName(req.params.name)
}

export async function getDistinctEquipments(req: Request, rsp: Response) {
    return await services.getDistinctEquipments()
}

export async function getDistinctEquipmentsCount(req: Request, rsp: Response) {
    return await services.getDistinctEquipmentsCount()
}

export async function getEquipmentsSeperated(req: Request, rsp: Response) {
    return await services.getEquipmentsSeperated()
}

