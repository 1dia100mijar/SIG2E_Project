import MuiDrawer from '@mui/material/Drawer';

import { CSSObject, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Theme, styled } from '@mui/material';

import { Page, drawerWidthOpen, Logo } from "./common";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(1, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidthOpen,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const openedMixin = (theme: Theme): CSSObject => ({
width: drawerWidthOpen,
transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
}),
overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
}),
overflowX: 'hidden',
width: `calc(${theme.spacing(7)} + 1px)`,
[theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
},
});

type Props = {
  openStatus: boolean,
  setOpenStatus: (bool: boolean) => void,
  pages: Page[]
}

function Sidebar( {openStatus, setOpenStatus, pages}: Props){

    const handleDrawerOpen = () => {
      setOpenStatus(true);
    };
    
    const handleDrawerClose = () => {
      setOpenStatus(false);
    };

    return (
      <Drawer variant="permanent" open={openStatus} onMouseEnter={handleDrawerOpen} onMouseLeave={handleDrawerClose}>
      <DrawerHeader>
        <img src={openStatus ? Logo.expanded.img : Logo.collapsed.img} style={ {objectFit:  'fill', height: 70}} alt={openStatus ? Logo.expanded.description : Logo.collapsed.description}/>
      </DrawerHeader>
        <Divider />
        <List>
          {pages.map(({Name: text, Icon: icon, Link: link}) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
             {link(
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: openStatus ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openStatus ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: openStatus ? 1 : 0 }} />
                </ListItemButton>
              
              )}
          </ListItem>
          ))}
        </List>
      </Drawer>
    )
}


export default Sidebar
