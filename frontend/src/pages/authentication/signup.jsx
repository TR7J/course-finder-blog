/* IMPORTS */
import React from "react";
import './authentication.css'
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast';


export default function SignUp(){
    const navigate = useNavigate()

    const [inputs, setInputs] = React.useState({
        username: '',
        email: '',
        password: '',
    })

    const signUpUser = async (e) => {
        e.preventDefault()
        const {username, email, password } = inputs
        try {
            const response = await axios.post('/Signup', {
                //payload - information sent to the backend
                username, email, password
            })
            if(response.data.error){
                toast.error(response.data.error)
            } else {
                setInputs({ username: '', email: '', password: '' })
                toast.success("You're all set! Welcome")
                navigate('/LogIn')
            }
        } catch (error) {
            console.error("Error signing up:", error);
            toast.error("An error occurred while signing up. Please try again.");
        }
    }

 
    return(
    
    <div className="main-sign">
            <div className="info-box">
                <h2 className="course-finder">Course Finder</h2>
                <p className="create-login">
                    Create an account
                </p>
            </div>
            <form className="container" onSubmit={signUpUser}>
                    <h2 className="container-header">Sign Up</h2>
                    <div className="container-inputs">
                        <div className="input">
                            <label>Username:</label>
                            <input type="text" placeholder="Username" value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})}  />
                       </div>

                        <div className="input">
                            <label>Email:</label>
                            <input type="email" placeholder="Email" value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})}  />
                        </div>
                    
                        <div className="input">
                            <label>Password:</label>
                            <input type="password" placeholder="Password" value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} />
                        </div>

                    </div>
                    <div className="container-buttons">
                        <button id="authentication" type="submit" className="switch-btn">Sign Up</button>
                    </div>
                    <div className="container-noaccount">Already have an account? <span><Link to="/LogIn" className="span-signup">Log In</Link></span></div>
            </form>
    </div>
    )
}
