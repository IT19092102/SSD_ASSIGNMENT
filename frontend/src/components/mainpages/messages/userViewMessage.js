
import React, { createContext, useState, useEffect } from 'react'

import axios from 'axios'
const firstLogin = localStorage.getItem('firstLogin')




function UserViewMessage() {


  const [messageData, setMessageData] = useState([])

  useEffect(() => {

    const getMessageData = async () => {
      const res = await axios.get('http://localhost:5000/message/allMessage')
      setMessageData(res.data)
    }

    getMessageData()

  }, [])



  const [user, setUser] = useState({
    message:'', email:''
})

  const onChangeInput = e =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value})
}

const messageSubmit = async e =>{
    e.preventDefault()
    try {
        await axios.post('http://localhost:5000/message/createMessage', {...user})    
        window.location.href = "/userMessage";
    } catch (err) {
        alert(err.response.data.msg)
    }
}

  return (
    <>
       <div className="login-page"  style={{  height: 400}} >
            <form onSubmit={messageSubmit}>
                <h2 className='form-heading'>Add Message</h2>
                <input type="text" name="message" required
                placeholder="message" value={user.message} onChange={onChangeInput} />

                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />
             

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