import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Spinner from "../../components/Spinner/Spinner";
import Posts from "../../components/Posts/Posts";
import { s } from "../../utils/s";

export default function LikedPosts() {
    //Get Location
    const location = useLocation();

    //Get Our Parameters
    const params = new URLSearchParams(location.search);
    const [username] = useState(params.get("name"));
    const [id] = useState(params.get("id"));
    const [likedPosts, setLikedPosts] = useState([]);
    const [empty, setEmpty] = useState(false);

    //Loading
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        const get = async () => {
            setFetched(false);
            const res = await axios.get("http://localhost:5000/api/users/" + id);
            if (res.data.username != username) {
                window.location.replace("/error/Authentication Error : Username did not match the ID's assigned")
            }
            const likedPosts = res.data.likedPosts;
            setLikedPosts(likedPosts);
            likedPosts == undefined || likedPosts.length <= 0
                ? setEmpty(true)
                : setEmpty(false);
            setFetched(true);
        };
        get();
    }, []);

    const Empty = () => {
        return (
            <>
                {fetched
                    ? <>
                        <div style={{ textAlign: "center", zoom: 2 }}>
                            <p className="searchResultMain">
                                <b>No Liked Posts found</b>
                            </p>
                            <p className="searchResultNan">Why not like one now?</p>
                            <img
                                src="https://raw.githubusercontent.com/LAKSHYAJAIN16/assets/main/spiderman.gif"
                                alt="dancing gif"
                                style={{ borderRadius: "5%", borderWidth: "2px" }}
                            />
                        </div>
                    </>
                    : <Spinner />}
            </>
        )
    };

    const Filled = () => {
        return (
            <>
                <p className="searchResultMain">Found <b>{likedPosts.length}</b> {`Liked Post${s(likedPosts)}`}</p>
                <br />
                <Posts posts={likedPosts} />
            </>
        )
    }
    return (
        <>
            {empty
                ? <Empty />
                : <Filled />}
        </>
    )
}
