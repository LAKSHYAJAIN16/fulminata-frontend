import React, { useContext, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { Prompt } from 'react-router';
import axios from 'axios';
import useKeyboardShortcut from 'use-keyboard-shortcut';

import "../../pages/write/Write.css"
import { UserContext } from '../../contexts/UserContext';

import leonidas, { trim_leonidas } from '../../utils/leonidas-parser';
import useLeonidasCallback from '../../utils/useLeonidasCallback';

import * as brumalis from "brumalis";

const Toggle = React.lazy(() => import("react-toggle"));

const Write = () => {
    const PF = "http://localhost:5000/images/";
    const { user, setUser, loggedin, setLoggedin } = useContext(UserContext);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [edit, setEdit] = useState(true);
    const [preview, setPreview] = useState(false);
    const [settings, setSettings] = useState(false);

    //Leonidas refs
    const [remarkModules, setRemarkModules] = useState([]);
    const [rehypeModules, setRehypeModules] = useState([]);
    const [called, setCalled] = useState(false);

    useEffect(() => {
        //LocalStorage
        setUser(JSON.parse(window.localStorage.getItem("user_data")) || {});
        setLoggedin(JSON.parse(window.localStorage.getItem("loggedin")) || false);
    }, [])

    useLeonidasCallback(() => {
        //Get our entire Description Object
        const desc_object = document.getElementsByClassName("singlePostDesc");
        const nodes = [];

        //Get All the Child nodes
        if (desc_object[0]) {
            const child_nodes = desc_object[0].childNodes;
            child_nodes.forEach((e) => {
                nodes.push(e);
                e.childNodes.forEach((f) => {
                    nodes.push(f);
                    f.childNodes.forEach((h) => {
                        nodes.push(h);
                    })
                })
            })

            let style = desc_object[0].style;
            const leo = leonidas(desc, style);
            style = leo.values;
            if (called === false) {
                setRehypeModules(leo.modules.rehype);
                setRemarkModules(leo.modules.remark);
                setCalled(true);
            }
        }
    })

    useKeyboardShortcut(['Control', 'S'], () => submitFormCS(), { overrideSystem: true })

    const submitForm = async (e) => {
        e.preventDefault();
        console.log("This works!");
        console.log(brumalis.identifyLanguageFromText(desc));
        /*        
        const username = user.username;
        const likes = 0;
        const views = 0;
        const imber = 0;
        const comments = [];

        const postdata = { title, desc, username, likes, views, comments, imber, user }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            postdata.photo = filename;
            console.log({ data });
            try {
                await axios.post("http://localhost:5000/api/upload", data);
            }
            catch (err) {
                console.log(err);
            }
        }

        try {
            console.log(postdata);
            const res = await axios.post("http://localhost:5000/api/posts", postdata);
            console.log(res.data);
            window.location.replace("/post/" + res.data._id);
        }
        catch (err) {
            console.log(err);
        }*/
    }

    const submitFormCS = async () => {
        const username = user.username;
        const likes = 0;
        const views = 0;
        const imber = 0;
        const comments = [];

        const postdata = { title, desc, username, likes, views, comments, imber, user }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            postdata.photo = filename;
            console.log({ data });
            try {
                await axios.post("http://localhost:5000/api/upload", data);
            }
            catch (err) {
                console.log(err);
            }
        }

        try {
            console.log(postdata);
            const res = await axios.post("http://localhost:5000/api/posts", postdata);
            console.log(res.data);
            window.location.replace("/post/" + res.data._id);
        }
        catch (err) {
            console.log(err);
        }
    }

    const setEditAndPreviewAndSettings = (edit, preview, settings) => {
        setEdit(edit);
        setPreview(preview);
        setSettings(settings);
    }

    return (
        <>
            <Prompt
                when={title !== "" || desc !== "" || file}
                message="You have unsaved changes. Are you sure you want to leave?"
            />
            <div className="writePreviewButtonsHolder">
                <button className="writeEditButton" onClick={() => setEditAndPreviewAndSettings(true, false, false)}>Edit</button>
                <button className="writePreviewButton" onClick={() => setEditAndPreviewAndSettings(false, true, false)}>Preview</button>
                <button className="writeEditButton" onClick={() => setEditAndPreviewAndSettings(false, false, true)}>Settings</button>
            </div>
            {edit && (
                <div className="write">
                    {file && (
                        <img
                            className="writeImg"
                            src={URL.createObjectURL(file)}
                            alt="IMAGE"
                        />
                    )}
                    <form className="writeForm" onSubmit={submitForm}>
                        <div className="writeFormGroup">
                            <label htmlFor="fileInput">
                                <i className="writeIcon fas fa-plus"></i>
                            </label>
                            <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                            <input
                                id="title"
                                className="writeInput"
                                placeholder="Title"
                                type="text"
                                defaultValue={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus={true}
                            />
                        </div>
                        <div className="writeFormGroup">
                            <textarea
                                id="desc"
                                className="writeInput writeText"
                                placeholder="Tell your story..."
                                type="text"
                                defaultValue={desc}
                                onChange={(e) => setDesc(e.currentTarget.value)}
                                autoFocus={true}
                            />
                        </div>
                        <button className="writeSubmit" type="submit">
                            Publish
                        </button>
                    </form>
                </div>
            )}
            {preview && (
                <div className="singlePost" autoFocus>
                    <div className="singlePostWrapper">
                        {file && (
                            <img
                                className="singlePostImg"
                                src={URL.createObjectURL(file)}
                                alt="image" />
                        )}
                        <h1 className="singlePostTitle" autoFocus={true} >{title + "  "}
                            <i
                                class={"far fa-heart" + " " + "singlePostLikeButton"}
                            />
                        </h1>
                        <div className="singlePostInfo">
                            <div className="singlePostprofile">
                                <span>
                                    <img
                                        className="singlePostProfileImg"
                                        src={user.profilePic[0] === "h" ? user.profilePic : PF + user.profilePic}
                                        alt="Profile Pic"
                                    />
                                </span>
                                <p>
                                    By
                                    <b className="singlePosthoverIMG">
                                        {" " + user.username}
                                    </b>
                                </p>
                            </div>
                            <span>{`Views : 0 `}</span>
                            <span>{`Likes : 0 `}</span>
                            <span>{`11/11/11`}</span>
                        </div>
                        <div className="singlePostDesc" id="descThing">
                            <ReactMarkdown
                                children={trim_leonidas(desc)}
                                rehypePlugins={rehypeModules}
                                remarkPlugins={remarkModules}
                            />
                        </div>
                    </div>
                </div>
            )}
            {settings && (
                <div className="writeSettings">
                    <p className="writeSettingsTitle gradientUnderline">Post Settings</p>
                    <span className="writeSettingsProperty">Use Styling <Toggle /></span>
                </div>
            )}
        </>
    )
}

export default Write
