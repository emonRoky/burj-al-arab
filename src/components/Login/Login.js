import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const [loggedInUser, setloggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    const handelGoogleSignIn = () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then( res => {
            const {displayName, email} = res.user;
            const signedUser = {name:displayName , email}
            setloggedInUser(signedUser);
            history.replace(from);
          })
          .catch(error => {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handelGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;