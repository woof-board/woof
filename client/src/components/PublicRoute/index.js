import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../utils/auth';

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ children }) =>

                (Auth.loggedIn()) ? (
                    <>
                        {Auth.getProfileType() === "owner" && <Redirect to="/ownerprofile" />}
                        {Auth.getProfileType() === "walker" && <Redirect to="/walkerprofile" />}
                        {Auth.getProfileType() === "admin" && <Redirect to="/ownerprofile" />}
                        {Auth.getProfileType() === "guest" && <Redirect to="/" />}
                    </>
                ) : (
                    <Component {...children} />
                )
            }
        />
    );
}

export default PublicRoute;