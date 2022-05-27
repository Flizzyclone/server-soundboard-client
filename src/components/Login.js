import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router';
import './login.css';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { Typography, useTheme } from '@mui/material';
import { AppContextComponent } from './ContextProvider'
const BASE_URL = 'http://localhost:4001';

function Login() {
  const context = useContext(AppContextComponent);
  const navigate = useNavigate();

  const theme = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorEnter, setErrorEnter] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(context.loggedIn) {
      setLoading(true);
      let headers = new Headers();
      headers.set('Authorization', `Bearer ${window.sessionStorage.getItem("token")}`);
      fetch(`${BASE_URL}/auth/check`, {
        method:'GET',
        headers:headers
      }).then(async (res) => {
        if (res.status == 200) {
          navigate('/');
        } else {
          setLoading(false);
          context.updateLogOut();
        }
      })
    }
  });

  const handleLogin = () => { //return 0 = give feedback that creds dont work
    setLoading(true);
    if(username === '' || password === '') { 
      setErrorEnter(true);
      setHelperText("Incorrect Username or Password");
      setLoading(false);
    }
    try {
      let headers = new Headers();
      headers.set('Authorization', `Basic ${username} : ${password}`)
      fetch(`${BASE_URL}/auth/login`, {
        method:'GET',
        headers:headers
      }).then(async (res) => {
        if(res.status == 401) {
          setErrorEnter(true);
          setHelperText("Incorrect Username or Password");
          setLoading(false);
        } else if (res.status == 200) {
          let resJson = await res.json();
          let bearer = resJson.token;
          context.updateLogIn({token: bearer, username: username});
          setErrorEnter(false);
          setHelperText("");
          navigate('/');
        }
      }).catch((err) => {
        setErrorEnter(true);
        setHelperText("An error occured, please try again");
        setLoading(false);
      });
    } catch(e) {
      setErrorEnter(true);
      setHelperText("An error occured, please try again");
      setLoading(false);
    }
  }

  const handleKey = (e) => {
    if(e.charCode == 13) {
      handleLogin();
    }
  }

  return (
    <div className="Login">
      <Paper variant="outlined"
      sx={{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        padding:theme.spacing(3),
        borderRadius:theme.spacing(1),
        minWidth:theme.spacing(30)
      }}>
        <Stack spacing={2}>
          <Typography variant="h5" sx={{maxWidth:'fit-content'}}>Log in to Server Soundboard</Typography>
        <TextField value={username} id='username-input' variant='outlined' label='Username' error={errorEnter} onChange={event => setUsername(event.target.value)}/>
        <TextField value={password} onKeyPress={handleKey} id='password-input' variant='outlined' label='Password' type='password' error={errorEnter} helperText={helperText} onChange={event => setPassword(event.target.value)} sx={{paddingBottom:theme.spacing(4)}}/>
        <LoadingButton loading={loading} loadingIndicator="Signing in..." variant="contained" onClick={handleLogin}>Sign In</LoadingButton>
        </Stack>
      </Paper>
    </div>
  );
}

export default Login;
