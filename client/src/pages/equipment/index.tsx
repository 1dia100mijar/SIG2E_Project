import { useState, useEffect } from 'react'
import { getEquipmentsSeperated } from "../../api/services/equipments"
import { Button, List, TableRow } from '@mui/material'
import ListCollapseRow from '../../components/Collapseable/ListCollapseRow'
import CustomTable from '../../components/CustomTable/index'
import { Equipment_Type, availability, dialogFields_Type } from '../../context/types'
import CustomTableRow from '../../components/CustomTable/CustomTableRow'
import React from 'react'
import { Status, Submit } from "../../components/Dialog/common";
import CustomDialog from '../../components/Dialog/CustomDialog'
import DialogContent from './dialogContent'
import TableCollapseRow from '../../components/Collapseable/TableCollapseRow'
import { Actions } from '../../components/CustomTable/common'
import useEquipments from '../../hooks/useEquipments'
import { State } from '../../context/types'
import clearStateObjValues from '../../utils/clearStateObjValues'



interface Equipments_Type{
  [key: string]: [ Equipment_Type ] 
}

function rowHeaderBuilder(obj: Equipments_Type, key: string): Array<string>{
  return [key, obj[key].filter(val => val.availability).length.toString(), obj[key].length.toString()]
}

function tableHeaderBuilder(equipment: Equipment_Type){
  const headers = ["Numero do Equipamento", "Localização", Boolean(equipment.deskid) ? "Bancada" : undefined,"Disponibilidade"] 
  return headers.filter(n => n)
}

function tableContentBuilder(equipmentArr: Equipment_Type[]){
  return equipmentArr.map( (equipment) =>  [equipment.equipmentnr, equipment.location, equipment.deskid, availability(equipment.availability)].filter(n => n))
}

function Equipment(){
  
  const equipments = useEquipments()

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const status: Status = {
      open: open,
      close: () => setOpen(false)
  }

  const submit: Submit = {
    name: "Adicionar",
    action: () => {
      console.log(dialogFields)
      clearStateObjValues(dialogFields)
    }
  }

  const actions: Actions ={
    edit: () => {console.log("edit")},
    delete: () => {console.log("delete")}
  }

  const [equipment, setEquipment] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [lab, setLab] = React.useState("");
  const [desk, setDesk] = React.useState("");

  const dialogFields: dialogFields_Type = {
    equipment: {value: equipment, setValue: setEquipment},
    condition: {value: condition, setValue: setCondition},
    location: {value: location, setValue: setLocation},
    lab: {value: lab, setValue: setLab},
    desk: {value: desk, setValue: setDesk}
  }

  return( 
      <>
          <h1>Equipamentos</h1>
          <Button variant="contained" color='success' onClick={handleClickOpen}>
              Adicionar
          </Button>
          <CustomDialog status={status} submit={submit} header='Adicionar Equipamento'>
              <DialogContent equipments={Object.keys(equipments)} fields={dialogFields}/>
          </CustomDialog>

          <CustomTable header={["Equipamento", "Disponiveis", "Total"]}>
            {Object.keys(equipments).map( (equipment) => 
                <TableCollapseRow row={rowHeaderBuilder(equipments, equipment)} key={equipment} actions={actions}>
                  <CustomTable header={tableHeaderBuilder(equipments[equipment][0])}>
                    {tableContentBuilder(equipments[equipment]).map(
                        (arr, idx) =>  <CustomTableRow key={idx} row={arr} actions={actions}/> 
                    )}
                  </CustomTable> 
              </TableCollapseRow>
            )}
          </CustomTable>
      </>
        
    )
}

export default Equipment