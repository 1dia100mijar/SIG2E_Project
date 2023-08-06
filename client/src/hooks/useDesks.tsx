import { useEffect, useState } from "react"
import { getDesksFromLab } from "../api/services/desks"
import { Desk_Type } from "../context/types"

function useDesks(labId: number){
    const [desks, setDesks] = useState<Desk_Type[]>([])
    useEffect(() => {
        (async () => {
            if (Number.isNaN(labId))
                setDesks([])
            else{
                setDesks(await getDesksFromLab(labId.toString()))
            }
        })()
    }, [labId])

    return desks
}

export default useDesks