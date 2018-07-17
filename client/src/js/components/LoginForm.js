import React from 'react'
import logo from './logo.png';

class LoginForm extends React.Component {

    state = {
        formType: 'login'
    };

    render() {

        return (
            <form className={this.state.formType === 'login' ? 'form form-loginType' : 'form form-registerType'}>

                <div id="logoWorks">
                    <img src={logo} width="200" height="200" alt="logo" />
                </div>

                <div className="form-toggle">
                    <a className="login-toggle"
                        onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                                formType: 'login'
                            });
                        }}
                    >
                        Login
                </a>

                    <a className="register-toggle"
                        onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                                formType: 'register'
                            });
                        }}
                    >
                        Register
                </a>
                </div>

                <div className="form-content">
                    <div className="form-input">
                        <input type="text" placeholder="email" />
                        <input type="text" placeholder="Password" />
                    </div>
                    <button type="submit">
                        {this.state.formType === 'login' ? 'Login' : 'Register'}
                    </button>
                </div>

            </form >
        );
    }
}

export { LoginForm }