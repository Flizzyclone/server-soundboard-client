import React, {useContext, useState} from 'react';
import './login.css';
import { Modal, Paper, Button, Stack, Input, Typography, CircularProgress, Snackbar, Alert, AlertTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import HomeContext from './HomeContextProvider';
import AppContext from './AppContextProvider';

const BASE_URL = 'http://localhost:4001';

function UploadModal() {
  const { uploadingSound, confirmUpload, sounds } = useContext(HomeContext);
  const { bearer, username } = useContext(AppContext);

  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileStatus, setFileStatus] = useState('Upload a Sound (MP3)');
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState(false);

  const handleSelection = async (e) => {
    setFileStatus('File Selected:');
    setFileName(e.target.files[0].name);
    setFile(e.target.files[0]);
    setUploaded(true);
  }

  const handleUpload = async () => {
    setLoading(true);
    let headers = new Headers();
    headers.set('Authorization',`Bearer ${bearer}`)
    let formData = new FormData();
    formData.append('file',file);
    formData.append('user',username);
    formData.append('soundName',`Sound ${sounds.length+1}`)
    await fetch(`${BASE_URL}/sound/new`, {
      method:'POST',
      headers:headers,
      body: formData
    }).then(() => {
      confirmUpload();
      setLoading(false);
      setFileStatus('Upload a Sound (MP3)');
      setFileName('');
      setFile();
    }).catch((err) => {
      setLoading(false);
      setErrorMsg(true);
    })
  }

  return (
    <div>
      <Snackbar open={errorMsg} autoHideDuration={6000} onClose={() => setErrorMsg(false)}>
        <Alert variant='filled' severity="error" sx={{ width: '100%' }}>
          <AlertTitle>File Upload Failed!</AlertTitle>
          Please try again.
        </Alert>
      </Snackbar>
      <Modal open={uploadingSound}>
        <Paper sx={{width:'fit-content', aspectRatio:'3 / 1.5', minWidth:'30%', padding:'1em', position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)'}}>
          <Stack spacing={2}>
            <Typography variant="h5" sx={{width:'100%'}}>Upload New Sound</Typography>
            <label htmlFor="fileUpload">
            <Input type="file" inputProps={{"accept":".mp3"}} id="fileUpload" sx={{display:'none'}} onChange={(e) => handleSelection(e)}></Input>
            <LoadingButton component="span" loading={loading} disabled={loading} loadingIndicator={<CircularProgress color="inherit" size={64}/>} variant='outlined' type='file' sx={{padding:'4px', width:'100%', aspectRatio:'1 / 0.5', fontSize:'large'}}>{fileStatus}<br/>{fileName}</LoadingButton>
            </label>
            <LoadingButton variant='contained' sx={{maxWidth:'fit-content', alignSelf:'flex-end'}} loading={loading} disabled={!uploaded} onClick={handleUpload}>Confirm</LoadingButton>
          </Stack>
        </Paper>
      </Modal>
    </div>
  );
}

export default UploadModal;
