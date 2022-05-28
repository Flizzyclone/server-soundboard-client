import React, { useState, useContext, createContext } from "react";
import AppContext from './AppContextProvider';
const HomeContext = createContext({});

const BASE_URL = 'http://localhost:4001';

const HomeContextProvider = ({children}) => {
    const [sounds, setSounds] = useState([]);
    const [uploadingSound, setUploadingSound] = useState(false);
    const { bearer, username } = useContext(AppContext);

    const openUploadModal = () => {
        setUploadingSound(true)
    }

    const updateSounds =  async() => {
        let headers = new Headers();
        headers.set('Authorization',`Bearer ${bearer}`);
        headers.set('Username',username)
        await fetch(`${BASE_URL}/sound/`, {
            method:'GET',
            headers:headers
        }).then(async (res) => {
            let resJson = await res.json()
            setSounds(resJson.sounds.userSounds);
        });
    }

    const confirmUpload = async() => {
        updateSounds();
        setUploadingSound(false);
    }

    return (<HomeContext.Provider
    value={{
        sounds,
        uploadingSound,
        openUploadModal,
        confirmUpload,
        updateSounds
    }}>
        {children}
    </HomeContext.Provider>)
}

export default HomeContext
export { HomeContextProvider };