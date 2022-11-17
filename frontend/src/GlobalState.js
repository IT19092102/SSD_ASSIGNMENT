import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import UserAPI from './api/UserAPI'


import axios from 'axios';

export const GlobalState = createContext()


export const DataProvider = ({ children }) => {
    const [token, setToken] = useState("false")


    useEffect(() => {

        let refreshToken = Cookies.get('refreshToken')

        console.log("accessToken :" + refreshToken)

        const firstLogin = localStorage.getItem('firstLogin')

        if (firstLogin) {
            const refreshToken = async () => {


                const res = await axios.get('http://localhost:5000/user/refresh_token', {
                    headers: { Authorization: refreshToken }
                })

                Cookies.set('accessToken', res.data.accesstoken)

            }
            refreshToken()
        }
    }, [])




    return (
        <GlobalState.Provider >
            {children}
        </GlobalState.Provider>
    )
}  