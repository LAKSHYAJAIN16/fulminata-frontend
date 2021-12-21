import React, { useEffect, useState } from "react";
import axios from "axios";

import "../explore/Explore.css";
import Spinner from "../../components/Spinner/Spinner";
import Post from "../../components/Post/Post";
import { imbercalculation } from "../../utils/imbercalculation";
import { sortimber } from "../../utils/sort";
import { imberformat } from "../../utils/imberformat";

export default function Explore() {
  //Some actual states
  const [posts, setPosts] = useState([]);
  const [fetched, setFetched] = useState(false);

  //Some Constants
  const [trending] = useState(12);

  useEffect(() => {
    const fetchPosts = async () => {
      setFetched(false);
      //Get Responses
      const res = await axios.get("http://localhost:5000/api/posts");
      const data = res.data;
      const buffer = [];

      //Get Imber for each post
      data.map((e) => {
        const likes = e.likes;
        const comments = e.comments;
        const views = e.views;
        const createdAt = e.createdAt;
        const imber = imbercalculation(likes, comments, views, new Date(e.createdAt));
        const formatedimber = imberformat(imber);

        //Add the imber to our buffer
        buffer.push({ obj: e, imber: imber });
      });

      //Sort the Buffer
      const sortedbuffer = sortimber(buffer);
      console.log(sortedbuffer);

      //NOW assign the state
      setPosts(sortedbuffer);

      //Cut the Trending Buffer
      posts.splice(trending);

      setFetched(true);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <p className="exploreHeading">TRENDING POSTS</p>
      <br />
      {fetched
        ? <div className="explorePosts">
          {posts.map((p) => (
            <>
              <div className="explorePostSingle">
                <Post post={p.obj} />
                <i className="explorePostIcon fas fa-arrow-up">
                  {`  ${imberformat(p.imber)}`}
                </i>
              </div>
            </>
          ))}
        </div>
        :
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner />
        </div>
      }
    </div>
  );
}
