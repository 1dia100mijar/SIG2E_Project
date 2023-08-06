import { Reservation_Type } from "../../context/types"
import { get } from "../client"

export async function getUserReservations(userId: string): Promise<Reservation_Type[]>{
    return get(`/reservation/user/${userId}`)
}