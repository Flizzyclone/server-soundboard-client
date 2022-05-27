import React, {useContext} from 'react';
import { useNavigate } from 'react-router';
import { AppContextComponent } from './ContextProvider'
import { Grid, Paper, IconButton, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound'

function SoundGrid() {
  const context = useContext(AppContextComponent);
  const navigate = useNavigate();

  const logout = () => {
    context.updateLogOut();
    navigate('/login')
  }

  let steps = [{name:'fish'},{name:'ryan yell'},{name:'ryan yell 2'}]

    console.log(steps)

  return (
    <Grid container spacing={4} sx={{margin:'auto', marginTop:'0em'}}>
      {steps.map((s, i) => (
        <Grid key={i} item xs={2.55}>
        <Paper sx={{aspectRatio:'1 / 1'}}>
          <Button sx={{width:'100%',height:'100%', borderRadius:'inherit'}}>
            <Stack sx={{overflow:'hidden'}}>
              <SurroundSoundIcon sx={{margin:'auto',fontSize:72}}></SurroundSoundIcon>
              <Typography variant="h5" noWrap={true} sx={{maxWidth:'100%'}}>{s.name}</Typography>
            </Stack>
          </Button>
        </Paper>
      </Grid>
      ))}
      <Grid item xs={2.6}>
        <Paper sx={{aspectRatio:'1 / 1'}}>
          <IconButton aria-label={'fish'} sx={{width:'100%',height:'100%', borderRadius:'inherit',}}><AddIcon fontSize={'large'}></AddIcon></IconButton>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SoundGrid;
