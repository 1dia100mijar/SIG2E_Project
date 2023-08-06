import data from '../data/index.js'
import { Condition, createEquipment_Type, Equipment_Type } from '../context/types.js'
import { verifyIfIsNumber } from '../utils/verifications.js'
import errors from '../utils/errors.js'
import { getDesk } from './desks.js'

export async function getEquipments() {
    return await data.getEquipments()
}

export async function getEquipmentsFromDesk(deskid: number) {
    await verifyIfIsNumber({ deskid })
    const desk = await getDesk(deskid)   // check if desk exist
    return await data.getEquipmentsFromDesk(deskid)
}

export async function getEquipment(id: number) {
    await verifyIfIsNumber({ id })
    const equipment = await data.getEquipment(id)
    if (!equipment) throw errors.NOT_FOUND("Equipment wiht id " + id + " not found")
    return equipment
}

export async function addEquipment(deskid: number, location: string, designation: string, condition: string) {
    await getDesk(deskid)    // check if desk exist
    const id = Number(await data.getEquipmentsMaxId() + 1)
    const equipmentnr = Number(await data.getMaxNumberOfEquipment(designation)  + 1)
    getEquipmentCondition(condition)            // check if condition is valid   
    try {
        return await data.addEquipment(id, deskid || null, location, equipmentnr, designation, 
            condition === "working" ? true : false, condition)
    } catch (error: any) {
        throw errors.INVALID_PARAMETER(error.message)    
    } 
}

export async function updateEquipment(id: number, deskid: number, location: string, equipmentnr: number, 
        designation: string, availability: boolean, condition: string) {
    await verifyIfIsNumber({ equipmentnr })
    await getEquipment(id)      // check if equipment exist
    await getDesk(deskid)       //check if desk exist
    try {
        return await data.updateEquipment(id, deskid, location, equipmentnr, designation, availability, getEquipmentCondition(condition))
    } catch (error: any) {
        throw errors.INVALID_PARAMETER(error.message)    
    } 
}

export async function deleteEquipment(id: number) {
    await getEquipment(id)      // check if equipment exist
    return await data.deleteEquipment(id)
}

export async function getEquipmentsWithName(name: string) {
    return await data.getEquipmentsWithName(name)
}

export async function getDistinctEquipments() {
    let equipments: String[] = []
    const rawData = await data.getDistinctEquipments()
    rawData.forEach((element: { designation: string }) => {
        equipments.push(element.designation)
    })
    return equipments
}

export async function getDistinctEquipmentsCount() {
    return await data.getDistinctEquipmentsCount()
}

export async function getEquipmentsSeperated() {
    const equipments = await getEquipments()
    let equipmentCounts: { [key: string]: Equipment_Type[] } = {}

    equipments.forEach((equipment: Equipment_Type) => {
        const designation: string = equipment.designation
        if (!equipmentCounts[designation]) {
            equipmentCounts[designation] = []
        }
        equipmentCounts[designation].push(equipment)
    })
    return equipmentCounts
}

function getEquipmentCondition(condition: string): string{
    const equipmentCondition = Condition[condition as keyof typeof Condition]
    if(equipmentCondition == undefined) throw errors.INVALID_PARAMETER("Condition " + condition + " don't exist")
    return condition
}