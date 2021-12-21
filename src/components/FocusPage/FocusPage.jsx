import React from "react";
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { useLocation } from "react-router";
import axios from "axios";

import "../FocusPage/FocusPage.css";
import CommentInput from "../CommentInput/CommentInput";
import Comment from "../Comment/Comment";
import Spinner from "../../components/Spinner/Spinner";
import useLeonidasCallback from "../../utils/useLeonidasCallback";
import { UserContext } from "../../contexts/UserContext";
import { sleep } from "../../utils/sleep";
import { snum } from "../../utils/s";

import leonidas from "../../utils/leonidas-parser";
import { trim_leonidas } from "../../utils/leonidas-parser";

import "katex/dist/katex.min.css";

const FocusPage = () => {
    //Path Variables
    const PF = "http://localhost:5000/images/";
    const location = useLocation();

    //States (there's quite a lot ik)
    const [id] = useState(location.pathname.split("/")[2]);
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [desc, setDesc] = useState("");
    const [viewDesc, setViewDesc] = useState("");
    const [photo, setPhoto] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);
    const [imber, setImber] = useState(0);
    const [views, setViews] = useState(0);
    const [likedPosts, setLikedPosts] = useState([]);
    const [createdAt, setCreatedAt] = useState(Date.now());
    const [dif_user, setDif_user] = useState({});

    //UI States
    const [likeUIState, setLikeUIState] = useState("far fa-heart");
    const [likeUserState, setLikeUserState] = useState(false);

    //Complete States
    const [complete, setComplete] = useState({});

    //Spinner States
    const [fetched, setFetched] = useState(false);

    //Contexts
    const { user, setUser, loggedin, setLoggedin } = useContext(UserContext);

    //Div Refs
    const scrollRef = useRef(null);
    const descRef = useRef(null);

    //Leonidas refs
    const [remarkModules, setRemarkModules] = useState([]);
    const [rehypeModules, setRehypeModules] = useState([]);
    const [called, setCalled] = useState(false);

    //Initial useEffect function
    useEffect(() => {
        //For The Spinner
        setFetched(false);

        //LocalStorage
        const data = JSON.parse(window.localStorage.getItem("user_data"))
        setUser(JSON.parse(window.localStorage.getItem("user_data")) || {});
        setLoggedin(JSON.parse(window.localStorage.getItem("loggedin")) || false);

        //Post Object function (Retrieves all the data)
        const getPostObject = async () => {
            const link = "http://localhost:5000/api/posts/" + id;
            const res = await axios.get(link);
            setComplete(res.data);
            setTitle(res.data.title);
            setUsername(res.data.username);
            setDesc(res.data.desc);
            setViewDesc(trim_leonidas(res.data.desc));
            setPhoto(res.data.photo);
            setImber(res.data.imber);
            setLikes(res.data.likes);
            setViews(res.data.views);
            setDif_user(res.data.user);
            setComments(res.data.comments);
            setCreatedAt(new Date(res.data.createdAt).toUTCString());

            //Increment Views
            const title = res.data.title;
            const username = res.data.username;
            const desc = res.data.desc;
            const photo = res.data.photo;
            const imber = res.data.imber;
            const likes = res.data.likes;
            const comments = res.data.comments;
            const views = res.data.views + 2;
            const res_2 = await axios.put(link, {
                title,
                desc,
                username,
                photo,
                imber,
                likes,
                comments,
                views,
            });

            if (data === {}) {
                const _uid = data._id;
                const user_oi = await axios.get("http://localhost:5000/api/users/" + _uid);
                setLikedPosts(user_oi.data.likedPosts);
                console.log(user_oi);
                document.title = `${title} - Fulminata`
                for (let i = 0; i < user_oi.data.likedPosts.length; i++) {
                    const element = user_oi.data.likedPosts[i];
                    if (element.title == title) {
                        setLikeUserState(true);
                        setLikeUIState("fas fa-heart");
                    }

                }
            }

            setFetched(true);
        };

        //Scroll function
        const scroll = async () => {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        getPostObject();
        scroll();
    }, []);

    //Markdown aka Leonidas Callback
    useLeonidasCallback(() => {
        //Get our entire Description Object
        const desc_object = document.getElementsByClassName("singlePostDesc");
        const nodes = [];
        //Get All the Child nodes
        if (desc_object[0]) {
            const child_nodes = desc_object[0].childNodes;
            child_nodes.forEach((e) => {
                e.childNodes.forEach((f) => {
                    if (f.nodeName.toString() == "IMG") {
                        nodes.push(f);
                    }
                })
            })
        }

        //Leonidas Node
        if (desc_object[0]) {
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

    //Function which is called whenever a key is pressed
    const key_callback = (key) => {
        if (key == "Enter") {
            console.log("OK BOOMER");
        }
    }

    //Function to delete the post
    const delete_post = async () => {
        try {
            const link = "http://localhost:5000/api/posts/" + id;
            const res = await axios.delete(link);
            window.location.replace("/home");
        } catch (err) { }
    };

    //Function which initially brings up the editing menu
    const update_post_initial = () => {
        setUpdateMode(true);
    };

    //Function which updates the post fully
    const update_post_to_backend = async () => {
        try {
            const link = "http://localhost:5000/api/posts/" + id;
            console.log(link);
            console.log(desc);
            console.log(title);
            const res = await axios.put(link, {
                username,
                title,
                desc,
                user,
            });
            console.log(res.data);
            await sleep(10);
            window.location.reload();
        } catch (err) { }
    };

    //Function which likes the post
    const like_post = async () => {
        if(!loggedin){
            alert("Login to Like a Post!")
            return;
        }

        const link = "http://localhost:5000/api/posts/" + id;
        if (likeUserState === false) {

            //First, increment likes and everything
            let shallow_likes = likes;
            shallow_likes += 1;
            setLikes(shallow_likes);
            setLikeUIState("fas fa-heart");
            setLikeUserState(true);
            const res_2 = await axios.put(link, {
                title,
                desc,
                username,
                photo,
                imber,
                likes: shallow_likes,
                comments,
                views,
            });

            //Add this post to the liked posts
            const temp_liked = likedPosts;
            temp_liked.push(complete);
            const res_3 = await axios.put(`http://localhost:5000/api/users/v/${user._id}`, {
                likedPosts: temp_liked,
                user: user.username,
                password: user.password,
                email: user.email
            })
            console.log(res_3);
        }
        else {
            //First, decrease likes and everything
            let shallow_likes = likes;
            shallow_likes -= 1;
            setLikes(shallow_likes);
            setLikeUIState("far fa-heart");
            setLikeUserState(false);
            const res_2 = await axios.put(link, {
                title,
                desc,
                username,
                photo,
                imber,
                likes: shallow_likes,
                comments,
                views,
            });

            //Remove this post from the liked posts
            const temp_liked = likedPosts;
            for (let i = 0; i < temp_liked.length; i++) {
                const element = temp_liked[i];
                if (element.title === complete.title) {
                    temp_liked.splice(i, 1);
                }
            }
            const res_3 = await axios.put(`http://localhost:5000/api/users/v/${user._id}`, {
                likedPosts: temp_liked,
                user: user.username,
                password: user.password,
                email: user.email
            })
            console.log(res_3);
        }
    };

    //Empty CommentSection JSX
    const EmptyCommentSection = () => {
        return (
            <>
                {
                    !updateMode && (
                        <>
                            <hr className="singlePosth1" />
                            <div className="commentEmptyMain">
                                <p className="commentEmptyTitle">No Comments found</p>
                            </div>
                            <p className="commentEmptySubTitle">Why Not Start the Conversation?</p>
                            <CommentInput user={user} postId={id} />
                        </>
                    )
                }
            </>
        );
    };

    //Comments JSX
    const Comments = () => {
        return (
            <>
                {
                    !updateMode && (
                        <>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <hr className="singlePosth1" />
                            <h1 className="commentEmptyTitle">{`${comments.length} Comment${snum(comments.length)} Found`}</h1>
                            <CommentInput user={user} postId={id} />
                            {comments.map((value) => (
                                <Comment comment={value} />
                            ))}
                        </>
                    )
                }
            </>
        );
    };

    //Real JSX
    return (
        <div className="singlePost" autoFocus ref={scrollRef}>
            {fetched
                ? <div className="singlePostWrapper">
                    <img className="singlePostImg" src={PF + photo} alt="" ref={scrollRef} />
                    {updateMode ? (
                        <input
                            type="text"
                            className="singlePostTitleInput"
                            defaultValue={title}
                            id="title"
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>
                    ) : (
                        <h1 className="singlePostTitle" autoFocus={true} >
                            {title + "  "}
                            <i
                                class={likeUIState + " " + "singlePostLikeButton"}
                                onMouseDown={like_post}
                            />
                            {dif_user._id === user._id && (
                                <div className="singlePostEdit">
                                    <i
                                        className="singlePostIcon far fa-edit"
                                        onClick={update_post_initial}
                                    ></i>
                                    <i
                                        className="singlePostIcon far fa-trash-alt"
                                        onClick={delete_post}
                                    ></i>
                                </div>
                            )}
                        </h1>
                    )}
                    <div className="singlePostInfo">
                        <div className="singlePostprofile">
                            <span>
                                <Link to={"/userspec/" + dif_user._id} className="link">
                                    <img
                                        className="singlePostProfileImg"
                                        src={dif_user.profilePic[0] === "h" ? dif_user.profilePic : PF + dif_user.profilePic}
                                        alt="Profile Pic"
                                    />
                                </Link>
                            </span>
                            <p>
                                By
                                <b className="singlePosthoverIMG">
                                    <Link to={"/userspec/" + dif_user._id} className="link">
                                        {" " + username}
                                    </Link>
                                </b>
                            </p>
                        </div>
                        <span>{`View${snum(views)} : ${views}`}</span>
                        <span>{`Like${snum(likes)} : ${likes}`}</span>
                        <span>{createdAt.toLocaleString()}</span>
                    </div>
                    {updateMode ? (
                        <>
                            <textarea
                                className="singlePostDescInput"
                                autoFocus={true}
                                id="desc"
                                onChange={(e) => setDesc(e.target.value)}
                                onKeyPress={(e) => key_callback(e.key)}
                            >
                                {desc}
                            </textarea>
                            <button
                                className="singlePostButton"
                                onClick={update_post_to_backend}
                            >
                                Update Post
                            </button>
                        </>
                    ) : (
                        <div className="singlePostDesc" id="descThing" ref={descRef}>
                            <ReactMarkdown
                                children={viewDesc}
                                rehypePlugins={rehypeModules}
                                remarkPlugins={remarkModules}
                            />
                        </div>
                    )}
                    {comments.length <= 0 ? <EmptyCommentSection /> : <Comments />}
                </div>
                : <Spinner />
            }
        </div>
    );
};

export default FocusPage;
