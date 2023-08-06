
import { TableCell, TableRow } from "@mui/material";
import { Actions, Icons } from "./common";
import { useState } from "react";

type Props = {
    row: Array<any>,
    keyAux?: string,
    actions: Actions
}


function CustomTableRow({row, keyAux, actions}: Props){
    const [open, setOpen] = useState(false)

    return (
        <TableRow onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            {row.map( (column: string, idx) => 
                <TableCell key={keyAux ? column+keyAux+idx : column+idx} align="center">
                   {column}
                </TableCell>)
            }
            <TableCell sx={{visibility: open === true ? "visible" : "hidden", borderBottom: 0}}>
                <Icons.edit onClick={actions.edit}/> 
                <Icons.delete onClick={actions.delete}/>
            </TableCell>
        </TableRow>
      );
}

export default CustomTableRow