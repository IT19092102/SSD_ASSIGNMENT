import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';

function Login() {
    const [user, setUser] = useState({
        email: '', password: ''
    })

    const [name, setName] = useState("")

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/user/login', { ...user })
            Cookies.set('refreshToken', res.data.refreshtoken)
            Cookies.set('accessToken', res.data.accesstoken)
            Cookies.set('email', res.data.email)

            localStorage.setItem('firstLogin', true)
            localStorage.setItem('refreshtoken', res.data.refreshtoken)
            localStorage.setItem('userRole', res.data.userRole)

            // alert(res.data.msg)

            window.location.href = "/userMessage";

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">



            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" required
                    placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                    placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Login</button>

                </div>
            </form>
        </div>
    )
}

export default Login
