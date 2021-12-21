import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import axios from "axios";

import "../userspec/Userspec.css";
import { s } from "../../utils/s";
import { UserContext } from "../../contexts/UserContext";
import Spinner from "../../components/Spinner/Spinner";
import Posts from "../../components/Posts/Posts";

export default function Userspec() {
  //Path Variables
  const PF = "http://localhost:5000/images/";
  const location = useLocation();

  //Get ID
  const [id] = useState(location.pathname.split("/")[2]);

  //Declare States
  const [pinUser, setPinUser] = useState({});
  const [followerState, setFollowerState] = useState(0);
  const [posts, setPosts] = useState([]);

  //Fetched State
  const [fetched, setFetched] = useState(false);

  //UI State
  const [followed, setFollowed] = useState(false);
  const [followClass, setFollowClass] = useState("userSpecButton")
  const [text, setText] = useState("Follow");

  //User Context
  const { user, setUser, loggedin, setLoggedin } = useContext(UserContext);

  //Use Effect init function
  useEffect(() => {
    //Retrieve User and posts
    const retrieve = async () => {
      setFetched(false);
      //Get All of the Data about the user we want to get
      const res_1 = await axios.get("http://localhost:5000/api/users/" + id);
      setPinUser(res_1.data);

      //Get OUR User, aka the viewer
      const UU = JSON.parse(window.localStorage.getItem("user_data"));
      setUser(UU || {});
      setLoggedin(true);

      //Get Posts
      const link = `http://localhost:5000/api/posts?user=${res_1.data.username}`;
      const res_2 = await axios.get(link);
      setPosts(res_2.data);

      //Set Followers
      const shallow_followers = res_1.data.followers == undefined ? 0 : res_1.data.followers;
      setFollowerState(shallow_followers);

      //Check if we've already followed the guy
      const followedUsers_temp = UU.followedUsers == undefined ? [] : UU.followedUsers;
      console.log(followedUsers_temp);
      for (let i = 0; i < followedUsers_temp.length; i++) {
        const element = followedUsers_temp[i];
        console.log(element);
        if (res_1.data.username == element.username) {
          setFollowed(true);
          setText("Following");
          setFollowClass("userSpecButtonGray");
        }
      }
      setFetched(true);
    };
    //LocalStorage
    retrieve();
  }, []);

  //Follow Function
  const follow = async () => {
    if(pinUser._id == user._id){
      alert("You Cannot Follow yourself!");
      return;
    }
    if (!followed) {
      //Update Users
      const followers = pinUser.followers + 1 || 1;
      if (followers == undefined || followers === undefined) {
        followers = 0;
      }
      const data = {
        username: pinUser.username,
        email: pinUser.email,
        password: pinUser.password,
        followers: followers,
        profilePic: pinUser.profilePic,
      };
      const URL = "http://localhost:5000/api/users/v/" + id;
      const res = await axios.put(URL, data);
      console.log(res);

      //Update user's followed users
      const link = "http://localhost:5000/api/users/v/" + user._id;
      const followedchannels = JSON.parse(localStorage.getItem("user_data")).followedUsers || [];
      if (followedchannels == undefined) followedchannels = [];
      followedchannels.push(pinUser);
      const data2 = {
        username: user.username,
        email: user.email,
        password: user.password,
        profilePic: pinUser.profilePic,
        followedUsers: followedchannels
      };
      const res2 = await axios.put(link, data2);
      console.log(res2);

      setFollowed(true);
      setText("Following");
      setFollowClass("userSpecButtonGray");
      window.location.reload();
    }
    else if (followed) {
      //Update Users
      const followers = pinUser.followers - 1 || 0;
      if (followers == undefined || followers === undefined) {
        followers = 0;
      }
      const data = {
        username: pinUser.username,
        email: pinUser.email,
        password: pinUser.password,
        followers: followers,
        profilePic: pinUser.profilePic,
      };
      const URL = "http://localhost:5000/api/users/v/" + id;
      const res = await axios.put(URL, data);
      console.log(res);

      //Update user's followed users
      const link = "http://localhost:5000/api/users/v/" + user._id;
      const followedchannels = user.followedUsers || [];
      if (followedchannels == undefined) followedchannels = [];
      for (let i = 0; i < followedchannels.length; i++) {
        const element = followedchannels[i];
        if (element._id == pinUser._id) {
          followedchannels.splice(i, 1);
        }
      }
      const data2 = {
        username: user.username,
        email: user.email,
        password: user.password,
        profilePic: pinUser.profilePic,
        followedUsers: followedchannels
      };
      const res2 = await axios.put(link, data2);
      console.log(res2);

      setFollowed(false);
      setText("Follow");
      setFollowClass("userSpecButton");
    }
  };

  //JSX
  return (
    <>
      {fetched
        ? <>
          <div className="userSpecMain">
            <br />
            <img
              className="userSpecImage"
              src={pinUser.profilePic[0] === "h" ? pinUser.profilePic : PF + pinUser.profilePic}
              alt="YAS"
            />
          </div>
          <div className="userSpecButtons">
            <button className={followClass} onClick={follow}>
              {text}
            </button>
            <button className="userSpecButton2">Contact</button>
          </div>
          <br />
          <br />
          <br />
          <div className="userSpecMain">
            <p className="userSpecTitle">{pinUser.username}</p>
            <p className="userSpecJoined">
              {"Joined " + new Date(pinUser.createdAt).toLocaleDateString()}
            </p>
            <p className="userSpecPosts">{`${posts.length} post${s(posts)}`}</p>
            <p className="userSpecFollowers">{`${followerState} followers`}</p>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Posts posts={posts} />
        </>
        : <Spinner />}
    </>
  );
}
