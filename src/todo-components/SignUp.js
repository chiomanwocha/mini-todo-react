import { Link, Redirect } from 'react-router-dom'
import { useState } from 'react'
import '../css/signup.css'
import axios from 'axios'

const SignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [userExist, setUserExist] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const createAccount = (e) => {
        e.preventDefault()
        setUserExist(false)
        axios
        .get('https://6391a596b750c8d178c8e2e7.mockapi.io/users')
        .then((response) => {
            ((response.data).filter((user) => (user.email === email))).length === 0 ?
            axios
            .post('https://6391a596b750c8d178c8e2e7.mockapi.io/users', {
                    firstName: firstName,
                    lastName: lastName,
                    email: email
            })
            .then((response) => {
                    console.log(response);
            })
            .catch((error) => {
                    alert(error);
            })
            : setUserExist(true)
        })
        setFirstName('')
        setLastName('')
        setEmail('')
        alert('Registration successful !')
        setRedirect(true)
    }
    if(redirect){
        return <Redirect to='/todo' />
    }
    return (
        <div className="container">
            <form className="signup-page"  onSubmit={(e) => createAccount(e)}>
                <div className="welcome-hero">
                    <p>Create Account</p>
                    <p>to get started now !</p>
                </div>
                {userExist && <p>Please register with another email, email already exist !</p>}
                <div className="firstname">
                    <input type="text" id="firstname" name="firstname" placeholder="First Name" required className="signup-details" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="lastname">
                    <input type="text" id="lastname" name="lastname" placeholder="Last Name" required className="signup-details" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div>
                    <input type="email" id="email" name="email" placeholder="Email Address" required className="signup-details" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <button className="signup-button">Submit</button>
                <p>Already have an account ? <Link to="/">login</Link></p>
            </form>
      </div>
    );
}
 
export default SignUp;