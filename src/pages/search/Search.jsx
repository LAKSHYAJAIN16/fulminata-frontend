import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';

import { UserContext } from '../../contexts/UserContext';
import { isWhiteSpace } from '../../utils/whitespace';
import { search as searchSuggestions } from '../../utils/search';
import SearchSuggestion from '../../components/SearchSuggestion/SearchSuggestion';

import "../search/Search.css";

export default function Search() {
    const cutoff = 5;
    const [query, setQuery] = useState("");
    const [valid, setValid] = useState("searchIconPageGray fa fa-search");
    const [suggestions, setSuggestions] = useState([]);
    const { user, setUser, loggedin, setLoggedin } = useContext(UserContext);

    const search = () => {
        if (valid == "searchIconPageGray fa fa-search") {
            return;
        }
        else {
            const link = "/result?q=" + query;
            window.location.replace(link);
        }
    }

    const keyPress = (event) => {
        if (event.key == "Enter" && query != "") {
            search();
        }
    }

    const change = async (value) => {
        if (isWhiteSpace(value)) {
            setValid("searchIconPageGray fa fa-search")
        }
        else {
            setQuery(value);
            setValid("searchIconPage fa fa-search")
        }


        const res = await axios.get("http://localhost:5000/api/posts");
        const temp_posts = res.data;

        //Filter the Posts using the "Search" function
        const filtered_posts = searchSuggestions(query, temp_posts);
        filtered_posts.splice(cutoff, filtered_posts.length);
        console.log(filtered_posts);
        setSuggestions(filtered_posts);
    }

    useEffect(() => {
        //LocalStorage
        setUser(JSON.parse(window.localStorage.getItem("user_data")) || {});
        setLoggedin(JSON.parse(window.localStorage.getItem("loggedin")) || false);
    }, [])
    return (
        <div className="searchMain">
            <div className="searchPageIconMain">
                <p className="searchPageUser">What are you looking for, <b>{user.username}</b>?</p>
                <input
                    type="text"
                    placeholder="Search"
                    aria-placeholder="Search"
                    autoFocus
                    autoCapitalize="on"
                    autoCorrect="on"
                    id="input"
                    className="searchInputMain"
                    onKeyPress={keyPress}
                    onChange={(e) => change(e.target.value)}
                ></input>
                <i
                    className={valid}
                    aria-hidden="true"
                    onMouseDown={search} />
                <SearchSuggestion posts={suggestions} />
            </div>
        </div >
    )
}
