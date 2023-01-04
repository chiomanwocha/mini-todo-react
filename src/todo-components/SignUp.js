import { Link, Redirect } from 'react-router-dom'
import { useState } from 'react'
import '../css/signup.css'
import axios from 'axios'
import Loader from './Loader'
import { useMutation } from 'react-query'

const SignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [redirect, setRedirect] = useState(false)
    
    const registerUser = (details) => {
        return axios.post('https://todo-api-12iv.onrender.com/users', details)
    }

    const { mutate: register, status, error} = useMutation(registerUser,
    {
        onSuccess: (data) => {
            var date = new Date();
            date.setTime(date.getTime()+(30*1000));
            var expiry = '; expires=' + date.toUTCString();
            document.cookie = `"email=${data.data.data[0].email}"`+expiry+'; path=/';
            alert(data.data.message)
            setRedirect(true)
        }
    }
    )

    const createAccount = (e) =>{
        e.preventDefault();
        const details = {
            firstname: firstName,
            lastname: lastName,
            email: email
        }
        register(details)
    }

    if(redirect){
        return <Redirect to={`/`} />
    }

    return (
        <div className="container">
            <form className="signup-page" onSubmit={(e) => createAccount(e)}>
                <div className="welcome-hero">
                    <p>Create Account</p>
                    <p>to get started now !</p>
                </div>
                {status === 'loading' &&
                    <div className='signup-loader'>
                        <Loader></Loader> 
                    </div>
                }
                {status !== 'loading' &&
                    <div>
                        {status === 'error' && <p className='error'>{error.response.data.message}</p>}
                        <div className="firstname">
                            <input type="text" id="firstname" name="firstname" placeholder="First Name" required className="signup-details" value={firstName} onChange={(e) => setFirstName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} autoFocus/>
                        </div>
                        <div className="lastname">
                            <input type="text" id="lastname" name="lastname" placeholder="Last Name" required className="signup-details" value={lastName} onChange={(e) => setLastName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}/>
                        </div>
                        <div>
                            <input type="email" id="email" name="email" placeholder="Email Address" required className="signup-details" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <button className="signup-button">Submit</button>
                    </div>
                }
                <p>Already have an account ? <Link to="/">login</Link></p>
            </form>
      </div>
    );
}
 
export default SignUp;