import React from 'react'
import "../Comment/Comment.css";

export default function Comment({ comment }) {
    //Path Variables
    const PF = "http://localhost:5000/images/";

    return (
        <>
            <div>
                <p className="commentComponentUsername">{comment.user.username}</p>
                <div className="commentComponentMain">
                    <div className="commentComponentIconAndText">
                        <img
                            className="commentinputPic"
                            src={PF + comment.user.profilePic}
                            alt="Profile Pic"
                        />
                        <p className="commentComponentTextMain">{comment.text}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
