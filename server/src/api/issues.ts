import { Request, Response } from 'express'
import services from '../services/index.js'
// getIssues, getIssue, getEquipmentIssues, getDeskIssues, getUserIssues, getLabIssues, addIssue, updateIssue, verifyIssue, resolveIssue, deleteIssue
export async function getIssues(req: Request, rsp: Response) {
    return await services.getIssues()
}

export async function getIssue(req: Request, rsp: Response) {
    return await services.getIssue(Number(req.params.id))
}

export async function getEquipmentIssues(req: Request, rsp: Response) {
    return await services.getEquipmentIssues(Number(req.params.equipmentid))
}

export async function getDeskIssues(req: Request, rsp: Response) {
    return await services.getDeskIssues(Number(req.params.deskid))
}

export async function getUserIssues(req: Request, rsp: Response) {
    return await services.getUserIssues(req.params.userid)
}

export async function getLabIssues(req: Request, rsp: Response) {
    return await services.getLabIssues(Number(req.params.labid))
}

export async function addIssue(req: Request, rsp: Response) {
    const issue = await services.addIssue(req.body.useridreport, req.body.equipmentid, req.body.deskid, req.body.labid, req.body.description, req.body.datereport)
    if(issue) rsp.status(201)
    return issue
}

export async function updateIssue(req: Request, rsp: Response) {
    return await services.updateIssue(Number(req.params.id), req.body.useridreport, req.body.useridverification, req.body.useridresolution, req.body.equipmentid, req.body.deskid, req.body.labid, req.body.description, req.body.state, req.body.datereport, req.body.dateverification, req.body.dateresolution)
}

export async function verifyIssue(req: Request, rsp: Response) {
    return await services.verifyIssue(Number(req.params.id), req.body.useridverification, req.body.dateverification)
}

export async function resolveIssue(req: Request, rsp: Response) {
    return await services.resolveIssue(Number(req.params.id), req.body.useridresolution, req.body.dateresolution)
}

export async function deleteIssue(req: Request, rsp: Response) {
    return await services.deleteIssue(Number(req.params.id))
}
