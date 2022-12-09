import '../css/login-todo.css'
import { Link,  Redirect} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from './Loader'

const LoginTodo = () => {
    const [userEmail, setUserEmail] = useState('')
    const [exist, setExist] = useState(true)
    const [blank, setBlank] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [loader, setLoader] = useState(false)
    const [userId, setUserId] = useState('')

    const checkUser = (e) => { 
        e.preventDefault();
        setBlank(false)
        setExist(true)
        if(userEmail.length === 0){
            setBlank(true) 
        } else{
            setLoader(true)
            axios
            .get('https://6391a596b750c8d178c8e2e7.mockapi.io/users')
            .then((response) => {
                if((response.data).filter((user) => user.email === userEmail).length > 0){
                    setExist(true)
                    setRedirect(true)
                    const currentUser = ((response.data).filter((user) => user.email === userEmail))
                    setUserId(currentUser[0].id)
                } else {
                    setLoader(false)
                    setUserEmail('')
                    setExist(false)
                }
            })
            .catch((error) => {
                alert(error)
                setLoader(true)
            })
            // .finally(() =>{
            //     setLoader(false)
            // })
        }
    }

    useEffect(() => {
        setExist(true)
    }, [])

    if(redirect){
        return <Redirect to={`/${userId}`} />
    }

    return ( 
        <div className="container">
            <div className="welcome-hero">
                <p>Welcome,</p>
                <p>Glad to see you !</p>
            </div>
            {loader ?
                <div className='login-loader'>
                    <Loader />
                </div> 
                :
                <div>
                    {blank && <p className='error'>User email can not be blank !</p>}
                    {!exist && <p className='error'>email doesn't exist, please register</p>}
                    <form >
                        <input type="email" name="email" id="email" required placeholder="Email Address" className="details" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} autoFocus/>
                        <button className='login-button' onClick={(e) => checkUser(e)}>Login</button>
                    </form>
                </div>
            }
            <p>Don't have an account yet? <Link to="/signup">Sign up here</Link></p>
        </div>
     );
}
 
export default LoginTodo;