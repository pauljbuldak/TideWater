import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '248480762340-jdfe4728252bam5q4pej2cia4brfno5r.apps.googleusercontent.com';

function Logout() {
    const onSuccess = () => {
        alert('Logout made successfully');
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default Logout;

