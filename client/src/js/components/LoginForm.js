import React from 'react'
import logo from '../../css/img/logo.png';

class LoginForm extends React.Component {

    state = {
        formTypeIsLogin: true
    };

    render() {

        return (
            <form className={this.state.formTypeIsLogin ? 'form form-loginType' : 'form form-registerType'}>

                <div id="logoWorks">
                    <img src={logo} width="200" height="200" alt="logo" />
                </div>

                <div className="form-toggle">
                    <a className="login-toggle active"
                        onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                                formTypeIsLogin: true
                            });
                        }}
                    >
                        <p className={this.state.formTypeIsLogin ? "active" : ''}>
                            Login
                        </p>
                    </a>

                    <a className="register-toggle"
                        onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                                formTypeIsLogin: false
                            });
                        }}
                    >
                        <p className={this.state.formTypeIsLogin ? "" : "active"}>
                            Register
                        </p>
                    </a>
                </div>

                <div className="form-content">
                    <div className="form-input">
                        <input type="text" placeholder="email" />
                        <input type="text" placeholder="Password" />
                    </div>
                </div>

                <button type="submit" >
                    {this.state.formTypeIsLogin ? 'Login' : 'Register'}
                </button>

            </form >
        );
    }
}

export { LoginForm }
