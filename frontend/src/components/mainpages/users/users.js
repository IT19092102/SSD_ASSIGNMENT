
import React, { createContext, useState, useEffect } from 'react'

import axios from 'axios'

import {Link} from 'react-router-dom'



function Users() {


  const [userData, setUserData] = useState([])

  useEffect(() => {

    const getMessageData = async () => {
      const res = await axios.get('http://localhost:5000/user/allUsers')
      setUserData(res.data)
    }

    getMessageData()

  }, [])



  const [user, setUser] = useState({
    name:'', email:'', userRole:'',password: ''
})

const onChangeInput = e =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value})
}

const registerSubmit = async e =>{
    e.preventDefault()
    try {
        await axios.post('http://localhost:5000/user/register', {...user})

        localStorage.setItem('firstLogin', true)

        
        window.location.href = "/users";
    } catch (err) {
        alert(err.response.data.msg)
    }
}


  // setName(firstLogin);




  return (
    <>
        <div className="login-page"  style={{  height: 600}} >
            <form onSubmit={registerSubmit}>
                <h2 className='form-heading'>Register</h2>
                <input type="text" name="name" required
                placeholder="Name" value={user.name} onChange={onChangeInput} />

                <input type="text" name="userRole" required
                placeholder="User Rle" value={user.userRole} onChange={onChangeInput} />

                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>



      <div className='container mx-auto grid grid-cols-3 '>
        <div className='bg-slate-100 message-headding'>Name</div>
        <div className='bg-slate-100 message-headding '>Email</div>

      
        <div className='bg-slate-100 message-headding '>Role</div>

      </div>
      {userData.map((data, index) => {
        return (

          <div className='container mx-auto grid grid-cols-3 border-bottom '>
            <div className='message-data '>
              <span className='data-p'>
                {data.name}
              </span>
            </div>

            <div className='message-data '>
              <span className='data-p'>
                {data.email}
              </span>
            </div>

           

            <div className='message-data '>
              <span className='data-p'>
                {data.userRole}
              </span>
            </div>

          </div>



        );
      })}







    </>

  )
}

export default Users