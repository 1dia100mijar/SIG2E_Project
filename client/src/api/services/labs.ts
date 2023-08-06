import { Lab_Type } from "../../context/types"
import { get } from "../client"

export async function getLabs(){
    return get("/lab")
}
export async function getLab(labId: string): Promise<Lab_Type>{
    return get(`/lab/${labId}`)
}
export async function addLab(labId: string){
    return get(`/lab/${labId}`)
}
// export async function updateLab(equipment: Equipment_Type){
//     return post("/lab/", equipment)
// }
// export async function deleteLab(equipment: Equipment_Type){
//     return put(`/lab/${equipment.id}`, equipment)
// }
