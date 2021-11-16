import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.confing';

export const initializeLoginFramework = ()=>{
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        firebase.app();
      }
}

 // google sign start 
export const handleGoogleSignIn = () => {
const googleProvider = new firebase.auth.GoogleAuthProvider(); //google provider
 return firebase.auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
    //   const userInfo = result.user;
    //   const successfull = {...user}
    //   successfull.error = ''
    //   successfull.success = true
    //   successfull.isLoggedIn = true
    //   successfull.name = userInfo.displayName
    //   successfull.email = userInfo.email
    //   successfull.photo = userInfo.photoURL
    //   setUser(successfull)
    //   setLoggedInUser(successfull)
    //   history.replace(from)
    const user = result.user
    const {displayName , photoURL , email} = user;
    const signedInUser = {
        isLoggedIn: true,
        name: displayName,
        email: email,
        error : "",
        success : true,
        photo : photoURL
    }
    return signedInUser;
    })
    .catch((error) => {
    //   const errorUser = {...user}
    //   errorUser.error = error.message
    //   errorUser.success = false
    //   setUser(errorUser)
    const errorUser = {}
    errorUser.error = error.message
    errorUser.success = false
    return errorUser;
    });
}
// google sign end



  // github sign in start 
 export const handleGithubSignIn = ()=>{
    const githubProvider = new firebase.auth.GithubAuthProvider(); //github sign provider
return firebase.auth().signInWithPopup(githubProvider)
  .then((result) => {
    const successfull = result.user;
    successfull.error = ''
    successfull.success = true
    return successfull;
    // const successfull = {...user}
    // successfull.error = ''
    // successfull.success = true
    // setUser(successfull)
    // setLoggedInUser(successfull)
    // history.replace(from)
  })
  .catch((error) => {
    const errorUser = {}
    errorUser.error = error.message
    errorUser.success = false
    return errorUser;
  });

  }
  // github sign in end
  

   
  //google sign out start 
  
export  const handleSignOut = ()=>{
return firebase.auth().signOut()
    .then((res) => {
      const signOutUser = {
        isLoggedIn : false,
        name :'',
        email : '',
        photo : '',
        error : '',
        success : false
      }
      return signOutUser;
    })}
  //google sign out start 

  
// create user start 
export const createUserEmailAndPassword = (name , email , password)=>{  
 return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const successfull = userCredential.user;
    successfull.error = ''
    successfull.success = true
    updateName(name)
    return successfull;
  })
  .catch((error) => {
    const errorUser = {}
    errorUser.error = error.message
    errorUser.success = false
    return errorUser;

  });
}
// create user end 

// sign in email 

export const signInEmailandPassword = ( email, password)=>{
  return  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const successfull = userCredential.user;
      successfull.error = ''
      successfull.success = true
      return successfull;
    })
    .catch((error) => {
      const errorUser = {}
      errorUser.error = error.message
      errorUser.success = false
      return errorUser;
    });
  }

  // sign in email end

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