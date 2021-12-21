import React, {useContext} from 'react';
import axios from 'axios';

import { UserContext } from '../../contexts/UserContext';
import { sleep } from '../../utils/sleep';
import "../DeleteConfirmation/DeleteConfirmation.css";

export default function DeleteConfirmation() {
    const { user, setUser, loggedin, setLoggedin } = useContext(UserContext);
    const return_to_home = () =>{
        window.location.replace("/home");
    }

    const deleteUser = async() =>{
        //Send Backend Request
        const id = user._id;
        const res = await axios.delete("http://localhost:5000/api/users/" + id);
        console.log(res);

        //Send Frontend Request, cleaning storage
        setUser({});
        setLoggedin(false);
        window.localStorage.setItem("user_data", JSON.stringify({}));
        window.localStorage.setItem("loggedin", JSON.stringify(false));
        await sleep(10);

        //UI
        window.location.replace("/home");
    }
    return (
        <div className="deleteMain">
            <div className="deleteBox">
                <p className="deleteTitle">
                    You Sure?
                </p>
                <p className="deleteSubTitle">
                    By Deleting this account, you will wipe away all of your traces from our website : your profile data, your posts, EVERYTHING
                </p>
                <br />
                <br />
                <br />
                <br />
                
                <button className="deleteDeleteButton" onClick={deleteUser}>
                    Delete Account Permanently
                </button>
                <button className="deleteBackButton" onClick={return_to_home}>
                    Take Me Back to HomePage
                </button>
            </div>
        </div>
    )
}
