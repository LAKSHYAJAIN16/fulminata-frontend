import React, { useEffect, useState } from "react";
import images from "../../utils/imagedata";
import "../Header/Header.css";

export default function Header() {

  //Initial States
  const [themeLG, setThemeLG] = useState("headerTitleLg")
  const [themeSM, setThemeSM] = useState("headerTitleSm");
  const [hero, setHero] = useState({img : "idk"});

  //Random Image
  const randomImg = () => {
    const element = images[Math.floor(Math.random() * images.length)];

    if (element.theme == 1) {
      setThemeLG("headerTitleLg");
      setThemeSM("headerTitleSm");
    }
    else if (element.theme == 2) {
      setThemeLG("headerTitleLgWhite");
      setThemeSM("headerTitleSmWhite");
    }

    return element;
  }

  useEffect(() => {
    setHero(randomImg());
  }, [])

  //JSX
  return (
    <div className="header">
      <div className="headerTitles">
        <span className={themeSM}>The Ultimate Blogging Website</span>
        <span className={themeLG}>FULMINATA</span>
      </div>
      <img
        className="headerImg"
        src={hero.img}
        alt=""
      />
    </div>
  );
}