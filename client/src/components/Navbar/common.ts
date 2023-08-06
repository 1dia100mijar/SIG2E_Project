import LogoCollapsedImage from "../../assets/logo_DEETC_col.png"
import LogoExpandedImage from "../../assets/logo_DEETC_exp.png"
import LabIcon from "@mui/icons-material/Desk"
import EquipIcon from "@mui/icons-material/HomeRepairService"
import ReportIcon from "@mui/icons-material/Report"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const drawerWidthOpen = 240;

export type Width = {
    closed: string,
    open: string
}

export type Page = {
    Name: string,
    Icon: JSX.Element
    Link: (element: JSX.Element) => JSX.Element
}

export const Logo = {
    collapsed: {
        img: LogoCollapsedImage,
        description: "Logo Collapsed"
    },
    expanded: {
        img: LogoExpandedImage,
        description: "Logo Expanded"
    }
}

export const SideBarElements = {
    lab: {Name: "Espaços", Icon: LabIcon},
    equip: {Name: "Equipamentos", Icon: EquipIcon},
    reports: {Name: "Avarias", Icon: ReportIcon},
    reservation: {Name: "Reservas", Icon: CalendarMonthIcon}
}