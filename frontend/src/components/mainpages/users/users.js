
import React, { createContext, useState, useEffect } from 'react'
import Header from '../../header/Header'
import axios from 'axios'
import GlobalUrl from '../../../config'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';



function Users() {


  const [userData, setUserData] = useState([])

  useEffect(() => {

    const getMessageData = async () => {
      let accessToken = Cookies.get('accessToken')
      const res = await axios.get(`${GlobalUrl}user/allUsers`, {
        headers: { Authorization: accessToken }
      })

      // const res = await axios.get(`${GlobalUrl}user/allUsers`)
      setUserData(res.data)
    }

    getMessageData()

  }, [])



  const [user, setUser] = useState({
    name: '', email: '', userRole: '', password: ''
  })

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const registerSubmit = async e => {
    e.preventDefault()
    try {

      let accessToken = Cookies.get('accessToken')
      await axios.post(`${GlobalUrl}user/register`, { ...user }, {
        headers: { Authorization: accessToken }
      })

      localStorage.setItem('firstLogin', true)

      window.location.href = "/users";
    } catch (err) {
      alert(err.response.data.msg)
    }
  }




  // setName(firstLogin);




  return (
    <>
      <Header />
      <div className="login-page margin-top-form" style={{ height: 600 }} >
        <form onSubmit={registerSubmit}>
          <h2 className='form-heading'>Add Users</h2>
          <input type="text" name="name" required
            placeholder="Name" value={user.name} onChange={onChangeInput} />

          <input type="text" name="userRole" required
            placeholder="User Rle" value={user.userRole} onChange={onChangeInput} />

          <input type="email" name="email" required
            placeholder="Email" value={user.email} onChange={onChangeInput} />

          <input type="password" name="password" required autoComplete="on"
            placeholder="Password" value={user.password} onChange={onChangeInput} />

          <div className="row">
            <button type="submit">Add Users</button>

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