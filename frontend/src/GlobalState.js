import React, {createContext, useState, useEffect} from 'react'

import UserAPI from './api/UserAPI'


import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)


    useEffect(() =>{

        console.log("firstLogin ......................... in global state")
        const firstLogin = localStorage.getItem('firstLogin')
        console.log("firstLogin "+firstLogin)
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('http://localhost:5000/user/refresh_token')
                console.log("inside refresh token api ")
                console.log(res.data.accesstoken)
                setToken(res.data.accesstoken)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])
    console.log("firstLogin ......................... in global state")

    
    const state = {
        token: [token, setToken],
    
        userAPI: UserAPI(token),
     
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}  