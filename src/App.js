import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

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
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ThemeProvider theme={darkTheme}><HomePage /></ThemeProvider>} />
          <Route path="/Login" element={<ThemeProvider theme={darkTheme}><LoginPage /></ThemeProvider>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;