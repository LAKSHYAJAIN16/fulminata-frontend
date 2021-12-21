import React from 'react';
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom';
import "../Post/Post.css";

import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import { trim_leonidas } from '../../utils/leonidas-parser';

const Post = ({ post }) => {
    const PF = "http://localhost:5000/images/";
    return (
        <div className="post">
            {post.photo && (
                <img className="postImg" src={PF + post.photo} alt="Image" />
            )}
            <div className="postInfo">
                <Link className="link" to={`/post/${post._id}`}>
                    <span className="postTitle">{post.title}</span>
                </Link>
                <span className="postDate">{post.username +" - " + new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="postDesc">
                <ReactMarkdown
                    children={trim_leonidas(post.desc)}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    remarkPlugins={[remarkGfm]} />
            </div>
        </div>
    )
}

export default Post;
