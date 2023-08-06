import { Request, Response } from 'express'
import services from '../services/index.js'
import { addSpace, deleteSpace, updateSpace } from './spaces.js'
import { Labs_Type } from '../context/types.js'
import httpErrors from '../utils/http-errors.js'
import errors from '../utils/errors.js'

export async function getLabs(req: Request, rsp: Response) {
    return await services.getLabs()
}

export async function getLab(req: Request, rsp: Response) {
    return await services.getLab(Number(req.params.id))
}

export async function addLab(req: Request, rsp: Response) {
    req.body.spacetype = 'lab'
    const space = await addSpace(req, rsp)
    let lab
    try {
        lab = await services.addLab(Number(space.id), Number(req.body.capacity), Number(req.body.occupancy), req.body.condition)
        if (lab) rsp.status(201)
        return lab
    } catch (error:any) {   // if lab creation fails, delete space
        console.log(error)
        req.params.id = space.id
        await deleteSpace(req, rsp)
        throw errors.INVALID_PARAMETER(error.message)
    }
}
export async function updateLab(req: Request, rsp: Response) {
    req.body.spacetype = 'lab'
    const labId = Number(req.params.id)
    req.params.id = String((await services.getLab(labId)).spaceid)
    const space = await updateSpace(req, rsp)
    return await services.updateLab(labId, Number(space.id), Number(req.body.capacity), Number(req.body.occupancy), req.body.condition)
}
export async function deleteLab(req: Request, rsp: Response) {
    const labId = Number(req.params.id)
    const lab = await services.deleteLab(labId)
    req.params.id = lab.spaceid
    await deleteSpace(req, rsp)
    return lab
}
