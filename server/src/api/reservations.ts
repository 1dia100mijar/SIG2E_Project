import { Request, Response } from 'express'
import services from '../services/index.js'
import { Condition, Reservation_Type } from '../context/types.js'

export async function getReservations(req: Request, rsp: Response) {
    return await services.getReservations()
}

export async function getReservation(req: Request, rsp: Response) {
    return await services.getReservation(Number(req.params.id))
}

export async function getUserReservations(req: Request, rsp: Response) {
    return await services.getUserReservations(req.params.userid)
}

export async function getEquipmentReservations(req: Request, rsp: Response) {
    return await services.getEquipmentReservations(Number(req.params.equipmentid))
}

export async function getDeskReservations(req: Request, rsp: Response) {
    return await services.getDeskReservations(Number(req.params.deskid))
}

export async function addReservation(req: Request, rsp: Response) {
    const reservation = await services.addReservation(
        req.body.userid,
        Number(req.body.equipmentid),
        Number(req.body.deskid),
        req.body.cause,
        new Date(req.body.datestart),
        new Date(req.body.dateend)
    )
    if(reservation) rsp.status(201)
    return reservation
}

export async function updateReservation(req: Request, rsp: Response) {
    return await services.updateReservation(
            Number(req.params.id),
            req.body.userid,
            Number(req.body.equipmentid),
            Number(req.body.deskid),
            req.body.cause,
            req.body.datestart,
            req.body.dateend,
            req.body.state
        )
}

export async function cancelReservation(req: Request, rsp: Response) {
    return await services.cancelReservation(Number(req.params.id))
}

export async function deleteReservation(req: Request, rsp: Response) {
    return await services.deleteReservation(Number(req.params.id))
}

