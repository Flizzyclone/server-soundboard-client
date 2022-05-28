import React, {useContext, useEffect} from 'react';
import { Grid, Paper, IconButton, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import EditIcon from '@mui/icons-material/Edit';
import HomeContext from './HomeContextProvider';

function SoundGrid() {
  const { openUploadModal, sounds, updateSounds } = useContext(HomeContext);

  useEffect(() => {
    console.log('upd sound')
    updateSounds();
  },[]);

  const openEditModal = () => {

  }

  console.log(sounds)

  return (
    <Grid container spacing={4} sx={{margin:'auto', marginTop:'0em', maxWidth:'100%'}}>
      {sounds.map((s, i) => (
        <Grid key={i} item xs={2}>
        <Paper sx={{aspectRatio:'1 / 1', position:'relative'}}>
        <IconButton sx={{width:'20%', right:'4px', top:'4px', position:'absolute', aspectRatio:'1 / 1', zIndex:'2'}} variant="outlined" onClick={(e) => openEditModal(e,i)}><EditIcon></EditIcon></IconButton>
          <Button sx={{width:'100%',height:'100%', borderRadius:'inherit'}}>
            <Stack sx={{overflow:'hidden'}}>
              <SurroundSoundIcon sx={{margin:'auto',fontSize:72}}></SurroundSoundIcon>
              <Typography variant="h5" noWrap={true} sx={{maxWidth:'100%'}}>{s.name}</Typography>
            </Stack>
          </Button>
        </Paper>
      </Grid>
      ))}
      <Grid item xs={2}>
        <Paper sx={{aspectRatio:'1 / 1'}}>
          <IconButton sx={{width:'100%',height:'100%', borderRadius:'inherit',}} onClick={openUploadModal}><AddIcon fontSize={'large'}></AddIcon></IconButton>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SoundGrid;
