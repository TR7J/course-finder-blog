import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Comments from '../../components/comments/comments';
/* import Cookies from 'js-cookie'; */
import { useCookies } from 'react-cookie';
import './singleBlog.css';
import profile from '../../images/profile.png'

export default function SingleBlog({followCount}) {
    const [singleBlogInfo, setSingleBlogInfo] = React.useState(null);
    const [comments, setComments] = React.useState([]);
    const { id } = useParams();

    /* const token = Cookies.get('token') || null */; 

    const [followed, setFollowed] = React.useState(false);
    const [cookies] = useCookies(['token']);
    const [followCountState, setFollowCountState] = React.useState(0);

  React.useEffect(() => {
    async function fetchSingleBlog() {
      try {
        const response = await axios.get(`http://localhost:4000/post/${id}`, { withCredentials: true });
        setSingleBlogInfo(response.data);
        setFollowed(response.data.creator.follows.includes(cookies.token));
        setFollowCountState(response.data.creator.followCount);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchSingleBlog();
  }, [id, cookies.token]);

  React.useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(`http://localhost:4000/post/${id}/comments`, { withCredentials: true });
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }

    fetchComments();
  }, [id]);

  
  const handleFollow = async () => {
    try {
        const response = await axios.post(
            `http://localhost:4000/post/${singleBlogInfo.creator._id}/follows`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.token}`,
                },
            }
        );
        if (response.status === 200) {
            setFollowed(!followed); // Toggle follow state
            setFollowCountState(response.data.followCount); // Update like count from response
        } else {
            console.error('Failed to follow author');
        }
    } catch (error) {
        console.error('Error while following author:', error);
    }
};

  if (!singleBlogInfo) return null;

  return (
    <div>
      <img src={`http://localhost:4000/${singleBlogInfo.image}`} alt={"singleBlog"} className='course-image'/>
      <div className='image-name-edit-followers'>
        <div className='image-name'>
          <img src={profile} alt="" className="image-name-img" />
          <h2>{singleBlogInfo.creator.username}</h2>
        </div>

        <div className='edit-followers'>
          <span className="follow-count">{followCountState} followers</span>
          <button onClick={handleFollow} className='follow-button'><span className="follow-count">{followed ? 'Unfollow' : 'Follow'}</span></button>
          {singleBlogInfo.creator._id === singleBlogInfo.creator._id && (
            <div>
              <Link to={`/edit/${singleBlogInfo._id}`}><button className='edit-button'>Edit</button></Link>
            </div>
          )}
        </div>
      </div>
      
      <h1>{singleBlogInfo.title}</h1>
      
      <p className='single-blog-description'>{singleBlogInfo.description}</p>

      <Comments comments={comments} postId={id} setComments={setComments} token={cookies.token} />
    </div> 
  );
}

