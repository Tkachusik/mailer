import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { setAccessToken } from './actions';

const clientId = '586603057009-22hv4tdbo26pcfhf8avf6dcu13a77pm7.apps.googleusercontent.com';

const Login = ({ setAccessToken }) => {
    const onSuccess = (res) => {
        console.log('Login Success: ', res);
        alert(`Logged in successfully welcome ${res.profileObj.name} 😍.`);
        setAccessToken(res.accessToken);
    };

    const onFailure = () => {
        alert(`Failed to login. 😢`);
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        scope: "https://www.googleapis.com/auth/gmail.readonly",
    });

    return (
        <div>
            <button onClick={signIn} className="login-button">
                <img src="google.svg" alt="google login" className="icon"></img>

                <span className="buttonText">Sign in with Google</span>
            </button>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = {
    setAccessToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);