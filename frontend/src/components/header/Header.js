import React, { useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Header() {
 
  
    const [menu, setMenu] = useState(false)
    const [role, setRole] = useState("")

    useEffect(() => {

        const getMessageData = async () => {
            setRole(localStorage.getItem("userRole"));
        }

        getMessageData()

    }, [])



    const logoutUser = async () => {
        await axios.get('http://localhost:5000/user/logout')

      
        localStorage.removeItem('firstLogin')
        localStorage.removeItem('refreshtokentest')
        localStorage.removeItem('userRole')
     
        Cookies.remove('refreshToken')
        Cookies.remove('accessToken')

        window.location.href = "/login";
    }

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1 >
                    {role}
                    {/* <Link to="/">{isAdmin ? 'Admin' : 'LOGO'}</Link> */}
                </h1>
            </div>

            <ul style={styleMenu}>

                {
                    role == "admin" ?
                        <>
                            <li><Link to="/users">Users</Link></li>
                            <li><Link to="/userMessage">messages  </Link></li>
                            <li><Link to="/userFiles">  files</Link></li>
                           
                            <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
                        </>
                        : role == "worker" ?
                            <>
                                <li><Link to="/userMessage">messages  </Link></li>
                                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
                            </>
                            : role == "manager" ?

                                <>
                                    

                                    <li><Link to="/userFiles">  files</Link></li>
                                    <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
                                </>


                                : <></>
                }


          



            </ul>

         
        </header>
    )
}

export default Header
