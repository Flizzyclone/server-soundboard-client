import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AppContextProvider } from './components/AppContextProvider';
import { HomeContextProvider } from './components/HomeContextProvider';

// Pages

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Routing & Styling

const App = () => {
  return (
    <AppContextProvider>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ThemeProvider theme={darkTheme}><HomeContextProvider><HomePage /></HomeContextProvider></ThemeProvider>} />
          <Route path="/Login" element={<ThemeProvider theme={darkTheme}><LoginPage /></ThemeProvider>} />
        </Routes>
      </div>
    </Router>
    </AppContextProvider>
  );
};

export default App;