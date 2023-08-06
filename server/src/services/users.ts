import data from '../data/index.js'
import { Role } from '../context/types.js'
import errors from '../utils/errors.js'
import { verifyIfIsNumber } from '../utils/verifications.js'

export async function getUsers() {
    return await data.getUsers()
}

export async function getUser(id: string) {
    const user = await data.getUser(id)
    if(!user) throw errors.NOT_FOUND("User wiht id " + id + " not found")
    return user
}

export async function addUser(id:string, email: string, name: string, role: string, phonenumber: string, score: number | undefined) {
    const roleTypeString = role as keyof typeof Role
    if(Role[roleTypeString] == undefined) throw errors.INVALID_PARAMETER("Role " + role + " don't exist")
    return await data.addUser(
        id,
        email,
        name,
        roleTypeString,
        phonenumber,
        score
    )
}

export async function changeScore(id: string, score: number | undefined) {
    const user = await data.getUser(id)
    if(!user) throw errors.NOT_FOUND("User wiht id " + id + " not found")
    return await data.changeScore(id, score)
}

export async function updateUser(id: string, email: string, name: string, role: string, phonenumber: string, score: number | undefined) {
    const user = await data.getUser(id)
    if(!user) throw errors.NOT_FOUND("User wiht id " + id + " not found")
    const roleTypeString = role as keyof typeof Role
    if(Role[roleTypeString] == undefined) throw errors.INVALID_PARAMETER("Role " + role + " don't exist")
    return await data.updateUser(
        id,
        email,
        name,
        roleTypeString,
        phonenumber,
        score
    )
}

export async function deleteUser(id: string) {
    const userDeleted = await data.deleteUser(id)
    if(!userDeleted) throw errors.NOT_FOUND("User wiht id " + id + " not found")
    return userDeleted
}

export async function getUsersMaxId() {
    return await data.getUsersMaxId()
}

