import React, {useState} from 'react'

import axios from 'axios'
const firstLogin = localStorage.getItem('firstLogin')
function WorkerProfile() {
    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })

   
    const [name, setName] = useState(localStorage.getItem('name'))

   
    // setName(firstLogin);

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page"  style={{  height: 500}} >
            <form onSubmit={registerSubmit}>
                <h2> WORKER  Profile.........</h2>
                  
        <p>name....{name}</p>
             
            </form>
        </div>
    )
}

export default WorkerProfile