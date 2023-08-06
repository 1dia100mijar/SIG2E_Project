import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import React, { Fragment, SyntheticEvent, useState } from "react";
import autoCompleteBuilder from "../../../utils/autoCompleteBuilder";
import weekDays from "../../../context/weekDays";


import { TimePicker } from "@mui/x-date-pickers";
import UpdateRepeat from "../../../components/Dialog/UpdateRepeat";
import DeskItem from "./DeskItem";
import dayjs, { Dayjs } from "dayjs";
import updateObjectInStateArray from "../../../utils/updateObjectInStateArray";
import updateArrayHelper from "../../../utils/updateArray";

function CheckboxForm(label: string, setFunction: Function, idx: number){
    return (
        <FormControlLabel
        key={label+idx}
        control={<Checkbox sx={{padding:0}}/>}
        label={label}
        labelPlacement="top"
        onChange={(__, checked) => setFunction(checked)}
        sx={{margin: 1.1}}
        />
    )
}

type ScheduleItem = {
    start: Dayjs | null,
    end: Dayjs | null,
    weekDays: boolean[]
}

const defaultScheudleItem: ScheduleItem = {
    start: null, 
    end: null,
    weekDays: Array(7).fill(false)
}

function AddLab(){

    const [type, setType] = React.useState('space');
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([defaultScheudleItem])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType((event.target as HTMLInputElement).value);
    };


    const conditions = ["A Funcionar", "Estragado", "Em Manutenção"]
    const [condition, setCondition] = useState("");
    const [location, setLocation] = useState("");

    const updateTimes = updateObjectInStateArray(scheduleItems, setScheduleItems)

    
    console.log(scheduleItems)

    return (
        <>
            <FormControl>
                <FormLabel>Tipo de Espaço</FormLabel>
                <RadioGroup 
                    row
                    value={type}
                    onChange={handleChange}
                >
                    <FormControlLabel value="lab" control={<Radio />} label="Laboratório" />
                    <FormControlLabel value="space" control={<Radio />} label="Sala" />
                </RadioGroup>
            </FormControl>

            {autoCompleteBuilder("Localização da Sala", [], false, setLocation)}
            {autoCompleteBuilder("Condição", conditions, true, setCondition)}


            <FormControl>
      
                <FormLabel>Horários</FormLabel>

                {scheduleItems.map( (item, scheduleIdx) => {
                    return (
                    <Fragment key={scheduleIdx}>
                        <FormGroup row sx={{display: "flex", flexDirection: "row"}}>
                            {weekDays.map( (day, idx) => CheckboxForm(day[0],  
                                (value: boolean) => updateTimes(scheduleIdx, "weekDays")
                                    (updateArrayHelper(scheduleItems[scheduleIdx].weekDays, idx, value)),
                                idx
                                )
                            )} 
                        </FormGroup>
                        <Box>
                            <TimePicker label="Abertura" ampm={false} format="HH:mm" className="DialogTwoElementsRow" onChange={(value) => updateTimes(scheduleIdx, "start")(value)} />
                            <TimePicker label="Fecho" ampm={false} format="HH:mm" className="DialogTwoElementsRow" onChange={(value) => updateTimes(scheduleIdx, "end")(value)}/> 
                        </Box>
                    </Fragment>
                    )})
                }

                <UpdateRepeat
                    incrementFunction={() => {setScheduleItems(() => [...scheduleItems, defaultScheudleItem])}}
                    decrementFunction={() => {setScheduleItems(() => scheduleItems.length > 1 ? scheduleItems.slice(0, -1) : scheduleItems)}}
                />

            </FormControl>
            
            {type === "lab"  && <DeskItem/>}


        </>
    )
}

export default AddLab