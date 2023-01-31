import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import EntrenadorContext from './components/EntrenadorContext'
import { Entrenador } from "./model/Entrenador";
import "./index.css"
import "bulma/css/bulma.css";

const Root = () => {
  let [entrenador, setEntrenador] = useState(null);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <EntrenadorContext.Provider value={{ entrenador, setEntrenador }}>
          <App />
        </EntrenadorContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);