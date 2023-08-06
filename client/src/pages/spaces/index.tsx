import { useEffect, useState } from "react"
import {getLabs} from "../../api/services/labs"
import { getDesk, getDesks, getDesksSeparated } from "../../api/services/desks"
import CustomTable from "../../components/CustomTable"
import TableCollapseRow from "../../components/Collapseable/TableCollapseRow"
import { Lab_Type, Space_Type, availability } from "../../context/types"
import { Box, Button, List, Typography } from "@mui/material"
import CustomTableRow from "../../components/CustomTable/CustomTableRow"
import ListCollapseRow from "../../components/Collapseable/ListCollapseRow"
import { Actions } from "../../components/CustomTable/common"
import CustomDialog from "../../components/Dialog/CustomDialog"
import { Status, Submit } from "../../components/Dialog/common"
import dateFormater from "../../utils/dateFormater"
import weekDays from "../../context/weekDays"
import AddLab from "./dialogContent/AddLab"
import AddDesk from "./dialogContent/AddDesk"
import { getSpaces } from "../../api/services/spaces"
import useSpaces from "../../hooks/useSpaces"
import useLabs from "../../hooks/useLabs"

function scheduleRowBuilder(type: Lab_Type | Space_Type, actions: Actions): JSX.Element{
    return (
        <ListCollapseRow header="Horários" openStart={true}>
            <Button variant="contained" color='success'>
              Adicionar Horário
            </Button>
            <CustomTable header={["Dia da Semana","Hora de abertura","Hora de fecho"]}>
                {type.schedule.map(
                    (schedule, idx) => <CustomTableRow key={type.designation+idx} actions={actions} row={[[weekDays[idx]], dateFormater(schedule[0]), dateFormater(schedule[1])]}/>
                )}
            </CustomTable>
        </ListCollapseRow>
    )
}

function Spaces(){

    const spaces = useSpaces()
    const labs = useLabs()

    const [open, setOpen] = useState({
        space: false,
        desk: false
    })

    const actions: Actions ={
        edit: () => {},
        delete: () => {}
    }

    function createStatus(field: keyof typeof open): Status{
        return {
            open: open[field],
            close: () => setOpen( () => {
                const temp = {...open}
                temp[field] = false
                return temp
            })
        }
    }
  
    const submit: Submit = {
      name: "Adicionar",
      action: () => {}
    }

    function handleClickOpen(field: keyof typeof open) {
        return () => setOpen( () => {
            const temp = {...open}
            temp[field] = true
            return temp
        })
    }

    return( 
        <>
            <h1>Espaços</h1>
            <Button variant="contained" color='success' onClick={handleClickOpen("space")}>
              Adicionar Espaço
            </Button>
            <CustomDialog status={createStatus("space")} submit={submit} header='Adicionar Espaços'>
                <AddLab />
            </CustomDialog>
            
            <CustomTable header={["Laboratório", "Lotação Atual", "Lotação Máxima", "Disponibilidade"]}>
                {labs.map( (lab) => 
                    <TableCollapseRow key={lab.designation} row={[lab.designation, lab.occupancy, lab.capacity, availability(lab.availability)]} actions={actions}>
                        <Box sx={{m:1}}>
                            <List>
                                {scheduleRowBuilder(lab, actions)}
                                <ListCollapseRow header="Bancadas">
                                    <Button variant="contained" color='success' onClick={handleClickOpen("desk")}>
                                        Adicionar Bancada
                                    </Button>
                                    <CustomDialog status={createStatus("desk")} submit={submit} header='Adicionar Mesas'>
                                        <AddDesk labs={labs.map(lab => lab.designation)} curLab={lab.designation}/>
                                    </CustomDialog>
                                    <CustomTable header={["Numero da bancada","Capacidade máxima","Disponibilidade"]}>
                                        {lab.desks.map(
                                            (desk) => <CustomTableRow key={lab.designation+desk.id} actions={actions} row={[desk.desknr, desk.capacity, availability(desk.availability)]} keyAux={lab.designation}/>)}
                                    </CustomTable>
                                </ListCollapseRow>
                            </List>                        
                        </Box>                      
                    </TableCollapseRow>
                )}
            </CustomTable>
            <Box sx={{m:12}}></Box>
            <CustomTable header={["Sala", "Disponibilidade"]}>
                {spaces.filter( (space) => space.spacetype !== "lab").map( space => 
                    <TableCollapseRow key={space.designation} actions={actions} row={[space.designation, availability(space.availability)]}>
                        <Box sx={{m:1}}/>
                        {scheduleRowBuilder(space, actions)}
                    </TableCollapseRow>
                    )}
            </CustomTable>
        </>
    )
}

export default Spaces