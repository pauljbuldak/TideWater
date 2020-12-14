import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientID = '248480762340-jdfe4728252bam5q4pej2cia4brfno5r.apps.googleusercontent.com';


function Login() {
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser: ', res.profileObj);
        console.log('First Name: ', res.profileObj.givenName);
        console.log('Last Name: ', res.profileObj.familyName);
        console.log('res.tokenID: ', res.tokenId);
    };

    const onFailure = (res) => {
        console.log('[Login failed] res: ', res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientID}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}


export default Login;