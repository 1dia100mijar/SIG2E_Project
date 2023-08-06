import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Route, Routes} from "react-router-dom"
import React, { createContext } from 'react';
import User from "./context/user";
import Home from "./pages/home/index"
import Spaces from "./pages/spaces/index"
import Equipment from './pages/equipment';
import Report from "./pages/report"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Navbar from './components/Navbar/index';

import "./assets/global.css"
import Reservation from './pages/reservation';
import NotFound from './pages/notFound';
import { UserContextProvider } from './context/UserContext';


const user_default:User = {
    name: "ABC",
    id: "a123",
    role: "student"
}

function App() {

  // const UserContext = createContext()

  const [mode, setMode] = React.useState('dark');
  // const [user, setUser] = React.useState<User>(user_default)

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode === 'dark' ? 'dark' : 'light',
        },
      }),
    [mode],
  );

  function changeTheme(){
    return setMode( (mode) => {
      return mode === 'dark' ? 'light' : 'dark'})
  }

  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <UserContextProvider>
            <Navbar changeTheme={changeTheme} theme={theme}/>
            <div style={{marginLeft:theme.spacing(11)}}>
              <Box>
              <Routes>
                <Route path="/" element={ <Home />}></Route>
                <Route path="/spaces" element={ <Spaces />}></Route>
                <Route path="/equipment" element={ <Equipment />}></Route>
                <Route path="/reservation" element={ <Reservation />}></Route>
                <Route path="/report" element={ <Report />}></Route>
                <Route path="/*" element={ <NotFound />}></Route>
              </Routes>
              </Box>
            </div>
          </UserContextProvider>

      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
