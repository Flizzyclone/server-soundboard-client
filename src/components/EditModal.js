import React, {useContext, useState, useEffect} from 'react';
import './login.css';
import { Modal, Paper, Button, Stack, Input, Typography, TextField, CircularProgress, Snackbar, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import HomeContext from './HomeContextProvider';
import AppContext from './AppContextProvider';
import { BlockPicker  } from 'react-color';

const BASE_URL = 'http://localhost:4001';

function EditModal() {
  const { editingSound, sounds, soundIndex, closeEditModal, updateSounds } = useContext(HomeContext);
  const { bearer } = useContext(AppContext);

  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({show: false, msg:"",type:"error"});
  const [sound, setSound] = useState({name:'',color:"#121212",imagePath:'default.png'})

  const handleImgSelection = async (e) => {
    let newSound = JSON.parse(JSON.stringify(sound));
    newSound.imagePath = e.target.files[0].name;
    setSound(newSound);
    setFile(e.target.files[0]);
  }

  const handleSave = async () => {
    let failed = false;
    if(sound.name !== sounds[soundIndex].name) {
      setLoading(true);
      let headers = new Headers();
      headers.set('Authorization',`Bearer ${bearer}`);
      headers.set('id',sound.id);
      headers.set('name',sound.name);
      await fetch(`${BASE_URL}/sound/name`, {
        method:'POST',
        headers:headers
      }).then((res) => {
        if (res.status === 401) {
          setAlert({show: true, msg:"Action Not Authorized, Please Refresh and Login Again.",type:"error"});
          failed = true;
        }
      }).catch((err) => {
        setAlert({show: true, msg:"An Error Occured, Please Try Again!",type:"error"});
        failed = true;
      })
    }
    if(failed) { 
      closeEditModal();
      setLoading(false);
      updateSounds();
      return;
    }
    if(sound.color !== sounds[soundIndex].color) {
      let colorHeaders = new Headers();
      colorHeaders.set('Authorization',`Bearer ${bearer}`);
      colorHeaders.set('id',sound.id);
      colorHeaders.set('color',sound.color);
      await fetch(`${BASE_URL}/sound/color`, {
        method:'POST',
        headers:colorHeaders
      }).then((res) => {
        if (res.status === 401) {
          setAlert({show: true, msg:"Action Not Authorized, Please Refresh and Login Again.",type:"error"});
          failed = true;
        }
      }).catch((err) => {
        setAlert({show: true, msg:"An Error Occured, Please Try Again!",type:"error"});
        failed = true;
      })
    }
    if(failed) { 
      closeEditModal();
      setLoading(false);
      updateSounds();
      return;
    }
    if(sound.imagePath !== sounds[soundIndex].imagePath) {
      let colorHeaders = new Headers();
      colorHeaders.set('Authorization',`Bearer ${bearer}`);
      colorHeaders.set('id',sound.id);
      let formData = new FormData();
      formData.append('file',file);
      await fetch(`${BASE_URL}/sound/image`, {
        method:'POST',
        headers:colorHeaders,
        body: formData
      }).then((res) => {
        if (res.status === 401) {
          setAlert({show: true, msg:"Action Not Authorized, Please Refresh and Login Again.",type:"error"});
          failed = true;
        }
      }).catch((err) => {
        setAlert({show: true, msg:"An Error Occured, Please Try Again!",type:"error"});
        failed = true;
      })
    }
    if(failed) { 
      closeEditModal();
      setLoading(false);
      updateSounds();
      return;
    } else {
      setAlert({show: true, msg:"Changes Saved Successfully",type:"success"});
      updateSounds();
      closeEditModal();
      setLoading(false);
    }
  }

  const handleCancel = () => {
    closeEditModal();
  }

  const handleDelete = (id) => {
    let headers = new Headers();
    headers.set('Authorization',`Bearer ${bearer}`);
    headers.set('id',id);
    fetch(`${BASE_URL}/sound/delete`, {
      method:'POST',
      headers:headers
    }).then((res) => {
      if (res.status === 401) {
        setAlert({show: true, msg:"Action Not Authorized, Please Refresh and Login Again.",type:"error"});
      } else if (res.status === 200) {
        setAlert({show: true, msg:"Sound Deleted Successfully",type:"success"});
        closeEditModal();
        updateSounds();
      }
    }).catch((err) => {
      setAlert({show: true, msg:"An Error Occured, Please Try Again!",type:"error"});
    })
  }

  const setName = (val) => {
    let newSound = JSON.parse(JSON.stringify(sound));
    newSound.name = val;
    setSound(newSound);
  }

  const setColor = (val) => {
    let newSound = JSON.parse(JSON.stringify(sound));
    newSound.color = val.hex;
    setSound(newSound); 
  }

  const alertHide = () => {
    let newAlert = JSON.parse(JSON.stringify(alert));
    newAlert.show = false;
    setAlert(newAlert);
  }

  useEffect(() => {
    if(soundIndex !== -1) {
      setSound(sounds[soundIndex]);
    }
  },[soundIndex, sounds]);

  return (
    <div>
      <Snackbar open={alert.show} autoHideDuration={6000} onClose={() => alertHide()}>
        <Alert variant='filled' severity={alert.type} sx={{ width: '100%' }}>
          {alert.msg}
        </Alert>
      </Snackbar>
      <Modal open={editingSound}>
        <Paper sx={{width:'fit-content', aspectRatio:'3 / 1.5', minWidth:'30%', padding:'1em', position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)'}}>
          <Stack spacing={2}>
            <Typography variant="h5" sx={{width:'100%'}}>Edit Sound</Typography>
            <TextField value={sound.name} onChange={event => setName(event.target.value)} variant="outlined" label="Name"></TextField>
            <Stack spacing={1} direction="row">
            <label htmlFor="fileUpload" style={{width:'50%'}}>
            <Input type="file" inputProps={{"accept":"image/*"}} id="fileUpload" sx={{display:'none'}} onChange={(e) => handleImgSelection(e)}></Input>
            <LoadingButton component="span" loading={loading} disabled={loading} loadingIndicator={<CircularProgress color="inherit" size={32}/>} variant='outlined' type='file' sx={{padding:'4px', height:'70%', marginTop:'15%', aspectRatio:'1 / 1', fontSize:'medium'}}>Current Icon:<br/>{(sound.imagePath.replace('data\\images\\','').replace(sound.id,''))}</LoadingButton>
            </label>
            <BlockPicker color={sound.color} triangle={"hide"} onChangeComplete={setColor}></BlockPicker>
            </Stack>
            <Stack direction="row" spacing={1} sx={{justifyContent:'flex-start'}}>
              <Button variant='text' color="error" sx={{maxWidth:'fit-content'}} onClick={() => handleDelete(sounds[soundIndex].id)}>Delete</Button>
              <Stack direction="row" spacing={1} sx={{justifyContent:'flex-end',width:'100%'}}>
                <Button variant='outlined' sx={{maxWidth:'fit-content',justifySelf:'flex-end'}} onClick={handleCancel}>Cancel</Button>
                <LoadingButton variant='contained' sx={{maxWidth:'fit-content'}} loading={loading} onClick={handleSave}>Save</LoadingButton>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Modal>
    </div>
  );
}

export default EditModal;
