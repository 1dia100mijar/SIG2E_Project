import { useEffect, useState } from "react"
import { getLabs } from "../api/services/labs"
import { Lab_Type } from "../context/types"

function useLabs(){
    const [labs, setLabs] = useState<Lab_Type[]>([])

    useEffect(() => {
        (async () => {
            setLabs(await getLabs())
        })()
    }, [])

    return labs
}

export default useLabs