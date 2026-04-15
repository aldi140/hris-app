import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';

const params = new URLSearchParams(window.location.search);
const urlToken = params.get("token");
const urlUser = params.get("user");

if (urlToken && urlUser) {
  try {
    const user = JSON.parse(decodeURIComponent(urlUser));
    localStorage.setItem("token", urlToken);
    localStorage.setItem("user", JSON.stringify(user));
    window.history.replaceState({}, "", window.location.pathname);
  } catch (err) {
    console.error("Gagal parse auth dari URL:", err);
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
