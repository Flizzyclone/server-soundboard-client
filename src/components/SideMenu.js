import React, {useContext} from 'react';
import { useNavigate } from 'react-router';
import './login.css';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import AppContext from './AppContextProvider'

function SideMenu() {
  const { logOut } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    logOut();
    navigate('/login');
  }

  return (
    <div>
      <Paper
      sx={{
        height:'100vh'
      }}>
        <Stack spacing={2} sx={{paddingTop:'1em', height:'calc(100vh - 2em)', justifyContent:'flex-end'}}>
          <Button variant="outlined" startIcon={<LogoutIcon/>} onClick={logout} sx={{marginRight:'auto', marginLeft:'auto'}}>Log Out</Button>
        </Stack>
      </Paper>
    </div>
  );
}

export default SideMenu;
