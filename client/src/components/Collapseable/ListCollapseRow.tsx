import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { useState } from "react";

type Props = {
    header?: string,
    openStart?: boolean
    children: JSX.Element|JSX.Element[]
}

function ListCollapseRow({header, children, openStart}: Props){

    const [open, setOpen] = useState(openStart !== undefined && openStart ? true : false);

    const handleClick = () => {
      setOpen(!open);
    };
    return (
        <>
            <ListItemButton onClick={handleClick}>
                {open ? <ExpandLess /> : <ExpandMore />}
                <Typography fontWeight={"bold"}>{header}</Typography>
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {Array.isArray(children) ? children.map( (value: JSX.Element, idx) => <ListItem key={idx}> {value} </ListItem>) : children }
                </List>
            </Collapse>
        </>
      );
}

export default ListCollapseRow