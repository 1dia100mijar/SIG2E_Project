import { useState } from "react";
import useEquipments from "../../../hooks/useEquipments";
import useLabs from "../../../hooks/useLabs";
import autoCompleteBuilder from "../../../utils/autoCompleteBuilder";
import useDesks from "../../../hooks/useDesks";
import { dialogFields_Type } from "../../../context/types";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/material";

type Props = {
    fields: dialogFields_Type
}

function AddReservation({fields}: Props){
    
    const equipments = useEquipments()
    const labsRaw = useLabs()
    const labs = labsRaw.map(lab => lab.designation)

    const findLab = labsRaw.find(curLab => curLab.designation === fields.lab.value)
    const desks = useDesks(
        findLab === undefined ? NaN : findLab!.id
    ).map(desk => desk.desknr.toString())

    return(
        <>
            {autoCompleteBuilder("Equipamentos", Object.keys(equipments), true, fields.equipment.setValue)}
            {autoCompleteBuilder("Laboratório",  labs, true, fields.lab.setValue)}
            {autoCompleteBuilder("Mesa",  desks, true, fields.desk.setValue)}
            <DatePicker label="Data" sx={{width: 300}}/>
            <Box>
                <TimePicker  label="Inicio" ampm={false} format="HH:mm" className="DialogTwoElementsRow"/>
                <TimePicker  label="Fim" ampm={false} format="HH:mm" className="DialogTwoElementsRow"/> 
            </Box>
        </>
    )
}

export default AddReservation;