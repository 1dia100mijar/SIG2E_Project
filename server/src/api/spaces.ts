import { Request, Response } from 'express'
import services from '../services/index.js'
import { SpaceType, Space_Type } from '../context/types.js'
import errors from '../utils/errors.js'

export async function getSpaces(req: Request, rsp: Response) {
    return await services.getSpaces()
}

export async function getSpace(req: Request, rsp: Response) {
    const id = Number(req.params.id)
    return await services.getSpace(id)
}

export async function addSpace(req: Request, rsp: Response) {
    const space =  await services.addSpace(req.body.schedule, req.body.designation, req.body.spacetype, Boolean(req.body.availability))
    if(space) rsp.status(201)
    return space
}
export async function updateSpace(req: Request, rsp: Response) {
    return await services.updateSpace(Number(req.params.id), req.body.schedule, req.body.designation, req.body.spacetype, Boolean(req.body.availability))
}
export async function deleteSpace(req: Request, rsp: Response) {
    return await services.deleteSpace(Number(req.params.id))
}

//Storage
export async function addStorage(req: Request, rsp: Response){
    req.body.spacetype = 'storage'
    const storage = await addSpace(req, rsp)
    if(storage) rsp.status(201)
    return storage
}