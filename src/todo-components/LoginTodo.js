import '../css/login-todo.css'
import { Link } from 'react-router-dom'

const LoginTodo = () => {
    return ( 
        <div className="container">
            {/* <p v-if="errorMessage">{{errorMessage}}</p> */}
            <div className="welcome-hero">
                <p>Welcome,</p>
                <p>Glad to see you !</p>
            </div>
            <form >
                <input type="email" name="email" id="email" required placeholder="Email Address" />
                <button className='login-button'>Login</button>
                <p>Don't have an account yet? <Link to="/todo">Sign up here</Link></p>
            </form>
        </div>
     );
}
 
export default LoginTodo;