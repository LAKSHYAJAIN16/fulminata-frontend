import React from 'react';
import { Link } from 'react-router-dom';

import "../SearchSuggestion/SearchSuggestion.css";

export default function SearchSuggestion({ posts }) {
    const PF = "http://localhost:5000/images/";
    return (
        <div>
            <br />
            {posts.map((post) => {
                return (
                    <>
                        <div className="searchSuggestion">
                            <p className="searchSuggestionTitle" onClick={() => window.location.replace(`post/${post._id}`)}>{post.title}</p>
                            <p className="searchSuggestionUsername">By {post.username}</p>
                            <img className="searchSuggestionImg" src={PF + post.photo} alt="Image" />
                        </div>
                    </>
                )
            })}
        </div>
    )
}
