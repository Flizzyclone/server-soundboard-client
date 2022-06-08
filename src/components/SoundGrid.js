import React, {useContext, useEffect} from 'react';
import { Grid, Paper, IconButton, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import HomeContext from './HomeContextProvider';

function SoundGrid() {
  const { openUploadModal, sounds, soundImages, soundAudios, updateSounds, openEditModal } = useContext(HomeContext);

  useEffect(() => {
    updateSounds();
  },[]);

  const openEditModalProxy = (e,i) => {
    openEditModal(i);
  }

  const playSound = (blob) => {
    var audio = new Audio(blob);
    audio.play();
  }

  return (
    <Grid container spacing={4} sx={{margin:'auto', marginTop:'0em', maxWidth:'100%'}}>
      {sounds.map((s, i) => (
        <Grid key={i} item xs={3}>
        <Paper sx={{aspectRatio:'1 / 1', position:'relative', backgroundColor:s.color}}>
        <IconButton sx={{right:'4px', top:'4px', position:'absolute', aspectRatio:'1 / 1', zIndex:'2'}} variant="outlined" onClick={(e) => openEditModalProxy(e,i)}><EditIcon></EditIcon></IconButton>
          <Button onClick={() => playSound(soundAudios[i])} sx={{width:'100%',height:'100%', borderRadius:'inherit'}}>
            <Stack sx={{overflow:'hidden'}}>
              <img src={soundImages[i]} style={{margin:'auto',width:'60%',height:'auto'}}/>
              <Typography variant="h5" noWrap={true} sx={{maxWidth:'100%', color:'white'}}>{s.name}</Typography>
            </Stack>
          </Button>
        </Paper>
      </Grid>
      ))}
      <Grid item xs={3}>
        <Paper sx={{aspectRatio:'1 / 1'}}>
          <IconButton sx={{width:'100%',height:'100%', borderRadius:'inherit',}} onClick={openUploadModal}><AddIcon fontSize={'large'}></AddIcon></IconButton>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SoundGrid;
