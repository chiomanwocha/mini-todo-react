import { Link, Redirect } from 'react-router-dom'
import { useState } from 'react'
import '../css/signup.css'
import axios from 'axios'
import Loader from './Loader'

const SignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [userExist, setUserExist] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [loader, setLoader] = useState(false)

    const createAccount = (e) => {
        setLoader(true)
        e.preventDefault()
        setUserExist(true)
        axios
        .get('https://6391a596b750c8d178c8e2e7.mockapi.io/users')
        .then((response) => {
            ((response.data).find((user) => user.email === email) === undefined) ?
            axios
            .post('https://6391a596b750c8d178c8e2e7.mockapi.io/users', {
                firstName: firstName,
                lastName: lastName,
                email: email
            })
            .then(() =>{
                alert('Registered successfully')
                setRedirect(true)
            }
            )
            .catch((error) => {
                alert(error);
            })
            : setLoader(false) && setUserExist(true)  
        })
        .catch((error) => {
            alert(error)
        })

        setFirstName('')
        setLastName('')
        setEmail('')
    }
    if(redirect){
        return <Redirect to='/' />
    }
    return (
        <div className="container">
            <form className="signup-page"  onSubmit={(e) => createAccount(e)}>
                <div className="welcome-hero">
                    <p>Create Account</p>
                    <p>to get started now !</p>
                </div>
                {loader ? 
                <div className='signup-loader'>
                    <Loader></Loader> 
                </div>
                :
                <div>
                    {userExist && <p className='error'>Please register with another email, email already exist !</p>}
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