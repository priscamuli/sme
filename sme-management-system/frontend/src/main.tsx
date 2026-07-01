import React from 'react';
import { Toaster } from "react-hot-toast";
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/AppRoutes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-right" />
    <AppRoutes />
  </React.StrictMode>
);