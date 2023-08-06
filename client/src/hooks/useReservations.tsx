import { useEffect, useState } from "react"
import { getLab, getLabs } from "../api/services/labs"
import { Lab_Type, Reservation_Type, State_Reservation } from "../context/types"
import { getUserReservations } from "../api/services/reservations"
import { getEquipment } from "../api/services/equipments"
import { getDesk } from "../api/services/desks"

type ClientReservations_Type = {
    equipment: string,
    lab: string,
    desk: string,
    start: string,
    end: string,
    state: State_Reservation,
}


async function builder(reservation: Reservation_Type): Promise<ClientReservations_Type>{
    const equipment = await getEquipment(reservation.equipmentid.toString())
    const desk = await getDesk(reservation.deskid.toString())
    const lab = await getLab(desk.labid.toString())
    return {
        equipment: equipment.designation + " " + equipment.equipmentnr,
        lab: lab.designation, 
        desk: desk.desknr.toString(),
        start: reservation.datestart,
        end: reservation.dateend,
        state: reservation.state,
    }
}

function useReservations(userId: string){
    const [reservations, setReservations] = useState<ClientReservations_Type[]>([])

    useEffect(() => {
        (async () => {
            try{
                const res = await getUserReservations(userId)
                const newRes = res.map( async (reservation: Reservation_Type) => await builder(reservation) )
                setReservations(await Promise.all(newRes))
            }
            catch(err){
                setReservations([])
            }
        })()
    }, [])

    return reservations
}

export default useReservations