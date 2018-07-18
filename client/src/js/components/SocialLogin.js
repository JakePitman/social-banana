import React from 'react';
import loginlink from '../../css/img/sign-in/Sign-In-Small---Default.png'

class SocialLogin extends React.Component {

    

    render() {
        return (
        <div className="social-login">
               <img className="listing-media-logo" src={loginlink} onClick=""alt="linkedin_logo" />

        </div>
    
        )
    }
}



export default SocialLogin