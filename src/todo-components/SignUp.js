import { Link, Redirect } from 'react-router-dom'
import { useState } from 'react'
import '../css/signup.css'

const SignUp = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [userDetails, setUserDetails] = useState([])
    const [redirect, setRedirect] = useState(false)

    const createAccount = (e) => {
        e.preventDefault()
        setUserDetails(...userDetails, {
            id: Math.floor(Math.random() * 10000),
            firstName: firstName,
            lastName: lastName,
            email: email
        })
        setFirstName('')
        setLastName('')
        setEmail('')
        alert('registration successful !')
        setRedirect(true)
    }
    localStorage.setItem('userDetails', JSON.stringify(userDetails))
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