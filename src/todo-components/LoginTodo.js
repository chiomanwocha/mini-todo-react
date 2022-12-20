import '../css/login-todo.css'
import { Link, Redirect } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Loader from './Loader'
import { useMutation } from 'react-query'

const LoginTodo = () => {
    const [userEmail, setUserEmail] = useState('')
    const [id, setId] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const auth = (email) => {
        return axios.post('https://todo-api-12iv.onrender.com/users/login', email)
    }

    const {mutate, status, error} = useMutation(auth, {
        onSuccess: (data) => {
            setId(data.data.data.id)
            setRedirect(true)
        }
    })

    const login = (e) => {
        e.preventDefault();
        const email = {
            email: userEmail
        }
        mutate(email)
    }

    if(redirect){
        return <Redirect to={`/${id}`} />
    }

    return ( 
        <div className="container">
            <div className="welcome-hero">
                <p>Welcome,</p>
                <p>Glad to see you !</p>
            </div>
            {status === 'loading' &&
                <div className='login-loader'>
                    <Loader />
                </div>
            }
            {status === 'error' && <p className='error'>{error.message}</p>}
            {status !== 'loading' &&
                <div>
                    <form onSubmit={(e) => login(e)}>
                        <input type="email" name="email" id="email" required placeholder="Email Address" className="details" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} autoFocus/>
                        <button className='login-button'>Login</button>
                    </form>
                </div>
            }
            <p>Don't have an account yet? <Link to="/signup">Sign up here</Link></p>
        </div>
     );
}
 
export default LoginTodo;