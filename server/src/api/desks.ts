import { Request, Response } from 'express'
import services from '../services/index.js'
import { Condition, Desk } from '../context/types.js'

export async function getDesks(req: Request, rsp: Response) {
    return await services.getDesks()
}

export async function getDesksFromLab(req: Request, rsp: Response) {
    return await services.getDesksFromLab(Number(req.params.labid))
}

export async function getDesk(req: Request, rsp: Response) {
    return await services.getDesk(Number(req.params.id))
}

export async function addDesk(req: Request, rsp: Response) {
    const desk = await services.addDesk(Number(req.body.labid), req.body.designation, Number(req.body.capacity), req.body.condition)
    if(desk) rsp.status(201)
    return desk
}

export async function updateDesk(req: Request, rsp: Response) {
    return await services.updateDesk(Number(req.params.id), Number(req.body.labid), Number(req.body.desknr), req.body.designation, Number(req.body.capacity), Boolean(req.body.availability), req.body.condition)
}

export async function deleteDesk(req: Request, rsp: Response) {
    return await services.deleteDesk(Number(req.params.id))
}

export async function getDesksSeparated(req: Request, rsp: Response) {
    return await services.getDesksSeparated()
}