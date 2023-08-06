import { Box, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import UpdateRepeat from "../../../components/Dialog/UpdateRepeat";
import autoCompleteBuilder from "../../../utils/autoCompleteBuilder";
import updateObjectInStateArray from "../../../utils/updateObjectInStateArray";

type DeskItem = {
    quantity: number,
    availability: string,
    capacity: number
}

const defaultItem:DeskItem = {quantity: 0, capacity: 0, availability: ""}



function DeskItem(){

    const [deskItems, setDeskItems] = useState<DeskItem[]>([defaultItem]);
    const updateDeskItem = updateObjectInStateArray(deskItems, setDeskItems)

    const conditions = ["A Funcionar", "Estragado", "Em Manutenção"]
    return (
        <>
        
        <Typography fontWeight={"light"}>Mesas</Typography>
                    
        {deskItems.map( (__, idx) => {
            return (
                <Fragment key={idx}>
                <Box display="flex" flexDirection="row">
                    {autoCompleteBuilder("Quantidade", [], false, updateDeskItem(idx, "quantity"), "DialogTwoElementsRow")}
                    {autoCompleteBuilder("Capacidade", [], false, updateDeskItem(idx, "capacity"), "DialogTwoElementsRow")}
                </Box>
                {autoCompleteBuilder("Disponibilidade", conditions, true, updateDeskItem(idx, "availability"))}
                </Fragment>
            )
        })}

        <UpdateRepeat 
            incrementFunction={() => {setDeskItems(() => [...deskItems, defaultItem])}}
            decrementFunction={() => {setDeskItems(() => deskItems.length > 1 ? deskItems.slice(0, -1) : deskItems)}}
        />
        </>
    )
}

export default DeskItem;