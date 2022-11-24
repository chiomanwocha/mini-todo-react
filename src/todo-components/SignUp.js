import { Link } from 'react-router-dom'
import '../css/signup.css'

const SignUp = () => {
    return (
        <div className="container">
            <form className="signup-page">
            <div className="welcome-hero">
                <p>Create Account</p>
                <p>to get started now !</p>
            </div>
            <div className="firstname">
                <input type="text" id="firstname" name="firstname" placeholder="First Name" required className="signup-details"/>
            </div>
            <div className="lastname">
                <input type="text" id="lastname" name="lastname" placeholder="Last Name" required className="signup-details"/>
            </div>
            <div>
                <input type="email" id="email" name="email" placeholder="Email Address" required className="signup-details"/>
            </div>
            <button className="signup-button">Submit</button>
            <p>Already have an account ? <Link to="/">login</Link></p>
            </form>
      </div>
    );
}
 
export default SignUp;