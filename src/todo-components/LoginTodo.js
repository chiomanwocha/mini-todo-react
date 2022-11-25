import '../css/login-todo.css'
import { Link,  Redirect} from 'react-router-dom'
import { useState} from 'react'

const LoginTodo = () => {
    let userDetails = localStorage.getItem('userDetails')
    let parsedDetails = JSON.parse(userDetails)
    const [userEmail, setUserEmail] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [showNotExist, setShowNotExist] = useState(false)
    // const [showEmpty, setShowEmpty] = useState(false)

    const checkUser = (e) => { 
        e.preventDefault();
        if(userEmail === parsedDetails.email){
            return setRedirect(true)
        } 
        // if(userEmail.length === 0){
        //     return setShowEmpty(true) && showNotExist(false)
        //     // && setShowNotExist(showNotExist)
        // } 
        if (userEmail !== parsedDetails.email){
            return setShowNotExist(true)
        }
        return userEmail
        // setShowEmpty(showEmpty) &&
    }

    if(redirect){
        return <Redirect to='/todo' />
    }
    // console.log(`showNotExist, ${showNotExist} && showEmpty, ${showEmpty}`)
    return ( 
        <div className="container">
            {showNotExist ? 
                <p>this email does not exist !</p>
            : null}
            {/* {showEmpty ? 
                <p>email can not be empty</p>
            : null} */}
            <div className="welcome-hero">
                <p>Welcome,</p>
                <p>Glad to see you !</p>
            </div>
            <form >
                <input type="email" name="email" id="email" required placeholder="Email Address" className="details" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                {/* <Link to="/" onClick={checkUser}><button className='login-button'>Login</button></Link> */}
                <button className='login-button' onClick={(e) => checkUser(e)}>Login</button>
                <p>Don't have an account yet? <Link to="/signup">Sign up here</Link></p>
            </form>
        </div>
     );
}
 
export default LoginTodo;