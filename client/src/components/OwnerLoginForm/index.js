import React, { useState } from 'react';
import '../../css/Walker.css';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
import { LOGIN_OWNER_USER } from '../../utils/mutations';

function OwnerLoginForm() {

    const [formData, setUserFormData] = useState({ email: '', password: '' });
    const [login] = useMutation(LOGIN_OWNER_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...formData, [name]: value})
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        alert('Owner: '+ formData.email + ' Logged In');

        try {
          const { data } = await login({
            variables: { ...formData }
          });
      
          Auth.login(data.login.token);
        } catch (e) {
          console.error(e);
        }
      };

      console.log(formData.email);
      console.log(formData.password);
    
    return (
        <form id="walker-login-form" className="login-form" onSubmit={handleFormSubmit}>
            <input className="signup-login-input" type="email" placeholder="Enter Email" name="email" onChange={handleInputChange} value={formData.email}></input>
            <input className="signup-login-input" type="text" placeholder="Enter Password" name="password" onChange={handleInputChange} value={formData.password}></input>
            <button disabled={!(formData.email && formData.password)} type="submit" variant="success" className="form-button" id="walker-login-button">SUBMIT</button>
         </form>
    )
}

export default OwnerLoginForm;