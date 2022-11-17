import {useState, useEffect} from 'react'
import axios from 'axios'

import Cookies from  'js-cookie';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])


    useEffect(() =>{
 
        console.log(" token user api outside  --------------------------------"+token);
        if(token){

            let accessToken = Cookies.get('accessToken')
        // setAccessToken(Cookies.get('accessToken'))
        console.log("2222222  accessToken  22222222 :"+ accessToken)
            const getUser = async () =>{
                console.log(" token user api --------------------------------"+token);
                try {
                    const res = await axios.get('http://localhost:5000/user/infor', {
                        headers: {Authorization: accessToken}
                    })

                    console.log("user api --------------------------------");
                    console.log(res.data.role);



                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

            console.log("user ")

                     setCart(res.data.cart)

                } catch (err) {
                    alert("userAPI error")
                }
            }

            getUser()
            
        }
    },[token])



            
            
   





    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
       cart: [cart, setCart],
       
      

       
     
    }
}

export default UserAPI
 