import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import SocketContext from './components/SocketContext';
import EntrenadorContext from './components/EntrenadorContext'
import "./index.css"
import "bulma/css/bulma.css";
import { obtenerEntrenador } from './utils/utils';

const Root = () => {
  let [entrenador, setEntrenador] = useState(obtenerEntrenador());
  const [socket, setSocket] = useState(null);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <EntrenadorContext.Provider value={{ entrenador, setEntrenador }}>
          <SocketContext.Provider value={{ socket, setSocket }}>
            <App />
          </SocketContext.Provider>
        </EntrenadorContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);