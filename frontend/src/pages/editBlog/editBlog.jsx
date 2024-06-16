import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-hot-toast'
import './editBlog.css'

export default function EditBlog(){
    const {id} = useParams( )
    const [title, setTitle] = React.useState('');
    const [summary, setSummary] = React.useState('');
    const [files, setFiles] = React.useState(null);
    const [category, setCategory] = React.useState('');
    const [description, setDescription] = React.useState(''); 
    const navigate = useNavigate();

    React.useEffect(() => {
        axios.get(`http://localhost:4000/post/${id}`)
          .then(response => {
            const blogInfo = response.data;
            setTitle(blogInfo.title);
            setCategory(blogInfo.category);
            setDescription(blogInfo.content);
            setSummary(blogInfo.summary);
          })
          .catch(error => {
            console.error('Error fetching post:', error);
          });
    }, []);

    async function editBlog(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('title', title);
        data.append('summary', summary);
        data.append('id', id);
        data.append('description', description);
        data.append('category', category);

        if (files?.[0]) {
            data.append('file', files?.[0]);
        }

        try {
            const response = await axios.put('/post', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
            });

            if(response.data.error){
                toast.error(response.data.error);
            } else {
                toast.success("Blog Edited");
                navigate(`/post/${id}`); 
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while Editing the blog");
        }
    }

    async function deleteBlog() {
        try {
            const response = await axios.delete(`/post/${id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
            });

            if(response.data.error){
                toast.error(response.data.error);
            } else {
                toast.success("Blog Deleted");
                navigate('/'); 
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while Deleting the blog");
        }
    }


    return (
        <>
        <form onSubmit={editBlog} className="edit-blog-form">
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="full-width"/>
            <input type="text" placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)} required className="full-width"/>
            <input type="file" onChange={e => setFiles(e.target.files)} required className="full-width"/>
            <input type="text" placeholder="Category" onChange={e => setCategory(e.target.value)} required className="full-width"/>
            <textarea name="description" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="full-width"/>
            <button type="submit" className="full-width-btn">Edit Blog</button>
            <button type="button" className="full-width-btn" onClick={deleteBlog}>Delete Blog</button>
        </form>
        
        </>
    )
}