import React, {useContext} from 'react'
import {Routes , Route} from 'react-router-dom'

import Login from './auth/Login'
import Register from './auth/Register'
import ManagerProfile from './managerProfile'
import WorkerProfile from './workerProfile'
import UserViewMessage from './messages/userViewMessage'

import UserViewFiles from './files/userViewFiles'

import Users from './users/users'
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

            <Route path='/managerProfile' element={<ManagerProfile/>} />
            <Route path='/workerProfile' element={<WorkerProfile/>} />
            <Route path='/userMessage' element={<UserViewMessage/>} />
            <Route path='/userFiles' element={<UserViewFiles/>} />
            
            <Route path='/users' element={<Users/>} />
            
            <Route path='/*' element={<NotFound/>} />

        </Routes >
    )
}

export default Pages
