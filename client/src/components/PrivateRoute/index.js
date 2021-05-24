import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../utils/auth';

const PrivateRoute = ({ component:Component, usertype, ...rest }) => {

    if (usertype === "owner_admin") {
        return (
            <Route
                {...rest}
                render={({children}) =>
            
                (Auth.loggedIn() && (Auth.getProfileType() === "admin" || Auth.getProfileType() === "owner")) ? (
                    <Component {...children} />
                ) : (
                    <>
                    {(Auth.getProfileType() === "owner" || Auth.getProfileType() === "admin") && <Redirect to="/ownerprofile"/>}
                    {Auth.getProfileType() === "walker" && <Redirect to="/walkerprofile"/>}
                    {/* {Auth.getProfileType() === "admin" && <Redirect to="/adminprofile"/>} */}
                    {Auth.getProfileType() === "guest" && <Redirect to="/"/>}
                    </>
                )
                }
            />
        );
    }

    return (
      <Route
        {...rest}
        render={({children}) =>
    
          (Auth.loggedIn() && Auth.getProfileType() === usertype) ? (
            <Component {...children} />
          ) : (
              <>
            {(Auth.getProfileType() === "owner" || Auth.getProfileType() === "admin") && <Redirect to="/ownerprofile"/>}
            {Auth.getProfileType() === "walker" && <Redirect to="/walkerprofile"/>}
            {/* {Auth.getProfileType() === "admin" && <Redirect to="/adminprofile"/>} */}
            {Auth.getProfileType() === "guest" && <Redirect to="/"/>}
            </>
          )
        }
      />
    );
}
 
export default PrivateRoute;


// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import Auth from '../../utils/auth';

// const PrivateRoute = ({ component:Component, usertype, ...rest }) => {
//     return (
//       <Route
//         {...rest}
//         render={({children}) =>
    
//           (Auth.loggedIn() && Auth.getProfileType() === usertype) ? (
//             <Component {...children} />
//           ) : (
//               <>
//             {(Auth.getProfileType() === "owner" || Auth.getProfileType() === "admin") && <Redirect to="/ownerprofile"/>}
//             {Auth.getProfileType() === "walker" && <Redirect to="/walkerprofile"/>}
//             {/* {Auth.getProfileType() === "admin" && <Redirect to="/adminprofile"/>} */}
//             {Auth.getProfileType() === "guest" && <Redirect to="/"/>}
//             </>
//           )
//         }
//       />
//     );
// }
 
// export default PrivateRoute;