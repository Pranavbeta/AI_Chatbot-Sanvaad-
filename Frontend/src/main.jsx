import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from "react-hot-toast";
import axios from "axios";

// Configure axios defaults
axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL;;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add response interceptor for better error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const theme = createTheme({
  typography: {
    fontFamily: "Charm,serif",
    allVariants: { color: "white" },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='145081061041-h39vgdcbmieq5dp2dbhkj9fjvsi4epim.apps.googleusercontent.com'>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Toaster position="top-right" />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
