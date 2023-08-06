import data from '../data/index.js'
import { Condition, Desk } from '../context/types.js'
import errors from '../utils/errors.js'
import { verifyIfIsNumber } from '../utils/verifications.js'
import { getLab } from './labs.js'

export async function getDesks() {
    return await data.getDesks()
}

export async function getDesksFromLab(labId: number) {
    await verifyIfIsNumber({labId})
    await getLab(labId)   // check if lab exist
    return await data.getDesksFromLab(labId)
}

export async function getDesk(id: number) {
    await verifyIfIsNumber({id})
    const desk = await data.getDesk(id)
    if(!desk) throw errors.NOT_FOUND("Desk wiht id " + id + " not found")
    return desk
}

export async function addDesk(labid:number, designation:string, capacity:number, condition:string) {
    await verifyIfIsNumber({capacity})
    await getLab(labid)    // check if lab exist
    getDeskCondition(condition)            // check if condition is valid
    const id = Number(await data.getDesksMaxId() + 1)
    const desknr = Number(await data.getMaxNumberOfDeskInLab(labid)  + 1)
    try {
        return await data.addDesk(id, labid, desknr, designation, capacity, condition === "working" ? true:false, condition)
    } catch (error: any) {
        throw errors.INVALID_PARAMETER(error.message)    
    } 
}

export async function updateDesk(id:number, labid:number, desknr:number, designation:string, capacity:number, availability:boolean, condition:string) {
    await verifyIfIsNumber({desknr, capacity})
    await getDesk(id)    // check if desk exist
    await getLab(labid)    // check if lab exist
    try {
        return await data.updateDesk(id, labid, desknr, designation, capacity, availability, getDeskCondition(condition))
    } catch (error: any) {
        throw errors.INVALID_PARAMETER(error.message)    
    } 
}

export async function deleteDesk(id: number) {
    await getDesk(id)       // check if desk exist
    return await data.deleteDesk(id)
}

export async function getDesksSeparated(){
    const desks = await getDesks()
    let desksCounts: { [key: string]: Desk[] } = {}

    desks.forEach((desk: Desk) => {
        const designation = desk.labid
        if (!desksCounts[designation]) {
            desksCounts[designation] = []
        }
        desksCounts[designation].push(desk)
    })
    return desksCounts
}


function getDeskCondition(condition: string): string{
    const type = Condition[condition as keyof typeof Condition]
    if(type == undefined) throw errors.INVALID_PARAMETER("Condition " + condition + " don't exist")
    return condition
}