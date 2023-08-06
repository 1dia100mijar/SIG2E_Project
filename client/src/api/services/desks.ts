import { Desk_Type } from "../../context/types"
import {get, post, put, remove} from "../client"

export async function getDesks(){
    return get("/desk")
}

export async function getDesksFromLab(labId: string){
    return get(`/desk/lab/${labId}`)
}

export async function getDesk(deskId: string): Promise<Desk_Type>{
    return get(`/desk/${deskId}`)
}

export async function addDesk(desk: Desk_Type){
    return post("/desk", desk)
}

export async function updateDesk(desk: Desk_Type){
    return put(`/desk/${desk.id}`, desk)
}

export async function deleteDesk(deskId: string){
    return remove(`/desk/${deskId}`)
}

export async function getDesksSeparated(){
    return get(`/desk/separated`)
}