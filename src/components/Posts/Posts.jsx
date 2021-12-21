import React, { useEffect } from 'react'

import "../Posts/Posts.css";
import Post from '../Post/Post';
import isInViewport from '../../utils/isInViewport';

function Posts({ posts }) {
    const captureScroll = () => {
        console.log("got called");
        if (isInViewport(document.getElementById("detector"))) {
            alert("OMG THE CODE WORKED OMG")
        }
    }
    return (
        <>
            <div className="posts">
                {posts.map((p) => (
                    <Post post={p} key={Math.floor(Math.random() * 100)} />
                ))}
                <div className="postsDetector" id="detector" onScroll={() => captureScroll()}></div>
            </div>
        </>
    )
}

export default Posts;
