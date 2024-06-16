/* // src/Testimonies.js
import React, { useContext, useEffect, useState } from 'react';
import './Testimonies.css';
import axios from 'axios';
import { UserContext } from "../../UserContext";

export default function Testimonies() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [testimonies, setTestimonies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/post') // assuming you have a backend API endpoint to fetch testimonies
     .then(response => {
        setTestimonies(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="testimonies-container">
      <h1 className="title">Testimonies</h1>
      <p className="subtitle">
        Hear from our graduates as they share their experiences and successes. From choosing the right courses and universities to achieving their academic goals
      </p>
      <div className="testimonies">
        {testimonies.map((testimony, index) => (
          <div key={index} className="testimony-card">
            <img src={testimony.files} alt={testimony.title} className="testimony-image" />
            <div className="profile-card">
              <div className='profile-cardandlike'>
                <div className='profile-imgandname'>
                  <img src='' alt='' className="profile-image" />
                  <p className="profile-name">{testimony.creator.username}</p>
                </div>
                <div className="profile-info">
                  <p className="profile-likes">
                    <span role="img" aria-label="heart">❤️</span>1.07k
                  </p>
                </div>
              </div>
              <p>{testimony.category}</p>
              <p className="profile-description">{testimony.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

 */





 import React, { useState, useEffect } from 'react';
import './Testimonies.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Testimonies ({ _id, title, summary, files, category, description, creator, likeCount })  {
    const [liked, setLiked] = useState(false);
    const [cookies] = useCookies(['token']);
    const [likeCountState, setLikeCountState] = useState(likeCount);

    useEffect(() => {
        if (cookies.token) {
            setLiked(true);
        }
    }, []);

    const handleLike = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4000/post/${_id}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookies.token}`,
                    },
                }
            );

            if (response.status === 200) {
                setLiked(!liked); // Toggle liked state
                setLikeCountState(response.data.likeCount); // Update like count from response
            } else {
                console.error('Failed to like testimony');
            }
        } catch (error) {
            console.error('Error while liking testimony:', error);
        }
    };

    return (
        <div className="testimonies-container">
            <div className="testimonies">
                <div className="testimony-card">
                    <Link to={`/post/${_id}`}>
                        <img src={`http://localhost:4000/${files}`} alt={title} className="testimony-image" />
                    </Link>
                    <div className="profile-card">
                        <div className="profile-cardandlike">
                            <div className="profile-imgandname">
                                <img src="" alt="" className="profile-image" />
                                <p className="profile-name">{creator.username}</p>
                            </div>
                            <div className="profile-info">
                                <button className="like-button" onClick={handleLike}>
                                    <span role="img" aria-label="heart">
                                        {!liked ?  '🤍' : '❤️'} 
                                    </span>
                                    <span className="like-count">{likeCountState} likes</span>
                                </button>
                            </div>
                        </div>
                        <p>{category}</p>
                        <p className="profile-description">{summary}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};































import React, { useState, useEffect } from 'react';
import './Testimonies.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Testimonies ({ _id, title, summary, files, category, description, creator, likeCount })  {
    const [liked, setLiked] = useState(false);
    const [cookies] = useCookies(['token']);
    const [likeCountState, setLikeCountState] = useState(likeCount);

    useEffect(() => {
        if (cookies.token) {
            setLiked(true);
        }
    }, [cookies]);

    const handleLike = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4000/post/${_id}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookies.token}`,
                    },
                }
            );

            if (response.status === 200) {
                setLiked(!liked); // Toggle liked state
                setLikeCountState(response.data.likeCount); // Update like count from response
            } else {
                console.error('Failed to like testimony');
            }
        } catch (error) {
            console.error('Error while liking testimony:', error);
        }
    };

    return (
        <div className="testimonies-container">
            <div className="testimonies">
                <div className="testimony-card">
                    <Link to={`/post/${_id}`}>
                        <img src={`http://localhost:4000/${files}`} alt={title} className="testimony-image" />
                    </Link>
                    <div className="profile-card">
                        <div className="profile-cardandlike">
                            <div className="profile-imgandname">
                                <img src="" alt="" className="profile-image" />
                                <p className="profile-name">{creator.username}</p>
                            </div>
                            <div className="profile-info">
                                <button className="like-button" onClick={handleLike}>
                                    <span role="img" aria-label="heart">
                                        {!liked ?  '🤍' :  '❤️' } 
                                    </span>
                                    <span className="like-count">{likeCountState} likes</span>
                                </button>
                            </div>
                        </div>
                        <p>{category}</p>
                        <p className="profile-description">{summary}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


fixed code

