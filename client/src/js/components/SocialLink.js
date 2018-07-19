import React from 'react'
import original from '../../css/img/original.png'
import socialLink from '../../css/components/socialLink.css'


class SigninControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
      }
    
      handleLoginClick() {
        alert('Yep..Margaret!')
        this.setState({isLoggedIn: true});
      }
    
      handleLogoutClick() {
        this.setState({isLoggedIn: false});
      }

      render() {
        return (
          <div className='SocialLink'>

            <script type="text/javascript" src="http://platform.linkedin.com/in.js">
                api_key: Your App Key //add your linkedIn aap key here
                authorize: true
              </script>    
            <script type="in/Login"></script>
            <a href="#" onClick={ this.handleLoginClick } type="button">
              <span id="icon-bg"><i class="fa fa-linkedin"></i></span>
              <span id="icon-label-bg">Login with LinkedIn</span>
             </a>
            <input type="button" 
                    onclick="onLinkedInLoad()" 
                    value="Sign in using LinkedIn account" 
                    href="#"
                    id="icon-label-bg"
                     />
          </div>
        );
      }
}

<a href="#" onclick="onLinkedInLoad();">
              <span id="icon-bg"><i class="fa fa-linkedin"></i></span>
              <span id="icon-label-bg">Login with LinkedIn</span>
             </a>

export { SigninControl } 