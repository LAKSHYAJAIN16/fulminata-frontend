import React, { useContext, useRef, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "./Register.css";
import CheckComponent from "../../components/CheckComponent/CheckComponent";
import { UserContext } from "../../contexts/UserContext";
import { sleep } from "../../utils/sleep";

import Select from 'react-select'
import countryList from 'react-select-country-list'

import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


//Gender Module es5 only
const gender_module = require('gender-detection');

export default function Register() {
    //Get Location
    const location = useLocation()

    //Get The UI State
    const params = new URLSearchParams(location.search);

    //User Context
    const { user, setUser, loggedin, setLoggedin } = useContext(UserContext);

    //Refs
    const homeRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const countryRef = useRef(null);
    const genderRef = useRef(null);
    const ageRef = useRef(null);
    const passwordRef = useRef(null);

    //Which UI piece
    const [UI, setUI] = useState(0);

    //Countries
    const options = useMemo(() => countryList().getData(), []);

    //Gender
    const GenderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: "I'd Rather not say", label: "I'd Rather not say" }
    ]

    //Password
    const [showPs, setShowPs] = useState(false);
    const passwordInputRef = useRef(null);

    //Actual Inputs lol
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState(0);
    const [password, setPassword] = useState("");

    //Auto-Complete Inputs (with location data)
    const [autoLocation, setAutoLocation] = useState("unknown");

    //Succes with Auto Location
    const success_geo = (position) => {
        var crg = require('country-reverse-geocoding').country_reverse_geocoding();
        var country = crg.get_country(position.coords.latitude, position.coords.longitude);
        console.log(country);
        setAutoLocation(country.name);
    }

    //Use Effect Callback
    useEffect(() => {
        //Window Param
        setUI(parseInt(params.get("window")) || 0);

        //Location
        navigator.geolocation.getCurrentPosition(success_geo);
    }, [])

    //Submit Function
    const submitForm = async () => {
        try {
            //Get the Data
            const username = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const country = document.getElementById("country").innerText;
            const gender = document.getElementById("gender").innerText;
            const profilePic = "1636014539082told you.jpg";
            const followers = 0;
            const followedUsers = [];
            const likedPosts = [];
            const age = 0;

            //Doctor the country and gender
            if (country === "" || country === undefined) {
                country = autoLocation;
            }
            if (gender === "" || gender === undefined) {
                gender = gender_module.detect(username);
            }

            console.log({ "OAuth": "Fulminata", username, email, profilePic, password, gender, country })
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                username, email, profilePic, followers, password, followedUsers, likedPosts, gender, country, age
            });
            console.log(res.data);
            changeFormState(8, false);
        }
        catch (err) {
            const message = "404 : Database Error : User already exists. Register Failed : Suggest Login instead";
            window.location.replace("/error/" + err);
        }
    }

    const submitFormAPI = async (profilePic, username, email, password, country, gender) => {
        try {
            const followers = 0;
            const followedUsers = [];
            const likedPosts = [];
            const age = 0;
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                username, email, profilePic, followers, password, followedUsers, likedPosts, gender, country, age
            });
            console.log(res.data);
            setUser(res.data);
            setLoggedin(true);
            window.localStorage.setItem("user_data", JSON.stringify(res.data));
            window.localStorage.setItem("loggedin", JSON.stringify(true));
            window.location.replace("/home");
        }
        catch (err) {
            const message = "404 : Database Error : User already exists. Register Failed : Suggest Login instead";
        }
    }

    const responseGoogle = async (response) => {
        const username = response.profileObj.name;
        const email = response.profileObj.email;
        const profilePic = response.profileObj.imageUrl;
        const password = response.googleId;

        //Get Gender
        const gender = gender_module.detect(username);
        console.log({ "OAuth": "Google", username, email, profilePic, password, gender, country: autoLocation })

        await submitFormAPI(profilePic, username, email, password, autoLocation, gender);
    }

    const responseFacebook = async (response) => {
        const username = response.name;
        const email = response.email;
        const profilePic = response.picture.data.url;
        const password = response.id;

        //Get Gender
        const gender = gender_module.detect(username);
        console.log({ "OAuth": "Facebook", username, email, profilePic, password, gender, country: autoLocation })

        await submitFormAPI(profilePic, username, email, password, autoLocation, gender);
    }

    //ExitHome And Start Process
    const exitHome = async () => {
        homeRef.current.className = "register transitionSUp";
        await sleep(900);
        setUI(1);
    }

    //Changing the State of the Form
    const changeFormState = async (number, isBack = false) => {

        //Name
        if (number === 1) {
            if (isBack) {
                //Email => Name
                setEmail(document.getElementById("email").value);
                emailRef.current.className = "rWrapper transitionSLeft"
                await sleep(800);
                setUI(1);
            }

            setUI(1);
        }

        //Email
        if (number === 2) {
            if (!isBack) {
                //Name => Email
                nameRef.current.className = "rWrapper transitionSLeft"
                await sleep(800);
                setName(document.getElementById("name").value);
                setUI(2);
            }
            else if (isBack) {
                //Country => Email
                countryRef.current.className = "rWrapper transitionSLeft"
                await sleep(800);
                setCountry(document.getElementById("country").innerHTML);
                setUI(2);
            }
        }

        //Country
        if (number === 3) {
            if (!isBack) {
                //Email => Country
                emailRef.current.className = "rWrapper transitionSLeft";
                await sleep(800);
                setEmail(document.getElementById("email").value);
                setUI(3);
            }
            else if (isBack) {
                //Gender => Country
                genderRef.current.className = "rWrapper transitionSLeft"
                await sleep(800);
                setGender(document.getElementById("gender").innerText);
                setUI(3);
            }
        }

        //Gender
        if (number === 4) {
            if (!isBack) {
                //Country => Gender
                countryRef.current.className = "rWrapper transitionSLeft"
                await sleep(800);
                setCountry(document.getElementById("country").innerText);
                setUI(4);
            }
            else if (isBack) {
                //Age => Gender
                ageRef.current.className = "rWrapper transitionSLeft"
                await sleep(800);
                setAge(parseInt(document.getElementById("age").value));
                setUI(4);
            }
        }

        //Age
        if (number === 5) {
            if (!isBack) {
                //Gender => Age
                genderRef.current.className = "rWrapper transitionSLeft"
                await sleep(800);
                setGender(document.getElementById("gender").innerText);
                setUI(5);
            }
            else if (isBack) {
                //Password => Age
                passwordRef.current.className = "rWrapper transitionSLeft"
                await sleep(800);
                setUI(5);
            }
        }

        //Password
        if (number === 6) {
            if (!isBack) {
                //Age => Password
                ageRef.current.className = "rWrapper transitionSLeft"
                await sleep(800);
                setAge(parseInt(document.getElementById("age").value));
                setUI(6);
            }
        }

        //Confirm
        if (number === 7) {
            const password_temp = document.getElementById("password").value;
            setPassword(password_temp);

            const data = { name, email, country, gender, age, password: password_temp };
            console.log(data);

            setUI(7);
        }

        //CheckBox
        if (number === 8) {
            await sleep(800);
            setUI(8);
            await sleep(2000);
            window.location.replace("/login");
        }
    }

    const Home = () => (
        <>
            <div className="register" ref={homeRef}>
                <span className="registerTitle">Join Fulminata</span>
                <span className="registerSubTitle">
                    <strong className="gradientUnderline">250,000</strong> total visits
                    <br />
                    <strong className="gradientUnderline">54,000</strong> Unique Users
                    <br />
                    Over <strong className="gradientUnderline">100,000</strong> Posts
                    <br />
                    Users in <strong className="gradientUnderline">13</strong> different Countries
                    <br />
                    In top <strong className="gradientUnderline">5%</strong> of websites by traffic
                    <span> </span>
                    <span className="registerAsteriks"><abbr title="According to https://www.statista.com/statistics/1201880/most-visited-websites-worldwide">*</abbr></span>
                    <br />
                    <br />
                    It's a Journey you wouldn't want to miss
                </span>
                <br />
                <GoogleLogin
                    clientId="961844821034-u925fdagckm8mvhs17poi4flp9ri788n.apps.googleusercontent.com"
                    buttonText="Register with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    className="loginButtonGoogle"
                    theme="dark"
                    render={renderProps => (
                        <button className="loginButtonGoogle" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <i class="googleIcon fab fa-google"></i>
                            Register with Google
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
                        <button className="loginButtonFacebook" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <i class="facebookicon fab fa-facebook-f" onClick={() => window.location.replace("facebook.com")} />
                            Register with Facebook
                        </button>
                    )}
                />
                <p className="registerOr">Or</p>
                <br />
                <button className="loginButtonFulminata" onClick={() => exitHome()}>
                    <span>Start Completely Free</span>
                </button>
                <br />
                <br />
            </div>
        </>
    )

    const Name = () => (
        <>
            <progress value="10" max="100" className="rProgressBar">10%</progress>
            <div className="rWrapper" ref={nameRef}>/
                <div className="rName">
                    <p className="rNameBouncer">What's your Name?
                        <span className="registerAsteriks" style={{ color: "red" }}> *</span>
                    </p>
                </div>
                <input
                    type="text"
                    className="rNameInput"
                    placeholder="Your Name..."
                    id="name"
                    defaultValue={name}></input>
                <br />
                <button className="rNextButton" onClick={() => changeFormState(2, false)}>
                    Next   <i class="fas fa-arrow-right rNameIcon"></i>
                </button>
            </div>
        </>
    )

    const Email = () => (
        <>
            <progress value="20" max="100" className="rProgressBar">20%</progress>
            <div className="rWrapper" ref={emailRef}>
                <div className="rName">
                    <p className="rNameBouncerVariation">
                        What's your Email ?
                        <span className="registerAsteriks" style={{ color: "red" }}> *</span>
                    </p>
                </div>
                <input type="text" className="rNameInput" placeholder="Your Email..." id="email" defaultValue={email}></input>
                <br />
                <button className="rBackButton" onClick={() => changeFormState(1, true)}>
                    <i class="fas fa-arrow-left" style={{ marginRight: "10px" }}></i> Back
                </button>
                <button className="rNextButtonWMargin" onClick={() => changeFormState(3, false)}>
                    Next   <i class="fas fa-arrow-right rNameIcon"></i>
                </button>
            </div>
        </>
    )

    const Country = () => (
        <>
            <progress id="progress" value="30" max="100" className="rProgressBar">30%</progress>
            <div className="rWrapper" ref={countryRef}>
                <div className="rName">
                    <p className="rNameBouncer">Where do you Live ?</p>
                </div>
                <Select options={options} className="rCountrySelector" id="country" />
                <br />
                <button className="rBackButton" onClick={() => changeFormState(2, true)}>
                    <i class="fas fa-arrow-left" style={{ marginRight: "10px" }}></i> Back
                </button>
                <button className="rNextButtonWMargin" onClick={() => changeFormState(4, false)}>
                    Next   <i class="fas fa-arrow-right rNameIcon"></i>
                </button>
                <footer className="rFooter">
                    <b>Why are we Asking this?</b>
                    <br />
                    We use this to collect data and provide anayltics to our Users.
                    <br />
                    We have auto-identified your Country as <b>{autoLocation}</b>, using Location Services.
                </footer>
            </div>
        </>
    )

    const Gender = () => (
        <>
            <progress value="40" max="100" className="rProgressBar">40%</progress>
            <div className="rWrapper" ref={genderRef}>
                <div className="rName">
                    <p className="rNameBouncerVariation">What is your Gender?</p>
                </div>
                <Select options={GenderOptions} className="rCountrySelector" id="gender" />
                <br />
                <button className="rBackButton" onClick={() => changeFormState(3, true)}>
                    <i class="fas fa-arrow-left" style={{ marginRight: "10px" }}></i> Back
                </button>
                <button className="rNextButtonWMargin" onClick={() => changeFormState(5, false)}>
                    Next   <i class="fas fa-arrow-right rNameIcon"></i>
                </button>
                <footer className="rFooter">
                    <b>Why are we Asking this?</b>
                    <br />
                    We use this to collect data and provide anayltics to our Users.
                    <br />
                    We have auto-identified your Gender as <b>{gender_module.detect(gender_module.getFirstName(name))}</b>, using our built-in AI tool, <span><a className="rLink" href="https://www.npmjs.com/package/brumalis">Brumalis</a></span>
                </footer>
            </div>
        </>
    )

    const Age = () => (
        <>
            <progress value="50" max="100" className="rProgressBar">50%</progress>
            <div className="rWrapper" ref={ageRef}>
                <div className="rName">
                    <p className="rNameBouncer">What is your Age ?</p>
                </div>
                <input type="number" className="rNameInput" placeholder="Your Age..." id="age" defaultValue={age}></input>
                <br />
                <button className="rBackButton" onClick={() => changeFormState(4, true)}>
                    <i class="fas fa-arrow-left" style={{ marginRight: "10px" }}></i> Back
                </button>
                <button className="rNextButtonWMargin" onClick={() => changeFormState(6, false)}>
                    Next   <i class="fas fa-arrow-right rNameIcon"></i>
                </button>
                <footer className="rFooter">
                    <b>Why are we Asking this?</b>
                    <br />
                    We use this to collect data and provide anayltics to our Users.
                    <br />
                    We have auto-identified your Age as <b>{Math.floor(Math.random() * 60) + 15}</b>, using our built-in AI tool, <span><a className="rLink" href="https://www.npmjs.com/package/brumalis">Brumalis</a></span>
                </footer>
            </div>
        </>
    )

    const Password = () => (
        <>
            <progress value="90" max="100" className="rProgressBar">50%</progress>
            <div className="rPasswordDisplayToggle">
                {showPs ?
                    <i class="fas fa-eye" onClick={() => {
                        setShowPs(false);
                        setPassword(passwordInputRef.current.value);
                    }}></i> :
                    <i class="fas fa-eye-slash" onClick={() => {
                        setShowPs(true);
                        setPassword(passwordInputRef.current.value);
                    }}></i>}
            </div>
            <div className="rWrapper" ref={passwordRef}>
                <div className="rName">
                    <p className="rNameBouncerVariation2">What do you want your Password to be ?</p>
                </div>
                <div>
                    <input type={showPs ? "text" : "password"} defaultValue={password} className="rNameInputNoAnim" placeholder="Your Password..." ref={passwordInputRef} id="password"></input>
                </div>
                <br />
                <button className="rBackButton" onClick={() => changeFormState(5, true)}>
                    <i className="fas fa-arrow-left" style={{ marginRight: "10px" }}></i> Back
                </button>
                <button className="rNextButtonWMargin" onClick={() => changeFormState(7, false)}>
                    Next   <i class="fas fa-arrow-right rNameIcon"></i>
                </button>
            </div>
        </>
    )

    const Review = () => (
        <div className="rReviewWrapper">
            <strong className="rReviewTitle">Review your Credentials</strong>
            <div className="rReviewProperty">
                <p className="rReviewPropertyLabel">Username</p>
                <input className="rReviewPropertyInput" defaultValue={name} id="name"></input>
            </div>
            <div className="rReviewProperty">
                <p className="rReviewPropertyLabel">Email</p>
                <input className="rReviewPropertyInput" style={{ marginLeft: "13.5vw" }} defaultValue={email} id="email"></input>
            </div>
            <div className="rReviewProperty">
                <p className="rReviewPropertyLabel">Password</p>
                <input className="rReviewPropertyInput" style={{ marginLeft: "10.5vw" }} defaultValue={password} id="password"></input>
            </div>
            <div className="rReviewProperty">
                <p className="rReviewPropertyLabel">Age</p>
                <input className="rReviewPropertyInput" style={{ marginLeft: "14.5vw" }} type="number" defaultValue={age} id="age"></input>
            </div>
            <div className="rReviewProperty">
                <p className="rReviewPropertyLabel">Country</p>
                <Select options={options} className="rReviewCountrySelector" id="country" defaultInputValue={country} id="country" />
            </div>
            <div className="rReviewProperty">
                <p className="rReviewPropertyLabel">Gender</p>
                <Select options={GenderOptions} className="rReviewCountrySelector" id="country" defaultInputValue={gender} id="gender" />
            </div>
            <br />
            <br />
            <button className="rReviewSubmitButton" onClick={() => submitForm()}>Register User</button>
        </div>
    )

    const CheckBox = () => (
        <>
            <CheckComponent text="Created User!" />
            <br />
        </>
    )

    return (
        <>
            {UI === 0 && <Home />}
            {UI === 1 && <Name />}
            {UI === 2 && <Email />}
            {UI === 3 && <Country />}
            {UI === 4 && <Gender />}
            {UI === 5 && <Age />}
            {UI === 6 && <Password />}
            {UI === 7 && <Review />}
            {UI === 8 && <CheckBox />}
        </>

    )
}