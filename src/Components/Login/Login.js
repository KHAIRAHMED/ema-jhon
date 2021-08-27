import React, { isValidElement, useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "./Login.css";
import firebaseConfig from './firebase.confing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import img from "./../../images/login.PNG"
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const Login = () => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "",
    email: "",
    password: '',
    error : "",
    success : false,
    photo : ''
  })

  console.log(user.email);
  const [newUser, setNewUser] = useState(false)
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [loggedInUser , setLoggedInUser] = useContext(userContext)
  const googleProvider = new firebase.auth.GoogleAuthProvider(); //google provider
  const githubProvider = new firebase.auth.GithubAuthProvider(); //github sign provider

  // google sign start 
  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const userInfo = result.user;
        const successfull = {...user}
        successfull.error = ''
        successfull.success = true
        successfull.isLoggedIn = true
        successfull.name = userInfo.displayName
        successfull.email = userInfo.email
        successfull.photo = userInfo.photoURL
        setUser(successfull)
        setLoggedInUser(successfull)
        history.replace(from)
      })
      .catch((error) => {
        const errorUser = {...user}
        errorUser.error = error.message
        errorUser.success = false
        setUser(errorUser)
      });
  }
  // google sign end

  //google sign out start 
  
  const handleSignOut = ()=>{
    console.log("signOut")
    firebase.auth().signOut()
    .then((res) => {
      const signOutUser = {
        isLoggedIn : false,
        name :'',
        email : '',
        photo : '',
      }
      setUser(signOutUser)
    })}
  //google sign out start 

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
    const {email , password} = user
    if(newUser && email && password){
      firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    const successfull = {...user}
    successfull.error = ''
    successfull.success = true
    updateName(user.name)
    setUser(successfull)
    setLoggedInUser(successfull)
    history.replace(from)


  })
  .catch((error) => {
    const errorUser = {...user}
    errorUser.error = error.message
    errorUser.success = false
    setUser(errorUser)

  });
    }
// sign in 
else if (!newUser && email && password){
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    const successfull = {...user}
    successfull.error = ''
    successfull.success = true
    setUser(successfull)
    setLoggedInUser(successfull)
    history.replace(from)
  })
  .catch((error) => {
    const errorUser = {...user}
    errorUser.error = error.message
    errorUser.success = false
    setUser(errorUser)
  });
}
const updateName = name =>{
  const user = firebase.auth().currentUser;
  user.updateProfile({
  displayName: name,
  })
  .then((res) => {
  })
  .catch((error) => {
  
  });  
}
    e.preventDefault()

  }
  // email sign up end 

  // github sign in start 
  const handleGithubSignIn = ()=>{
    firebase
  .auth()
  .signInWithPopup(githubProvider)
  .then((result) => {
    const user = result.user;
    const successfull = {...user}
    successfull.error = ''
    successfull.success = true
    setUser(successfull)
    setLoggedInUser(successfull)
    history.replace(from)
  })
  .catch((error) => {
    const errorUser = {...user}
    errorUser.error = error.message
    errorUser.success = false
    setUser(errorUser)
  });

  }
  // github sign in end 
  
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
            <li ><FontAwesomeIcon onClick={handleGoogleSignIn} icon={faGoogle} /></li>
            <li><FontAwesomeIcon onClick={handleGithubSignIn} icon={faGithub} /></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Login;