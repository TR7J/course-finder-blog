import React, { useState, useEffect } from 'react';
import './Testimonies.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import '../../pages/home/home.css'
import profile from '../../images/profile.png'

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
                    <h2>{title}</h2>
                    <div className="profile-card">
                        <div className="profile-cardandlike">
                            <div className="profile-imgandname">
                                <img src={profile} alt="" className="profile-image" />
                                <p className="profile-name">{creator.username}</p>
                            </div>
                            <div className="profile-info">
                                <button
                                    
                                    onClick={handleLike}
                                >
                                    <span role="img" aria-label="heart">
                                        {/* {!liked ? '❤️'  : ''}  */}
                                        🤍
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