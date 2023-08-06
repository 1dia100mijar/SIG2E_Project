import { useState } from "react";
import autoCompleteBuilder from "../../../utils/autoCompleteBuilder";
import DeskItem from "./DeskItem";

type Props = {
    labs: string[],
    curLab?: string
}

function AddDesk({labs, curLab}: Props){
    const [lab, setLab] = useState("")
    return(
        <>
            {autoCompleteBuilder("Laboratório", labs, true, setLab, undefined, curLab)}
            <DeskItem/>
        </>
    )
}

export default AddDesk;