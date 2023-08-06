import { Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CustomTableRow from "../CustomTable/CustomTableRow";
import { Actions } from "../CustomTable/common";

type Props = {
    row: Array<any>
    children?: JSX.Element | JSX.Element[],
    actions: Actions
}

function TableCollapseRow({row, children, actions}: Props){

    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

    const Button = <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        {row[0]}
    </IconButton>
    
    return (
        <>
            <CustomTableRow row={[Button, ...row.slice(1)]} actions={actions}></CustomTableRow>
            <TableRow>
                <TableCell key={"collapse"} sx={{ paddingBottom: 0, paddingTop: 0, borderBottom: 0 }} colSpan={6}> 
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {children}
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
      );
}

export default TableCollapseRow