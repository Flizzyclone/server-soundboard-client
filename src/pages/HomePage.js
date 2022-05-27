import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router';
import { AppContextComponent } from '../components/ContextProvider';
import SideMenu from '../components/SideMenu';
import SoundGrid from '../components/SoundGrid'
import '../components/home.css';
const BASE_URL = 'http://localhost:4001';

function Home() {
  const context = useContext(AppContextComponent);
  const navigate = useNavigate();

  useEffect(() => {
    if(!context.loggedIn) {
      navigate("/login");
    }
  });

  return (
    <div>
      <div id="sideDiv">
        <SideMenu></SideMenu>
      </div>
      <div id="homeDiv">
        <SoundGrid/>
      </div>
    </div>
  );
}

export default Home;
