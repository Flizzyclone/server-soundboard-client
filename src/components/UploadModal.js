import React, {useContext, useState} from 'react';
import './login.css';
import { Modal, Paper, Button, Stack, Input, Typography, CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import HomeContext from './HomeContextProvider';

function UploadModal() {
  const { uploadingSound, confirmUpload } = useContext(HomeContext);

  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileStatus, setFileStatus] = useState('Upload a Sound (MP3)')
  const [fileName, setFileName] = useState('')

  function sleep(n) { return new Promise(resolve=>setTimeout(resolve,n)); } //temp

  const handleUpload = async (e) => {
    setLoading(true);
    await sleep(2000)
    setLoading(false);
    setFileStatus('File Selected:');
    setFileName(e.target.files[0].name);
    setUploaded(true);
  }

  return (
    <div>
      <Modal open={uploadingSound}>
        <Paper sx={{width:'fit-content', aspectRatio:'3 / 1.5', minWidth:'30%', padding:'1em', position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)'}}>
          <Stack spacing={2}>
            <Typography variant="h5" sx={{width:'100%'}}>Upload New Sound</Typography>
            <label htmlFor="fileUpload">
            <Input type="file" inputProps={{"accept":".mp3"}} id="fileUpload" sx={{display:'none'}} onChange={(e) => handleUpload(e)}></Input>
            <LoadingButton component="span" loading={loading} loadingIndicator={<CircularProgress color="inherit" size={64}/>} variant='outlined' type='file' sx={{padding:'4px', width:'100%', aspectRatio:'1 / 0.5', fontSize:'large'}}>{fileStatus}<br/>{fileName}</LoadingButton>
            </label>
            <Button variant='contained' sx={{maxWidth:'fit-content', alignSelf:'flex-end'}} disabled={!uploaded} onClick={(e) => confirmUpload(fileName)}>Confirm</Button>
          </Stack>
        </Paper>
      </Modal>
    </div>
  );
}

export default UploadModal;
