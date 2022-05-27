import React, { useState, createContext } from "react";

const AppContext = createContext({});

const AppContextProvider = ({children}) => {
    const [username, setUsername] = useState('');
    const [bearer, setBearer] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const logIn = (val) => {
        setLoggedIn(true);
        setBearer(val.token);
        setUsername(val.username);
        window.sessionStorage.setItem("username",val.username);
        window.sessionStorage.setItem("token",val.token);
    }

    const logOut = () => {
        setLoggedIn(false);
        setBearer('');
        setUsername('');
        window.sessionStorage.removeItem("username");
        window.sessionStorage.removeItem("token");
    }

    return (<AppContext.Provider
    value={{
        username,
        bearer,
        loggedIn,
        logIn,
        logOut
    }}>
        {children}
    </AppContext.Provider>)
}

export default AppContext
export { AppContextProvider };