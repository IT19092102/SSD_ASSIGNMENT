
import React, { createContext, useState, useEffect } from 'react'
import Header from '../../header/Header'
import axios from 'axios'
import GlobalUrl from '../../../config'

import Cookies from 'js-cookie';



function UserViewMessage() {


  const [messageData, setMessageData] = useState([])

  useEffect(() => {

    const getMessageData = async () => {

      let accessToken = Cookies.get('accessToken')
      const res = await axios.get(`${GlobalUrl}message/allMessage`, {
        headers: { Authorization: accessToken }
      })


      setMessageData(res.data)
    }

    getMessageData()

  }, [])



  const [user, setUser] = useState({
    message: '', email: ''
  })

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const messageSubmit = async e => {
    e.preventDefault()
    try {

      let accessToken = Cookies.get('accessToken')
      let email = Cookies.get('email')
      user.email = email
      await axios.post(`${GlobalUrl}message/createMessage`, { ...user }, {
        headers: { Authorization: accessToken }
      })


      window.location.href = "/userMessage";
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <>
      <Header />
      <div className="login-page margin-top-form" style={{ height: 300 }} >
        <form onSubmit={messageSubmit}>
          <h2 className='form-heading'>Add Message</h2>
          <input type="text" name="message" required
            placeholder="message" value={user.message} onChange={onChangeInput} />
          <div className="row">
            <button type="submit">Add Message</button>
          </div>
        </form>
      </div>
      <div className='container mx-auto grid grid-cols-2 '>
        <div className='bg-slate-100 message-headding'>Email</div>
        <div className='bg-slate-100 message-headding '>Message</div>
      </div>
      {messageData.map((data, index) => {
        return (
          <div className='container mx-auto grid grid-cols-2 border-bottom '>
            <div className='message-data '>
              <span className='data-p'>
                {data.email}
              </span>
            </div>
            <div className='message-data '>
              <span className='data-p'>
                {data.message}
              </span>
            </div>

          </div>
        );
      })}

    </>

  )
}

export default UserViewMessage