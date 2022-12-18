import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './components/FontAwesomeIcons'
import './style.scss';
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import logo from "./images/logo.png"
function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/">

    //       <Route path="login" element={<Login />} />
    //       <Route path="register" element={<Register />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>


    <Home />
  );
}

export default App;
