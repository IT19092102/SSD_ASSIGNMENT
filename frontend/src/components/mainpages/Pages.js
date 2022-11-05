import React, {useContext} from 'react'
import {Routes , Route} from 'react-router-dom'

import Login from './auth/Login'
import Register from './auth/Register'

import NotFound from './utils/not_found/NotFound'


import {GlobalState} from '../../GlobalState'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Routes >
           {/* <Route  exact path="/"  component={Login} />
           <Route exact path="/login"  component={isLogged ? NotFound : Login} />
           <Route exact path="/register"  component={isLogged ? NotFound : Register} />
           <Route  exact path="*"  component={NotFound} /> */}



            <Route path='/' element={<Login/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/*' element={<NotFound/>} />

        </Routes >
    )
}

export default Pages
