import React from 'react';
import "../Spinner/Spinner.css";

export default function Spinner() {
    const options = [
        "Loading Awesomeness...",
        "Watching all 12 seasons of Blue Bloods...",
        "Getting a Coffee...",
        "Speedrunning 100 million subscribers on youtube...",
        "Walking my Dog...",
        "Getting on the Bedwars Leaderboards...",
        "Reading the full Harry Potter series",
        "Watching all the Avengers Movies..",
        "Eating some French Fries at McDonalds..",
        "Getting Coronavirus...",
        "Going to the Toilet..."
    ]
    return (
        <>
            <div className="mainLoader">
                <div className="loader">
                </div>
                <p className="loaderText">{options[Math.floor(Math.random() * options.length)]}</p>
            </div>
        </>
    )
}
