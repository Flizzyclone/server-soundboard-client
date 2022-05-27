import React, {useContext} from 'react';
import { useNavigate } from 'react-router';
import './login.css';
import { Modal } from '@mui/material'
import AppContext from './AppContextProvider'

function EditModal() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      <Modal></Modal>
    </div>
  );
}

export default EditModal;
