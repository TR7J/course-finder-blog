import React from "react"
import './authentication.css'
import { Link } from "react-router-dom"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom"


export default function Login(){
    const navigate = useNavigate()

    const [inputs, setInputs] = React.useState({
        username: '',
        password: '',
    })

    const loginUser = async (e) => {
        e.preventDefault()
        const {username, password} = inputs
        try {
            const response = await axios.post('/LogIn', {
                 //payload - information sent to the backend
                username, password
            })
            if(response.data.error){
                toast.error(response.data.error)
            } else {
                setInputs({username: '', password: ''})
                toast.success("Welcome! You're officially logged on. ")
                navigate('/')
            }
        } catch (error) {
            
        }
    }

    return(
        <div className="main-sign">
                <div className="info-box">
                    <h2 className="course-finder">Course Finder</h2>
                    <p className="create-login2">
                        Sign in to your account
                    </p>
                </div>
                <form className="container" onSubmit={loginUser}>
                    <h2 className="container-header">Log In</h2>
                    <div className="container-inputs">
                        <div className="input">
                            <label htmlFor="username">Username:</label>
                            <input type="text" placeholder="Username" value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} required />
                        </div>
                    
                        <div className="input">
                            <label htmlFor="">Password:</label>
                            <input type="password" placeholder="Password" value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} required/>
                        </div>
                    </div>
                    <div className="container-forgotpass">Forgot Password? <span className="container-forgotpass span">Click here</span></div>
                    <div className="container-buttons">
                        <button id="authentication" type="submit" className="switch-btn">Log In</button>
                    </div>
                    <div className="container-noaccount">Don't have an account? <span><Link to="/Signup" className="span-signup">Sign up</Link></span></div>
                </form>
        </div>
    )
}