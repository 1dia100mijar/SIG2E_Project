import { Button } from "@mui/material";
import { useContext, useState } from "react";
import CustomDialog from "../../components/Dialog/CustomDialog";
import AddReservation from "./dialogContent/AddReservation";
import { Status, Submit } from "../../components/Dialog/common";
import { Actions } from "../../components/CustomTable/common";
import useReservations from "../../hooks/useReservations";
import { UserContext } from "../../context/UserContext";
import CustomTable from "../../components/CustomTable";
import CustomTableRow from "../../components/CustomTable/CustomTableRow";
import { dialogFields_Type } from "../../context/types";


function Reservation(){

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const status: Status = {
        open: open,
        close: () => setOpen(false)
    }
  
    const submit: Submit = {
      name: "Adicionar",
      action: () => {}
    }
  
    const actions: Actions ={
      edit: () => {console.log("edit")},
      delete: () => {console.log("delete")}
    }

    const [equipment, setEquipment] = useState("")
    const [lab, setLab] = useState("")
    const [desk, setDesk] = useState("")

    const dialogFields: dialogFields_Type = {
      equipment: {value: equipment, setValue: setEquipment},
      lab: {value: lab, setValue: setLab},
      desk: {value: desk, setValue: setDesk}
    }

    const user = useContext(UserContext).user
    const reservations = useReservations(user!.id)

    return(  
        <>
            <h1>As minhas Reservas</h1>
            <Button variant="contained" color='success' onClick={handleClickOpen}>
              Reservar
            </Button>
            <CustomDialog status={status} submit={submit} header='Adicionar Reserva'>
              <AddReservation fields={dialogFields}/>
            </CustomDialog>

            <CustomTable header={["Equipamento", "Laboratório", "Mesa", "Inicio", "Fim", "Estado"]}>
              {reservations.map( (reservation) => 
                <CustomTableRow row={Object.values(reservation)} key={reservation.equipment+reservation.state+reservation.start} actions={actions}/>
              )}
            </CustomTable>
            {/* <h2>2. Mostrar histórico com as minhas reservas nos alunos/prof; todas as reservas nos gestores</h2> */}
        </>
    
    )
}

export default Reservation