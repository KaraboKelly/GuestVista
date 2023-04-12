import React, { useState } from 'react';
import logo from "./images/logo.jpeg";
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from './config/firebase'
import App from "./App";

const Register = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const userLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                console.log(userCredential);
                setLoggedIn(true);
            })
            .catch((error) => {
                console.log(error);
                setErrorMsg("Wrong password or email");
            })
    }
    if (loggedIn) {
        return <App/>;

    }

    return (
        <div className="auth-form-container">
            <img src={logo} alt="" />
            <h1>GuestVista</h1>
            <form className="login-form" onSubmit={userLogin} >
                <label htmlFor="Email">Email:</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                />
                <label htmlFor="Password">Password:</label>
                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />
                <button type="submit">Login
                </button>
                {errorMsg && <p>{errorMsg}</p>}
            </form>
        </div>
    );
}