import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useLocation } from "react-router-dom";

import Posts from "../../components/Posts/Posts";
import Spinner from "../../components/Spinner/Spinner";
import { search } from "../../utils/search";
import { s } from "../../utils/s";
import "../search/Search.css";

export default function SearchResult() {
    //Get Location
    const location = useLocation();
    console.log(location);

    //Get The Query
    const params = new URLSearchParams(location.search);
    const [query] = useState(params.get("q"));
    const [posts, setPosts] = useState([]);

    //Fetched State
    const [fetched, setFetched] = useState(false);

    //Get All Posts
    useEffect(() => {
        const fetchPosts = async () => {
            setFetched(false);
            //Retrieve the Posts once
            const res = await axios.get("http://localhost:5000/api/posts");
            const temp_posts = res.data;

            //Filter the Posts using the "Search" function
            const filtered_posts = search(query, temp_posts);
            setPosts(filtered_posts);
            console.log(filtered_posts);
            setFetched(true);
        }
        fetchPosts();
    }, [])

    return (
        <div>
            {fetched
                ? <>
                    <p className="searchResultMain">
                        {`Found ${posts.length} result${s(posts)} for `}
                        <b>{query}</b>
                        {` (${Math.random().toString().slice(0, 4)} seconds)`}</p>
                    <br />
                    <br />
                    {posts.length > 0
                        ? (<Posts posts={posts} />)
                        : (
                            <>
                                <p className="searchResultNan">WHOOPS! We Could not find any posts for your search</p>
                                <p className="searchResultNan"> Suggestions : </p>
                                <ul>
                                    <li className="searchResultListElement">Make sure that all words are spelled correctly.</li>
                                    <li className="searchResultListElement">Try different keywords.</li>
                                    <li className="searchResultListElement">Try more general keywords.</li>
                                    <li className="searchResultListElement">I totally didn't ripoff these suggestions from google what r u talking</li>
                                </ul>
                            </>
                        )}
                </>
                : <Spinner />}
        </div>
    )
}
