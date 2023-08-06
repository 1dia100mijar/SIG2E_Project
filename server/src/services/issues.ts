import data from '../data/index.js'
import { State } from '../context/types.js'
import errors from '../utils/errors.js'
import {verifyIfIsNumber} from '../utils/verifications.js'
import { getEquipment } from './equipments.js'
import { getDesk } from './desks.js'
import { getUser } from './users.js'
import { getLab } from './labs.js'

export async function getIssues() {
    return await data.getIssues()
}

export async function getIssue(id: number) {
    await verifyIfIsNumber({id})
    const issue = await data.getIssue(id)
    if(!issue) throw errors.NOT_FOUND("Issue wiht id " + id + " not found")
    return issue
}

export async function getEquipmentIssues(equipmentid: number) {
    await getEquipment(equipmentid)    // check if equipment exist
    return await data.getEquipmentIssues(equipmentid)
}

export async function getDeskIssues(deskid: number) {
    await getDesk(deskid)    // check if equipment exist
    return await data.getDeskIssues(deskid)
}

export async function getUserIssues(userid: string) {
    await getUser(userid)    // check if user exist
    return await data.getUserIssues(userid)
}

export async function getLabIssues(labid: number) {
    await getLab(labid)    // check if lab exist
    return await data.getLabIssues(labid)
}

export async function addIssue(useridreport: string, equipmentid: number, deskid: number, labid: number, description: string, datereport: Date,) {
    await getUser(useridreport)    // check if user exist
    if(equipmentid == null && deskid == null && labid == null) throw errors.INVALID_PARAMETER("You must provide an equipmentid, deskid or labid")
    if(equipmentid != null) await getEquipment(equipmentid)    // check if equipment exist
    if(deskid != null) await getDesk(deskid)    // check if desk exist
    if(labid != null) await getLab(labid)    // check if lab exist

    if(description.length <=0) throw errors.INVALID_PARAMETER("Description shouldn't be empty")

    const id = Number(await data.getIssuesMaxId() + 1)
    try{
        await changeStatesMaintenance(equipmentid, deskid, labid)
        return await data.addIssue(id, useridreport, equipmentid, deskid, labid, description, datereport)
    } catch (error: any){
        throw errors.INVALID_PARAMETER(error.message)
    } 
}

export async function updateIssue(id: number, useridreport: string, useridverification: string, useridresolution: string, equipmentid: number, deskid: number, labid: number, description: string, state: string, datereport: Date, dateverification: Date, dateresolution: Date) {
    await getIssue(id)    // check if issue exist
    await getUser(useridreport)    // check if user exist
    if(useridverification != null) await getUser(useridverification)    // check if user exist
    if(useridresolution != null) await getUser(useridresolution)    // check if user exist
    if(equipmentid == null && deskid == null && labid == null) throw errors.INVALID_PARAMETER("You must provide an equipmentid, deskid or labid")
    if(equipmentid != null) await getEquipment(equipmentid)    // check if equipment exist
    if(deskid != null) await getDesk(deskid)    // check if desk exist
    if(labid != null) await getLab(labid)    // check if lab exist

    if(description.length <=0) throw errors.INVALID_PARAMETER("Description shouldn't be empty")

    try{
        await changeStatesMaintenance(equipmentid, deskid, labid)
        return await data.updateIssue(id, useridreport, useridverification, useridresolution, equipmentid, deskid, labid, description, getState(state), datereport, dateverification, dateresolution)
    } catch (error: any){
        throw errors.INVALID_PARAMETER(error.message)
    } 
}

export async function verifyIssue(id: number, useridverification: string, dateverification: Date) {
    await getIssue(id)    // check if issue exist
    await getUser(useridverification)    // check if user exist
    return await data.verifyIssue(id, useridverification, dateverification)
}

export async function resolveIssue(id: number, useridresolution: string, dateresolution: Date) {
    await getIssue(id)    // check if issue exist
    await getUser(useridresolution)    // check if user exist
    await changeStatesResolved(id)
    return await data.resolveIssue(id, useridresolution, dateresolution)
}

export async function deleteIssue(id: number) {
    await getIssue(id)    // check if issue exist
    return await data.deleteIssue(id)
}

async function changeStatesMaintenance(equipmentid:number, deskid:number, labid:number){
    if(equipmentid != null) await data.changeEquipmentState(equipmentid, "maintenance", false)
    if(deskid != null) await data.changeDeskState(deskid, "maintenance", false)
    if(labid != null) {
        const lab = await data.changeLabCondition(labid, "maintenance")
        await data.changeSpaceAvailability(lab.spaceid, false)
    }
}

async function changeStatesResolved(id:number){
    const issue = await data.getIssue(id)
    if(issue.equipmentid != null) await data.changeEquipmentState(issue.equipmentid, "working", true)
    if(issue.deskid != null) await data.changeDeskState(issue.deskid, "working", true)
    if(issue.labid != null) {
        const lab = await data.changeLabCondition(issue.labid, "working")
        await data.changeSpaceAvailability(lab.spaceid, true)
    }
}

async function getIssuesMaxId() {
    return await data.getIssuesMaxId()
}

function getState(state:string){
    const issueState = State[state as keyof typeof State]
    if(issueState == undefined) throw errors.INVALID_PARAMETER("State " + state + " don't exist")
    return state
}