import React, { useState, useEffect } from 'react';
import './Testimonies.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Testimonies ({ _id, title, summary, files, category, description, creator, likeCount })  {
    const [liked, setLiked] = useState(false);
    const [cookies] = useCookies(['token']);
    const [likeCountState, setLikeCountState] = useState(likeCount);

    useEffect(() => {
        if (cookies.token) {
            fetchPostData();
        }
    }, [cookies]);

    const fetchPostData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/post/${_id}`);
            const postData = response.data;
            setLiked(postData.liked);
            setLikeCountState(postData.likeCount);
        } catch (error) {
            console.error('Error fetching post data:', error);
        }
    };

    const handleLike = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4000/post/${_id}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookies.token}`,
                    },
                }
            );

            if (response.status === 200) {
                setLiked(!liked); // Toggle liked state
                setLikeCountState(response.data.likeCount); // Update like count from response
            } else {
                console.error('Failed to like testimony');
            }
        } catch (error) {
            console.error('Error while liking testimony:', error);
        }
    };

    return (
        <div className="testimonies-container">
            <div className="testimonies">
                <div className="testimony-card">
                    <Link to={`/post/${_id}`}>
                        <img src={`http://localhost:4000/${files}`} alt={title} className="testimony-image" />
                    </Link>
                    <div className="profile-card">
                        <div className="profile-cardandlike">
                            <div className="profile-imgandname">
                                <img src="" alt="" className="profile-image" />
                                <p className="profile-name">{creator.username}</p>
                            </div>
                            <div className="profile-info">
                                <button className="like-button" onClick={handleLike}>
                                    <span role="img" aria-label="heart">
                                        {!liked ?  '🤍' :  '❤️' } 
                                    </span>
                                    <span className="like-count">{likeCountState} likes</span>
                                </button>
                            </div>
                        </div>
                        <p>{category}</p>
                        <p className="profile-description">{summary}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};



here is the latest fixed code
import React, { useState, useEffect } from 'react';
import './Testimonies.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Testimonies ({ _id, title, summary, files, category, description, creator, likeCount })  {
    const [liked, setLiked] = useState(false);
    const [cookies] = useCookies(['token']);
    const [likeCountState, setLikeCountState] = useState(likeCount);

    useEffect(() => {
        if (cookies.token) {
            fetchPostData();
        }
    }, [cookies]);

    const fetchPostData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/post/${_id}`);
            const postData = response.data;
            setLiked(postData.liked);
            setLikeCountState(postData.likeCount);
        } catch (error) {
            console.error('Error fetching post data:', error);
        }
    };

    const handleLike = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4000/post/${_id}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookies.token}`,
                    },
                }
            );

            if (response.status === 200) {
                setLiked(!liked); // Toggle liked state
                setLikeCountState(response.data.likeCount); // Update like count from response
            } else {
                console.error('Failed to like testimony');
            }
        } catch (error) {
            console.error('Error while liking testimony:', error);
        }
    };

    return (
        <div className="testimonies-container">
            <div className="testimonies">
                <div className="testimony-card">
                    <Link to={`/post/${_id}`}>
                        <img src={`http://localhost:4000/${files}`} alt={title} className="testimony-image" />
                    </Link>
                    <div className="profile-card">
                        <div className="profile-cardandlike">
                            <div className="profile-imgandname">
                                <img src="" alt="" className="profile-image" />
                                <p className="profile-name">{creator.username}</p>
                            </div>
                            <div className="profile-info">
                                <button
                                    className={`like-button ${liked ? 'liked' : ''}`}
                                    onClick={handleLike}
                                >
                                    <span role="img" aria-label="heart">
                                        {!liked ?  '🤍' :  '❤️' } 
                                    </span>
                                    <span className="like-count">{likeCountState} likes</span>
                                </button>
                            </div>
                        </div>
                        <p>{category}</p>
                        <p className="profile-description">{summary}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};



singlepost page



import React from "react"
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Comments from "../../components/comments/comments";

export default function SingleBlog(){
    const [singleBlogInfo, setSingleBlogInfo] = React.useState(null)
    const {id} = useParams()
    React.useEffect(() => {
        
        async function fetchSingleBlog() {
            try {
                const response = await axios.get(`http://localhost:4000/post/${id}`, { withCredentials: true });
                setSingleBlogInfo(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchSingleBlog();
    }, [])

   

    /* if (!singleBlogInfo) return '' */
    if (!singleBlogInfo ) return null;


    return(
        <div>
            <img src={`http://localhost:4000/${singleBlogInfo.image}`}/>
            <div>{singleBlogInfo.creator.username}</div>
            {singleBlogInfo.creator._id === singleBlogInfo.creator._id && (
                <div>
                    <Link to={`/edit/${singleBlogInfo._id}`}><button>Edit</button></Link>
                </div>
            )}
            <h1>{singleBlogInfo.title}</h1>
            <p>{singleBlogInfo.description}</p>

            <Comments/>
        </div>
    )
}

postmodel

const mongoose = require('mongoose')
const {Schema} = mongoose

const PostSchema = new Schema({
    title: String,
    summary: String,
    image: String,
    category: String,
    description: String,
    creator: {type: Schema.Types.ObjectId, ref:'User'},
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    }],
    likeCount: { type: Number, default: 0 }, // Add this field
}, {
    timestamps: true,
})

const PostModel = mongoose.model('Post', PostSchema)

module.exports = PostModel



comments
import React from "react"
import './comments.css'
export default function Comments (){
    return(
        <div className="container-div">
                <form className="container-comment">
                    <div className="container-inputs">
                        <div className="input">
                            <label htmlFor="username">Username:</label>
                            <input type="text" placeholder="Username"  required />
                        </div>
                    
                        <div className="input">
                            <label htmlFor="">Comment:</label>
                            <textarea type="textarea" placeholder="..." required/>
                        </div>
                    </div>
                    <div className="container-buttons">
                        <button id="authentication" type="submit" className="switch-btn">Add Your Comment</button>
                    </div>
                </form>
        </div>
    )
}