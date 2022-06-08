import React, { useState, useContext, createContext } from "react";
import AppContext from './AppContextProvider';
const HomeContext = createContext({});

const BASE_URL = 'http://localhost:4001';

const HomeContextProvider = ({children}) => {
    const [sounds, setSounds] = useState([]);
    const [soundImages, setSoundImages] = useState([]);
    const [soundAudios, setSoundAudios] = useState([]);
    const [uploadingSound, setUploadingSound] = useState(false);
    const [editingSound, setEditingSound] = useState(false);
    const [soundIndex, setSoundIndex] = useState(-1);
    const { bearer, username } = useContext(AppContext);

    const openUploadModal = () => {
        setUploadingSound(true)
    }

    const closeUploadModal = () => {
        setUploadingSound(false);
    }

    const openEditModal = (i) => {
        setSoundIndex(i);
        setEditingSound(true);
    }

    const closeEditModal = (i) => {
        setEditingSound(false);
        setSoundIndex(-1);
    }

    const updateSounds = async() => {
        let headers = new Headers();
        headers.set('Authorization',`Bearer ${bearer}`);
        headers.set('Username',username)
        await fetch(`${BASE_URL}/sound/`, {
            method:'GET',
            headers:headers
        }).then(async (res) => {
            let resJson = await res.json()
            setSounds(resJson.sounds.userSounds);
            getAllSoundAudios(resJson.sounds.userSounds);
            getAllSoundImages(resJson.sounds.userSounds);
        });
    }

    const getAllSoundImages = async(sound) => {
        let newSounds = [];
        for (let i=0; i < sound.length; i++) {
            let headers = new Headers();
            headers.set('Authorization',`Bearer ${bearer}`);
            headers.set('id',sound[i].id);
            await fetch(`${BASE_URL}/sound/image`, {
                method:'GET',
                headers:headers
            }).then(async (res) => {
                let blob = await res.blob();
                newSounds[i] = URL.createObjectURL(blob);
            });
        }
        setSoundImages(newSounds);
    }

    const getAllSoundAudios = async(sound) => {
        let newSounds = [];
        for (let i=0; i < sound.length; i++) {
            let headers = new Headers();
            headers.set('Authorization',`Bearer ${bearer}`);
            headers.set('id',sound[i].id);
            await fetch(`${BASE_URL}/sound/audio`, {
                method:'GET',
                headers:headers
            }).then(async (res) => {
                let blob = await res.blob();
                newSounds[i] = URL.createObjectURL(blob);
            });
        }
        setSoundAudios(newSounds);
    }

    const confirmUpload = async() => {
        setUploadingSound(false);
        updateSounds();
    }

    return (<HomeContext.Provider
    value={{
        sounds,
        soundImages,
        soundAudios,
        uploadingSound,
        editingSound,
        soundIndex,
        openUploadModal,
        closeUploadModal,
        confirmUpload,
        updateSounds,
        openEditModal,
        closeEditModal,
        getAllSoundImages,
        getAllSoundAudios
    }}>
        {children}
    </HomeContext.Provider>)
}

export default HomeContext
export { HomeContextProvider };