import { AppBar, FormControlLabel, FormGroup, Switch } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import User from "../../context/user";
import {Width} from "./common"
import {Link} from "react-router-dom"


import PersonIcon from '@mui/icons-material/Person';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

type Props = {
  width: Width,
  changeTheme: () => void,
  openStatus: boolean
}

function Topbar({ changeTheme, width, openStatus }:Props) {

  const [auth, setAuth] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const user = useContext(UserContext).user

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    // {Name: "Histórico", Action: handleCloseUserMenu, Element:  (name: string) => {return auth && <Typography textAlign="center">{name}</Typography>}}, 
    {Name: "Modo Escuro", Action: () => {
      changeTheme()
      handleCloseUserMenu()
    },  Element:  (name: string) => {return <FormGroup> <FormControlLabel control={<Switch defaultChecked color="primary"/>} label={name} labelPlacement="start"/> </FormGroup>}},
    {Name: auth ? 'Logout' : 'Login', Action: () => {
        setAuth( (auth) => {return !auth})
        handleCloseUserMenu()
      },
      Element:  (name: string) => {return <Typography textAlign="center">{name}</Typography>}
    },
  ]

  return (
    <>
      <AppBar position='sticky'>
          <Toolbar>
            <Link to="/" className='Link'>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  ml: `calc(100% - ${width.closed})`,
                  ...(openStatus && {ml: `calc(100% - ${width.open})`}),
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                }}
              >
                SIG2E
              </Typography>
            </Link>
            
            <Box style={{flexGrow: 1}} ></Box>

            <Tooltip title="Open settings" >
              <IconButton onClick={handleOpenUserMenu} >
                <Avatar alt={user?.name}>
                  {user?.name ? user.name : <PersonIcon />}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Toolbar>
      </AppBar>
      
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map( ({Name: name, Action: action, Element: elementBuild}) => (
          elementBuild(name) ?
          <MenuItem key={name} onClick={action}>
            {elementBuild(name)}
          </MenuItem> : false
        ))}
      </Menu>
    </>
  );
}

export default Topbar;
