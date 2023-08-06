import { Equipment_Type } from "../../context/types"
import { get, post, put, remove } from "../client"


export async function getEquipments(){
    return get("/equipment")
}
export async function getEquipmentsSeperated(){
    return get("/equipment/seperated")
}
export async function getEquipmentsFromDesk(deskId: string){
    return get(`/equipment/desk/${deskId}`)
}
export async function getEquipment(equipmentId: string): Promise<Equipment_Type>{
    return get(`/equipment/${equipmentId}`)
}
export async function addEquipment(equipment: Equipment_Type){
    return post("/equipment", equipment)
}
export async function updateEquipment(equipment: Equipment_Type){
    return put(`/equipment/${equipment.id}`, equipment)
}
export async function deleteEquipment(equipmentId: string){
    return remove(`/equipment/${equipmentId}`)
}
