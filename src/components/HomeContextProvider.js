import React, { useState, createContext } from "react";

const HomeContext = createContext({});

const HomeContextProvider = ({children}) => {
    const [sounds, setSounds] = useState([]);
    const [uploadingSound, setUploadingSound] = useState(false);

    const openUploadModal = () => {
        setUploadingSound(true)
    }

    const confirmUpload = (fileName) => {
        let newSounds = sounds;
        newSounds.push({name: fileName})
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