import { Request, Response } from 'express'
import services from '../services/index.js'

export async function getUsers(req: Request, rsp: Response) {
    return await services.getUsers()
}

export async function getUser(req: Request, rsp: Response) {
    return await services.getUser(req.params.id)
}

export async function addUser(req: Request, rsp: Response) {
    const user = await services.addUser(
        req.body.id,
        req.body.email,
        req.body.name,
        req.body.role,
        req.body.phonenumber,
        req.body.score
    )
    if(user) rsp.status(201)
    return user
}

export async function changeScore(req: Request, rsp: Response) {
    return await services.changeScore(req.params.id, req.body.score)
}

export async function updateUser(req: Request, rsp: Response) {
    return await services.updateUser(
        req.params.id,
        req.body.email,
        req.body.name,
        req.body.role,
        req.body.phonenumber,
        req.body.score
    )
}

export async function deleteUser(req: Request, rsp: Response) {
    return await services.deleteUser(req.params.id)
}

export async function getUsersMaxId(req: Request, rsp: Response) {
    return await services.getUsersMaxId()
}