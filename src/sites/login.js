import React from 'react';
import { Redirect } from 'react-router-dom';
import { UIComponent } from './shared';
import './../styles/login.scss';

export class LoginPage extends React.Component{
    render(){
        return(
            <Login />
        );
    }
}

class Login extends React.Component{
    render(){
        return(
            <section className="login">
                <UIComponent ui_content={<LoginForm />} css_class="login-card" name="Log in" />
            </section>
        );
    }
}

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.confirmPassword = React.createRef();

        this.state = {
            redirect: false,
            newpw: false
        };
    }

    componentDidUpdate(prevState){
        if(prevState !== this.state){
            if(this.password.current){
                this.password.current.value = "";
            }
            if(this.confirmPassword.current){
                this.confirmPassword.current.value = "";
            }
        }
    }

    async login(){
        let formData = new FormData();
        formData.append('username', this.username.current.value);
        formData.append('password', this.password.current.value);

        const response = await fetch("./scripts/php/login.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if (data === "100"){
            this.setState({redirect: true});
        }else if(data === "500"){
            this.setState({newpw: true});
        }else{
            alert("User not found");
        }
    }

    async newPassword(){
        if(this.password.current.value === this.confirmPassword.current.value){
            let formData = new FormData();
            formData.append('username', this.username.current.value);
            formData.append('password', this.confirmPassword.current.value);

            const response = await fetch("./scripts/php/updatepassword.php", {
                method: "POST",
                body: formData
            });

            const data = await response.text();

            if(data === "100"){
                alert("Password changed.");
                this.setState({newpw: false});
            }else{
                alert("Sorry something went wrong.")
            }
        }else{
            alert("The passwords must be identical.")
        }
    }

    async forgotPassword(){
        //Implement Project specific
    }

    render(){
        if(this.state.redirect === true){
            return(
                <Redirect to="/dashboard" />
            );
        }else if(this.state.newpw === true){
            return(
                <div className="reset-form">
                    <div className="reset-item">
                        <label className="text-big">Username:</label>
                        <input className="input" ref={this.username} />
                    </div>
                    <div className="reset-form-half">
                        <label className="text-big">New Password:</label>
                        <input className="input" type="password" ref={this.password} />
                    </div>
                    <div className="reset-form-half">
                        <label className="text-big">Confirm Password:</label>
                        <input className="input" type="password" ref={this.confirmPassword} />
                    </div>
                    <div className="clear" />
                    <div className="reset-buttons">
                        <button className="btn-main" onClick={() => this.newPassword()}>Save</button>
                    </div>
                    <div className="clear" />
                </div>
            );
        }else{
            return(
                <div className="login-form">
                    <div className="login-form-half">
                        <label className="text-big">Username:</label>
                        <input className="input" type="text" ref={this.username} />
                    </div>
                    <div className="login-form-half">
                        <label className="text-big">Password:</label>
                        <input className="input" type="password" ref={this.password} />
                    </div>
                    <div className="clear" />
                    <div className="login-buttons">
                        <button className="btn-main" onClick={() => this.forgotPassword()}>Passwort vergessen</button>
                        <button className="btn-main" onClick={() => this.login()}>Log in</button>
                    </div>
                    <div className="clear" />
                </div>
            );
        }
    }
}