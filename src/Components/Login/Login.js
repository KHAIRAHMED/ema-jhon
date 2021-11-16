import React, { useContext, useState } from 'react';
import "./Login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import img from "./../../images/login.PNG"
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserEmailAndPassword, handleGithubSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInEmailandPassword } from './LoginManager';

const Login = () => {
  initializeLoginFramework()
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "",
    email: "",
    password: '',
    error : "",
    success : false,
    photo : ''
  })


  const [newUser, setNewUser] = useState(false)
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [loggedInUser , setLoggedInUser] = useContext(userContext)
  const handleResponse = (res , redirect)=>{
    setUser(res)
    setLoggedInUser(res)
    if(redirect){
      history.replace(from)
    }
  }
 
  // google sign in start 
  const googleSignIn = ()=>{
    handleGoogleSignIn()
    .then(res =>{
      handleResponse(res , true)
    })
  }
  // google sign in start 

// google sign out 

const googleSignOut = ()=>{
  handleSignOut()
  .then(res => {
    handleResponse(res , false)
  })
}
// google sign out 

// githubSignIn start 
const gitHubSignIn = ()=>{
  handleGithubSignIn()
  .then(res =>{
    handleResponse(res , true)
  })
}
// githubSignIn start 

  // email sign up start 
  const handleBlur = (e) => {
    let isFieldVaid = true;
    if (e.target.name === 'email') {
      isFieldVaid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value)
    }
    else if (e.target.name === "password") {
      isFieldVaid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/.test(e.target.value)
    }
    if (isFieldVaid) {
      const newUser = { ...user }
      newUser[e.target.name] = e.target.value
      setUser(newUser)
    }
  }

  const handleSubmit = (e) => {
    // sign up 
    const {name ,email , password} = user
    if(newUser && email && password){
      createUserEmailAndPassword(name , email, password)
      .then(res=>{
        handleResponse(res , true)
      })
    }
// sign in 
else if (!newUser && email && password){
  signInEmailandPassword(email , password)
  .then(res =>{
    handleResponse(res , true)
  })
}
    e.preventDefault()

  }
  // email sign up end 

  return (
    <section className="loginOuter">
      <div className="imgBox">
        <img src={img} alt="" />
      </div>
      <div className="contentBox">
        <div className="formBox">
          <h2>Sign Up</h2>
          <div className="checkBox">
            <input type="checkBox" name="newUser" onChange={() => setNewUser(!newUser)} />
            <label htmlFor="newUser" >New User Sign Up</label>
          </div>
          <form onSubmit={handleSubmit}>
            {
              newUser && <div className="inputBox">
                <span>User Name</span>
                <input type="text" name="name" id="" onBlur={handleBlur} required placeholder="Enter Your Name" />
              </div>
            }
            <div className="inputBox">
              <span>Email </span>
              <input type="email" name="email" id="" onBlur={handleBlur} required placeholder="Enter Your Email" />
            </div>
            <div className="inputBox">
              <span>Password</span>
              <input type="password" name="password" id="" onBlur={handleBlur} required placeholder="Enter Your Password" />
            </div>
            <div className="checkbox">
              <label htmlFor="remember"><input type="checkbox" name="" id="remember" />Remember</label>
            </div>
            <div className="inputBox">
              <input type="submit" value="Submit" />
            </div>
          </form>
          {
                user.success?<p  style={{color:"green"}}>User Account SuccessFully {newUser?"Created":"Logged in"}</p>:<p style={{color:"red"}}>{user.error}</p>
            }
          <h3>Login with social media</h3>
          <ul className="sci">
            <li ><FontAwesomeIcon onClick={googleSignIn} icon={faGoogle} /></li>
            <li><FontAwesomeIcon onClick={gitHubSignIn} icon={faGithub} /></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Login;