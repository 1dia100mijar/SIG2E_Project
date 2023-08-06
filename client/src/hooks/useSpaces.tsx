import { useEffect, useState } from "react"
import { Space_Type } from "../context/types"
import { getSpaces } from "../api/services/spaces"

function useSpaces(){
    const [spaces, setSpaces] = useState<Space_Type[]>([])

    useEffect(() => {
        (async () => {
        setSpaces(await getSpaces())
        })()
    }, [])

    return spaces
}

export default useSpaces