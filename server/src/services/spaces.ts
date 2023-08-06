import data from '../data/index.js'
import { SpaceType, Space_Type } from '../context/types.js'
import errors from '../utils/errors.js'
import {verifyIfIsNumber} from '../utils/verifications.js'

export async function getSpaces() {
    return await data.getSpaces()
}

export async function getSpace(id: number) {
    await verifyIfIsNumber({id})
    const space = await data.getSpace(id)
    if(!space) throw errors.NOT_FOUND("Space wiht id " + id + " not found")
    return space
}

export async function addSpace(schedule: string, designation:string, spacetype:string, availability:boolean) {
    const id = Number(await data.getSpacesMaxId() + 1)
    try {
        return await data.addSpace(
            id,
            schedule,
            designation,
            getSpapceType(spacetype),
            availability
        )
    } catch (error: any) {
        throw errors.INVALID_PARAMETER(error.message)
    }    
}

export async function updateSpace(id: number, schedule: string, designation:string, spacetype:string, availability:boolean) {
    await getSpace(id)    // check if space exist
    try {
        return await data.updateSpace(
            id,
            schedule,
            designation,
            getSpapceType(spacetype),
            availability
        )
    } catch (error: any) {
        throw errors.INVALID_PARAMETER(error.message)    
    }  
}

export async function deleteSpace(id: number) {
    await getSpace(id)    // check if space exist
    return await data.deleteSpace(id)
}

function getSpapceType(spacetype: string): string{
    const type = SpaceType[spacetype as keyof typeof SpaceType]
    if(type == undefined) throw errors.INVALID_PARAMETER("Spacetype " + spacetype + " don't exist")
    return spacetype
}
