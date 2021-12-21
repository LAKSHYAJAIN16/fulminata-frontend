import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import axios from "axios";

import { UserContext } from "../../contexts/UserContext";
import Spinner from "../../components/Spinner/Spinner";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [fetched, setFetched] = useState(false);
  const { user, setUser, loggedin, setLoggedin } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      setFetched(false);
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
      setFetched(true);

      if (loggedin) {
        const res_for_user = await axios.get("http://localhost:5000/api/users" + user._id);
        setUser(res_for_user.data);
        console.log(res_for_user.data);
      }
    }
    fetchPosts();

    //LocalStorage
    setUser(JSON.parse(window.localStorage.getItem("user_data")) || {});
    setLoggedin(JSON.parse(window.localStorage.getItem("loggedin")) || false);
    document.title = "Fulminata";
  }, [])
  return (
    <>
      <Header />
      <div className="home">
        {fetched
          ? <div className="explorePosts">
            <Posts posts={posts} />
          </div>
          :
          <>
            <Spinner />
          </>}
      </div>
    </>
  );
}

export default Home;