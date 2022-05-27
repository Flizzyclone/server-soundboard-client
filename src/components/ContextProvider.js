import React from "react";

function logIn(val) {
    appContext.loggedIn = true;
    appContext.bearer = val.token;
    appContext.username = val.username;
    window.sessionStorage.setItem("username",val.username);
    window.sessionStorage.setItem("token",val.token);
}

function LogOut() {
    appContext.loggedIn = false;
    appContext.bearer = '';
    appContext.username = '';
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("token");
}

const appContext = {
    username:'',
    bearer:'',
    loggedIn:false,
    editingSound:true,
    soundIndex:-1,
    sounds:[],
    updateLogIn:logIn,
    updateLogOut:LogOut
}

export const AppContextComponent = React.createContext(appContext);