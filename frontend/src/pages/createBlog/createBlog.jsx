import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './createBlog.css'

export default function CreateBlog(){
    const [title, setTitle] = React.useState('');
    const [summary, setSummary] = React.useState('');
    const [files, setFiles] = React.useState(null);
    const [category, setCategory] = React.useState('');
    const [description, setDescription] = React.useState(''); 
    const navigate = useNavigate();

    async function submitBlog(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('title', title);
        data.append('summary', summary);
        data.append('description', description);
        data.append('category', category);
        if (files) {
            data.append('file', files[0]);
        }

        try {
            const response = await axios.post('/post', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
            });

            if(response.data.error){
                toast.error(response.data.error);
            } else {
                toast.success("Blog Uploaded");
                navigate('/'); 
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while uploading the blog");
        }
    }

    return (
        <form onSubmit={submitBlog} className="create-blog-form">
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="full-width"/>
            <input type="text" placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)} required className="full-width"/>
            <input type="file" onChange={e => setFiles(e.target.files)} required className="full-width"/>
            <input type="text" placeholder="Category" onChange={e => setCategory(e.target.value)} required className="full-width"/>
            <textarea name="description" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="full-width"/>
            <button type="submit" className="full-width-btn">Create Blog</button>
        </form>
    );
}
