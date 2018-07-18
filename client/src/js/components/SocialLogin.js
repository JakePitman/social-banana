import React from 'react';
import { handleClick } from './SettingsPage'
import loginlink from '../../css/img/sign-in/Sign-In-Small---Default.png'

class SocialLogin extends React.Component {

    

    render() {
        return (
        <div className="social-login">
               <img className="linkedin-button" src={loginlink} onClick={handleClick} alt="linkedin-signin" />

        </div>
    
        )
    }
}



export default SocialLogin