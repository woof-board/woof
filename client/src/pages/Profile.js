import React from 'react';
import '../css/Profile.css';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { Redirect, useParams } from 'react-router-dom';

const Profile = () => {

    //gets the username from address bar localhost:3000/profile/:username?
    const { username: userParam } = useParams();
    // console.log(userParam);
  
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
      variables: { username: userParam }
    })
  
    const user = data?.me || data?.user || {};

    // console.log(user);
  
    // redirect to personal profile page if username is the logged-in user's
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
      return <Redirect to="/profile" />;
    }
  
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
          <h4>
            You need to be logged in to see this page. Use the navigation links above to sign up or log in!
          </h4>
        );
      }
  
    return (
        <div id="profile">
            <div className="proflie-container">
                <div></div>
                <div>Viewing {userParam ? `${user.username}'s` : 'your'} profile.</div>
                <div>NAME</div>
                <div>ICONS</div>
            </div>
        </div>
    )
}

export default Profile;