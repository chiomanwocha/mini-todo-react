import '../css/login-todo.css'
import { Link,  Redirect} from 'react-router-dom'
import { useState } from 'react'

const LoginTodo = () => {
    const [userEmail, setUserEmail] = useState('')
    const [exist, setExist] = useState(true)
    const [redirect, setRedirect] = useState(false)

    const checkUser = (e) => { 
        e.preventDefault();
        const userDetails = JSON.parse(localStorage.getItem('userDetails'))
        if(userEmail.length === 0 || userDetails === null || userDetails.email !== userEmail){
            setExist(false)
            setUserEmail('')
        }
        if(userDetails.email === userEmail){
            setExist(true)
            setRedirect(true)
        }
    }

    if(redirect){
        return <Redirect to='/todo' />
    }

    return ( 
        <div className="container">
            {!exist?
                <p>email doesn't exist, please register</p>
                : 
                null
            }
            <div className="welcome-hero">
                <p>Welcome,</p>
                <p>Glad to see you !</p>
            </div>
            <form >
                <input type="email" name="email" id="email" required placeholder="Email Address" className="details" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                <button className='login-button' onClick={(e) => checkUser(e)}>Login</button>
                <p>Don't have an account yet? <Link to="/signup">Sign up here</Link></p>
            </form>
        </div>
     );
}
 
export default LoginTodo;