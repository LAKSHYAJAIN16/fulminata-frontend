import React, { useState, useContext } from 'react';
import axios from 'axios'

import { sleep } from '../../utils/sleep';
import { UserContext } from "../../contexts/UserContext";
import "../CommentInput/CommentInput.css";

export default function CommentInput({ user, postId }) {
    //Path Variables
    const PF = "http://localhost:5000/images/";

    //States which keeps track of stuff
    const [showButtons, setShowButtons] = useState(false);
    const [text, setText] = useState("");
    const { loggedin } = useContext(UserContext);

    //Submit Method
    const submit = async (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.id

        if (action === "cancel") {
            setShowButtons(false);
        }
        else if (action === "post") {
            const link = "http://localhost:5000/api/posts/" + postId;
            const res = await axios.get(link);
            const title = res.data.title;
            const username = res.data.username;
            const desc = res.data.desc;
            const photo = res.data.photo;
            const imber = res.data.imber;
            const likes = res.data.likes;
            const comments = res.data.comments;
            const views = res.data.views;

            comments.push({ user: user, text: text });

            const res_2 = await axios.put(link,
                { title, desc, username, photo, imber, likes, comments, views });
            console.log(res_2);

            await sleep(20);
            window.location.reload();
        }
    }

    return (
        <>
            {loggedin
                ? (
                    <>
                        <div className="commentinputMain">
                            <img
                                className="commentinputPic"
                                src={user.profilePic[0] === "h" ? user.profilePic : PF + user.profilePic}
                                alt="Profile Pic"
                            />
                            <form onSubmit={submit}>
                                <textarea
                                    className="commentinputInputMain"
                                    placeholder="Share something!"
                                    onChange={(e) => {
                                        setText(e.target.value);
                                        setShowButtons(true);
                                    }}
                                    id="textarea" />
                                <div className="commentinputMain">
                                    {showButtons && (
                                        <>
                                            <button className="commentinputCancelButton" id="cancel">Cancel</button>
                                            <button className="commentinputPostButton" id="post">Post</button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                        <hr className="commentinputh1" />
                    </>
                )
            
            : (
                <p>Login to Comment on Posts</p>
            )}
        </>
    )
}
