import { Theme } from "@mui/material";
import User from "../../context/user";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import {drawerWidthOpen, Page, Width, SideBarElements} from "./common";
import React, { useContext } from "react";
import {Link} from "react-router-dom"
import { UserContext } from "../../context/UserContext";

type Props = {
    theme: Theme,
    changeTheme: () => void,
}

function pageLink(path:string, item: JSX.Element){
  return <Link to={`${path}`} className="Link">{item}</Link>
}

const pages:Page[] = [
  {Name: SideBarElements.reservation.Name, Icon: <SideBarElements.reservation.Icon/>, Link: (item) => pageLink("/reservation", item)},
  {Name: SideBarElements.equip.Name, Icon: <SideBarElements.equip.Icon/>, Link: (item) => pageLink("/equipment", item)},
  {Name: SideBarElements.lab.Name, Icon: <SideBarElements.lab.Icon/>, Link: (item) => pageLink("/spaces", item)},  
  {Name: SideBarElements.reports.Name, Icon: <SideBarElements.reports.Icon/>, Link: (item) => pageLink("/report", item)},
]

function Navbar({ theme, changeTheme }:Props){
    const widthClosed = `calc( 100% - ${theme.spacing(7)}  + 0px )`
    const widthOpen = `calc( 100% - ${drawerWidthOpen}px )`

    const width: Width = {open: widthOpen, closed: widthClosed}
    const [openStatus, setOpenStatus] = React.useState(false);

    return (
        <>
          <Topbar changeTheme={changeTheme} width={width} openStatus={openStatus}/>
          <Sidebar openStatus={openStatus} setOpenStatus={setOpenStatus} pages={pages} />
        </>
      );
}

export default Navbar