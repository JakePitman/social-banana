import React from 'react'
import logo from './logo.png';

class LoginForm extends React.Component {

    state = {
        formType: 'login',
        loggingIn: false
    };

    handleSubmit = async (e) => {
        this.setState((prevState) => {
            return {
                loggingIn: true
            };
        });
    };

    render() {

        return (

            <form className={this.state.formType === 'login' ? 'form form-loginType' : 'form form-signUpType'}
                onSubmit={this.handleSubmit} >

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

                    <a className="signUp-toggle"
                        onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                                formType: 'signUp'
                            });
                        }}
                    >
                        Sign Up
                </a>
                </div>

                <div className="form-content">
                    <div className="form-input">
                        <input type="text" value={this.state.username} placeholder="username" />
                        <input type="text" value={this.state.password} placeholder="Password" />
                    </div>
                    <button type="submit">
                        {this.state.formType === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                </div>

            </form >
        );
    }
}

export { LoginForm }