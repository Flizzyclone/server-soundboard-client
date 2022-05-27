import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router';
import AppContext from '../components/AppContextProvider';
import SideMenu from '../components/SideMenu';
import SoundGrid from '../components/SoundGrid';
import UploadModal from '../components/UploadModal';
import '../components/home.css';
const BASE_URL = 'http://localhost:4001';

function Home() {
  const { loggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!loggedIn) {
      navigate("/login");
    }
  });


    return (
      <div>
        <UploadModal></UploadModal>
        <div id="sideDiv">
          <SideMenu></SideMenu>
        </div>
        <div id="homeDiv">
          <SoundGrid></SoundGrid>
        </div>
      </div>
    );
}

export default Home;
