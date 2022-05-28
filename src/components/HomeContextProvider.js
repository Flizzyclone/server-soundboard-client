import React, { useState, createContext } from "react";

const HomeContext = createContext({});

const HomeContextProvider = ({children}) => {
    const [sounds, setSounds] = useState([]);
    const [uploadingSound, setUploadingSound] = useState(false);

    const openUploadModal = () => {
        setUploadingSound(true)
    }

    const confirmUpload = (fileName,fileId) => {
        let newSounds = sounds;
        newSounds.push({name: fileName}) //this isnt gonna work if user has two sounds with same name, no way to know what string server assigned for id, just request the api for the list of sounds again
        setSounds(newSounds);
        setUploadingSound(false);
    }

    return (<HomeContext.Provider
    value={{
        sounds,
        uploadingSound,
        openUploadModal,
        confirmUpload
    }}>
        {children}
    </HomeContext.Provider>)
}

export default HomeContext
export { HomeContextProvider };