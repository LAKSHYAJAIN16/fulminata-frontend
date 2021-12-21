import React from 'react';
import "../Footer/Footer.css";

export default function Footer() {
    return (
        <div>
            <footer className="footerMain">
                <p className="footerAboutUs"><b>About us</b></p>
                <p className="footerAboutUsContent">
                    Fulminata is an Indie Company founded by Lakshya Jain.
                    <br />
                    We are Based in India.
                </p>
                <p className="footerContactUs">Contact Us</p>

                <i class="footerEmailIcon fas fa-envelope-square"></i>
                <p className="footerEmailText">minecraftpogtechno@gmail.com</p>

                <i class="footerPhoneIcon fas fa-phone-square-alt"></i>
                <p className="footerPhoneText">6969420691</p>

                <p className="footerCopyright">Copyright @ 2021 Fulminata Ltd.</p>
            </footer>
        </div>
    )
}
