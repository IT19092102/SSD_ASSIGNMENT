import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])


    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                
                try {
                    const res = await axios.get('http://localhost:5000/user/infor', {
                        headers: {Authorization: token}
                    })

                    console.log("user api --------------------------------");
                    console.log(res.data.role);



                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

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
 