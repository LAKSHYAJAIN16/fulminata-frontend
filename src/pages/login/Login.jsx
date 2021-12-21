import axios from "axios";
import { useContext, useState, useEffect } from "react";

import "./Login.css";
import { UserContext } from "../../contexts/UserContext";

import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

export default function Login() {
    const { user, setUser, loggedin, setLoggedin } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem("user_data")) || {});
        setLoggedin(JSON.parse(window.localStorage.getItem("loggedin")) || false);
    }, [])

    //Submit Function
    const submitForm = async (e) => {
        if (loading) {
            return;
        }
        else {
            try {
                e.preventDefault();
                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;
                setLoading(true);
                const res = await axios.post("http://localhost:5000/api/auth/login", {
                    username, password
                });
                setUser(res.data);
                setLoggedin(true);
                window.localStorage.setItem("user_data", JSON.stringify(res.data));
                window.localStorage.setItem("loggedin", JSON.stringify(true));
                console.log(user);
                console.log(loggedin);
                setLoading(false);
            }
            catch (err) {
                const message = "404 : Database Error : Such User does not exist. Login Failed : Suggest Register instead";
                window.location.replace("/error/" + message);
            }
        }
    };

    //Submit using apis
    const submitFormAPI = async (email, password) => {
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                username: email, password
            });
            setUser(res.data);
            setLoggedin(true);
            window.localStorage.setItem("user_data", JSON.stringify(res.data));
            window.localStorage.setItem("loggedin", JSON.stringify(true));
            console.log(user);
            console.log(loggedin);
            setLoading(false);
            window.location.replace("/home");
        }
        catch (err) {
            const message = "404 : Database Error : User already exists. Register Failed : Suggest Login instead";
            //window.location.replace("/error/" + message);
        }
    }

    const responseGoogle = async (response) => {
        const username = response.profileObj.name;
        const password = response.wa;
        console.log(response);
        await submitFormAPI(username, password);
    }

    const responseFacebook = async (response) => {
        const username = response.name;
        const password = response.id;
        console.log(response);
        await submitFormAPI(username, password);
    }

    //The JSX
    return (
        <>
            <div className="loginWrapper">
                <img
                    src="https://cdn.dribbble.com/users/369527/screenshots/4028199/pietrasiak_manager_animation.gif"
                    className="loginBgImage" />
                <div className="login">
                    <span className="loginTitle">Login</span>
                    <form className="loginForm" onSubmit={submitForm}>
                        <label className="loginLabel">Username</label>
                        <input className="loginInput" type="text" placeholder="Enter your username..." id="username" />
                        <label className="loginLabel">Password</label>
                        <input className="loginInput" type="password" placeholder="Enter your password..." id="password" />
                        <button className="loginButton2Fulminata" type="submit">Login</button>
                    </form>
                    <br />
                    <br />
                    <span className="loginOr">or</span>
                    <GoogleLogin
                        clientId="961844821034-u925fdagckm8mvhs17poi4flp9ri788n.apps.googleusercontent.com"
                        buttonText="Register with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="loginButtonGoogle"
                        theme="dark"
                        render={renderProps => (
                            <button className="loginButtonGoogle2" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <i class="googleIcon fab fa-google"></i>
                                Login with Google
                            </button>
                        )}
                    />
                    <br />
                    <FacebookLogin
                        appId="4806369769383646"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook}

                        render={renderProps => (
                            <button className="loginButtonFacebook2" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <i class="facebookicon fab fa-facebook-f" onClick={() => window.location.replace("facebook.com")} />
                                Login with Facebook
                            </button>
                        )}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    {loading && (<p>Loading... Just a minute</p>)}
                </div>
            </div>
        </>
    );
}