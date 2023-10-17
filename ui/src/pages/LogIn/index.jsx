import { useState } from 'react';
import AuthService from '../../services/auth';
import AuthContext from '../../contexts/auth'



function LogIn() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = AuthContext.useLogin();
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const onLogIn = async () => {
    
    try { 
      
      const result = await AuthService.authenticate(email, password) 
      localStorage.setItem("user",JSON.stringify(result.data))
      dispatch({ type: "authentication", accessToken: result.data.accessToken })
    
    } 
    catch {
      alert("Failed")
    }
    
    

  }
  
  return (

   
    <>
       <h1>
        Body Max
      </h1>
      <label>
        Username:
        <input type="text" value={email} data-testid="email" onChange={handleUsernameChange} />
      </label>
      <label>
           Password:
        <input type="password" value={password} data-testid="password" onChange={handlePasswordChange} />
      </label>
      <button onClick={onLogIn} data-testid="login-button">Submit</button>
    </>
  );

  
}

export default LogIn