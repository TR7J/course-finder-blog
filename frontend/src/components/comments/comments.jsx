import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './comments.css'

export default function Comments({ postId, token}) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(`http://localhost:4000/post/${postId}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },{ withCredentials: true });
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    fetchComments();
  }, [postId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/post/${postId}/comment`, {
        commentText,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },{ withCredentials: true });
      setCommentText('');
      setComments((prevComments) => [...prevComments, response.data]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='comment'>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
          className='comments-input'
        />
        <button type="submit" className='comments-send'>Submit</button>
      </form>
      {comments.map((comment) => (
        <div key={comment._id} className='comment-section'>
          <div className='comment-user'>@{comment.creator && comment.creator.username}</div>
          <div className='single-comment'>{comment.text}</div>
        </div>
      ))}
    </div>
  );
}