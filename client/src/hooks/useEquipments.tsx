import { useEffect, useState } from "react"
import { Equipment_Type } from "../context/types";
import { getEquipmentsSeperated } from "../api/services/equipments";

interface Equipments_Type{
    [key: string]: [ Equipment_Type ];
  }

function useEquipments(){
    const [equipments, setEquipments] = useState<Equipments_Type>({})
    console.log("useEquipments")
    useEffect(() => {
        (async () => {
        const res = await getEquipmentsSeperated()
        setEquipments(res)
        return res
        })()
    }, [])

    return equipments
}

export default useEquipments