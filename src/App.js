import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './components/FontAwesomeIcons'
import './App.css';
import logo from "./images/logo.png"
function App() {

  const adminUser = {
    email: "admin@trainer.com",
    pass: "admin"
  }

  //const [user, setUser] =  useState({name: ""}, {email: ""});
  //const [error, setError] = useState("");

  const loginFunct = details =>{
    console.log(details);
  }

  const logOutFunct = () => {
    console.log("logout");
  }

  return (
    <div className='main'>
      <div className='sub-main'>
        <div>
          <div className='images'>
            <div className='container-image'>
              <img src={logo} alt="logo" className="logo" />
              
            </div>
          </div>
          <div className = 'form-div'>
            <label for='username' > Username </label>
            <FontAwesomeIcon icon = 'user' className='form-icon'></FontAwesomeIcon>
            <input type='text' id = 'username' placeholder='Username' className='form-input'></input>
          </div>
          <div className = 'form-div'>
            <label for='password' > Password </label> 
            <FontAwesomeIcon icon = 'lock' className='form-icon'></FontAwesomeIcon>
            <input type='text' placeholder='Password'  id = 'password' className='form-input'></input>
          </div>
          <div className = 'form-div'>
          <input type='button' className='form-button' value='LOG IN!' ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
