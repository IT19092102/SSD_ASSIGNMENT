import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">aaaaaaaaaa</Link></li>
                <li><Link to="/category">aaaaaaaa</Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/history">zzzzzzzzz</Link></li>
                <li><Link to="/" onClick={logoutUser}>z</Link></li>
            </>
        )
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
                    <Link to="/">{isAdmin ? 'Admin' : 'LOGO'}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>

           
                <li><b><Link to="/users">Users</Link></b></li>

                {isAdmin && adminRouter()}

             
                <li><Link to="/userMessage"><b>messages  </b></Link></li>
               

                  <li><Link to="/userFiles"> <b> files</b></Link></li>
                  <li><Link to="/login"><b>Login  </b></Link></li>
               

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

            </ul>

            {
                isAdmin ? '' 
                :
                !isLogged ? '':
                <div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }
            
        </header>
    )
}

export default Header
