import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import "../welcome/Welcome.css";
import Footer from '../../components/Footer/Footer';
import { sleep } from '../../utils/sleep';

import stock from '../../assets/stock.jpeg';
import flexible from '../../assets/flexible.jpeg';
import opportunity from '../../assets/opportunity.jpeg';
import monetization from '../../assets/monetization.jpeg';
import connect from '../../assets/connect.jpeg';
import getStarted from '../../assets/getStarted.jpeg';

export default function Welcome() {
    //First Card States (The Stonks)
    const [userText, setUserText] = useState("");
    const [finishedAnim, setFinishedAnim] = useState(false);
    const stockRef = useRef(null);

    //Second Card States(FLEXIBLE)
    const flexibleRef = useRef(null);

    //Third Card States(OPPORTUNITY)
    const opportunityRef = useRef(null);

    //Fourth Card States(MONETIZATION)
    const monetizationRef = useRef(null);

    //Fifth Card(CONNECT)
    const connectRef = useRef(null);

    //SIXTH CART(GET STARTED)
    const getStartedRef = useRef(null);

    //Initialize UseEffect Hook
    useEffect(() => {
        const animation = async () => {
            const iters = Math.floor(Math.random() * 10000);
            const delay = 0.1;
            for (let i = 0; i < iters + 1; i += 10) {
                setUserText(i.toLocaleString());
                await sleep(delay);
            }
            setFinishedAnim(true);
        }
        animation();
    }, [])

    //Scroll method
    const scroll = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' })
    }

    //JSX
    return (
        <div>
            <div id="stonkmarket" ref={stockRef}>
                <div className="welcomeStockMarketText">
                    <p>{userText}</p>
                </div>
                <p className="welcomeStockMarketCU">Estimated Concurrent Users</p>
                <>
                    <div className="welcomeStockMarketTextTitle">
                        <p>Fulminata Powers Thousands of Users around the World</p>
                    </div>
                    <p className="welcomeStockMarketTextSubTitle">
                        In 2021 alone, Fulminata hosted of 20,000 stories and helped 180 people get jobs.
                        <br />And We don't intend to stop soon.
                    </p>
                    <button className="welcomeButtonLearnMore" onClick={() => scroll(flexibleRef)}>Learn More</button>
                </>
                <div className="welcomeMain">
                    <img
                        src={stock}
                        alt="stock"
                        className="welcomeStockThingy" />
                </div>
            </div>

            <div id="flexible" ref={flexibleRef}>
                <br />
                <div className="welcomecard">
                    <p className="welcomeFlexibleTitle welcomeTitle gradientUnderline">FLEXIBILITY</p>
                    <p className="welcomeFlexibleSubTitle welcomeSubTitle">
                        Fulminata Offers World Class Styling Tools.
                        <br />
                        Create posts and customize them with
                        <br />
                        minimal decision fatigue
                    </p>
                    <p className="welcomeCompanyTitle">
                        View the Docs    <Link to="/docs/leonidas" className="link" style={{ color: "lightblue", textDecoration: "underline" }}>Here
                        </Link>
                    </p>
                    <div className="welcomeLeftUp">
                        <i class="welcomeLeftDownArrow fas fa-chevron-up" onClick={() => scroll(stockRef)}></i>
                    </div>
                    <div className="welcomeLeftDown">
                        <i class="welcomeLeftDownArrow fas fa-chevron-down" onClick={() => scroll(opportunityRef)}></i>
                    </div>
                    <img src={flexible} alt="flexible" className="welcomeFlexibleThingy" />
                </div>
            </div>

            <div id="oppurtunity" ref={opportunityRef}>
                <br />
                <p className="welcomeFlexibleTitle welcomeTitle gradientUnderline">OPPORTUNITY</p>
                <p className="welcomeFlexibleSubTitle welcomeSubTitle">
                    Get Your Work noticed by hiring companies
                    <br />
                    and thousands of people giving constant
                    <br />
                    feedback and comments
                </p>
                <p className="welcomeCompanyTitle">Partner Companies : </p>
                <div className="welcomeFlexibleCompanies">
                    <i class="welcomeCompany fab fa-500px"></i>
                    <i class="welcomeCompany fab fa-accusoft"></i>
                    <i class="welcomeCompany fab fa-affiliatetheme"></i>
                    <i class="welcomeCompany fab fa-mdb"></i>
                    <i class="welcomeCompany fas fa-crow"></i>
                </div>
                <div className="welcomeLeftUp">
                    <i class="welcomeLeftDownArrow fas fa-chevron-up" onClick={() => scroll(flexibleRef)}></i>
                </div>
                <div className="welcomeLeftDown">
                    <i class="welcomeLeftDownArrow fas fa-chevron-down" onClick={() => scroll(monetizationRef)}></i>
                </div>
                <img src={opportunity} alt="flexible" className="welcomeFlexibleThingy" />
            </div>

            <div id="monetization" ref={monetizationRef}>
                <br />
                <p className="welcomeFlexibleTitle welcomeTitle gradientUnderline">ANALYTICS</p>
                <p className="welcomeFlexibleSubTitle welcomeSubTitle">
                    Fulminata offers world Class Anayltics to
                    <br />
                    give you information about your viewers.
                    <br />
                    Find out what your viewers like and use
                    <br />
                    the information to grow your account
                </p>
                <div className="welcomeLeftUp">
                    <i class="welcomeLeftDownArrow fas fa-chevron-up" onClick={() => scroll(opportunityRef)}></i>
                </div>
                <div className="welcomeLeftDown">
                    <i class="welcomeLeftDownArrow fas fa-chevron-down" onClick={() => scroll(connectRef)}></i>
                </div>
                <img src="https://images.pexels.com/photos/2330137/pexels-photo-2330137.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="flexible" className="welcomeFlexibleThingy" />
            </div>

            <div id="connect" ref={connectRef}>
                <br />
                <p className="welcomeFlexibleTitle welcomeTitle gradientUnderline">CONNECT</p>
                <p className="welcomeFlexibleSubTitle welcomeSubTitle">
                    Connect and Interact with users
                    <br />
                    from around the world. Get to see unique
                    <br />
                    memes, poems and stories from
                    <br />
                    around the world.
                </p>
                <div className="welcomeLeftUp">
                    <i class="welcomeLeftDownArrow fas fa-chevron-up" onClick={() => scroll(monetizationRef)}></i>
                </div>
                <div className="welcomeLeftDown">
                    <i class="welcomeLeftDownArrow fas fa-chevron-down" onClick={() => scroll(getStartedRef)}></i>
                </div>
                <img src={connect} alt="flexible" className="welcomeFlexibleThingy" />
            </div>

            <div id="getStarted" ref={getStartedRef}>
                <br />
                <p className="welcomeFlexibleTitle welcomeTitle gradientUnderline">GET STARTED</p>
                <p className="welcomeFlexibleSubTitle welcomeSubTitle">
                    What are you waiting for?
                    <br />
                    Fulminata is the Youtube for writers and coders and artists alike.
                    <br />
                    Just a Click the Signup and let your creativity run Wild!
                </p>
                <p className="welcomeFlexibleSubTitle welcomeSubTitle">
                    <button className="welcomeButtonGetStarted" onClick={() => window.location.replace("/register")}>Sign Up</button>
                    <button className="welcomeButtonLogin">Login</button>
                </p>
                <div className="welcomeLeftUp">
                    <i class="welcomeLeftDownArrow fas fa-chevron-up" onClick={() => scroll(connectRef)}></i>
                </div>
                <img src={getStarted} alt="flexible" className="welcomeFlexibleThingy" />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </div>
    )
}
