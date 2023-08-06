import data from '../data/index.js'
import { getDesksSeparated } from './desks.js'
import { Desk, Condition,  Labs_Type } from '../context/types.js'
import errors from '../utils/errors.js'
import {verifyIfIsNumber} from '../utils/verifications.js'
import { getSpace } from './spaces.js'

async function placeDesksOnLab(lab: any){
    lab.desks = await data.getDesksFromLab(lab.id)
    return lab
}

export async function getLabs() {
    const labs = await data.getLabs()
    return await Promise.all(labs.map(async (lab: Labs_Type) => await placeDesksOnLab(lab)))
}

export async function getLab(id: number) {
    await verifyIfIsNumber({id})
    const lab = await data.getLab(id)
    if(!lab) throw errors.NOT_FOUND("Lab wiht id " + id + " not found")
    await placeDesksOnLab(lab)
    return lab
}

export async function addLab(spaceid: number, capacity: number, occupancy: number, condition: string) {
    await verifyIfIsNumber({spaceid, capacity, occupancy})
    const id = Number(await data.getLabsMaxId() + 1)
    try{
        return await data.addLab(id, spaceid, capacity, occupancy, getLabCondition(condition))
    } catch (error: any){
        throw errors.INVALID_PARAMETER(error.message)
    } 
}

export async function updateLab(id: number, spaceid: number, capacity: number, occupancy: number, condition: string){
    await verifyIfIsNumber({spaceid, capacity, occupancy})
    await getLab(id)    // check if lab exist
    try{
        return await data.updateLab(id, spaceid, capacity, occupancy, getLabCondition(condition))
    } catch (error: any){
        throw errors.INVALID_PARAMETER(error.message)
    } 
}

export async function deleteLab(id: number) {
    await getLab(id)    // check if lab exist
    return await data.deleteLab(id)
}

function getLabCondition(condition: string): string{
    const labCondition = Condition[condition as keyof typeof Condition]
    if(labCondition == undefined) throw errors.INVALID_PARAMETER("Condition " + condition + " don't exist")
    return condition
}

export async function changeLabOccupation(id: number, occupancy: number) {
    return await data.changeLabOccupation(id, occupancy)
}