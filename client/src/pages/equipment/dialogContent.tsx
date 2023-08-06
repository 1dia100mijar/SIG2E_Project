import { Autocomplete, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import React, { useEffect } from "react";
import { Condition, State, dialogFields_Type } from "../../context/types";
import autoCompleteBuilder from "../../utils/autoCompleteBuilder";
import useSpaces from "../../hooks/useSpaces";
import useLabs from "../../hooks/useLabs";
import useDesks from "../../hooks/useDesks";

type Props = {
    equipments: string[],
    fields: dialogFields_Type
}

function DialogContent({equipments, fields}: Props){

    const [value, setValue] = React.useState('mobile');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        fields.lab.setValue("")
        fields.desk.setValue("")
        fields.location.setValue("")
    };

    const conditions = ["A Funcionar", "Estragado", "Em Manutenção", "Furtado"]

    const spaces = useSpaces().filter(space => space.spacetype != "lab").map(space => space.designation)
    const labs = useLabs()
    const findLab = labs.find(curLab => curLab.designation === fields.lab.value)
    const desks = useDesks(
        findLab === undefined ? NaN : findLab!.id
    ).map(desk => desk.desknr.toString())

    return (
        <>
            <FormControl>
                <FormLabel id="equipment-type">Tipo de Equipamento</FormLabel>
                <RadioGroup 
                    row
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="mobile" control={<Radio />} label="Móvel" />
                    <FormControlLabel value="fixed" control={<Radio />} label="De bancada" />
                </RadioGroup>
            </FormControl>

            {autoCompleteBuilder("Equipamento", equipments, false, fields.equipment.setValue)}
            {autoCompleteBuilder("Condição", conditions, true, fields.condition.setValue)}

            {value === "mobile" 
                ? 
                    autoCompleteBuilder("Localização", spaces, true, fields.location.setValue)
                : <>
                    {autoCompleteBuilder("Laboratório", labs.map(lab => lab.designation), true, fields.lab.setValue)}
                    {autoCompleteBuilder("Bancada", desks, true, fields.desk.setValue)}
                </>
            }

        </>
    )
}

export default DialogContent