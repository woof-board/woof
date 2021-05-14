import React from 'react';
import '../css/WalkerProfile.css';
import Auth from '../utils/auth';
// import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import decode from 'jwt-decode';
import { QUERY_WALKER_ORDERS } from '../utils/queries';

function WalkerProfile() {

  const { loading, data } = useQuery(QUERY_WALKER_ORDERS)
  console.log(data)
  // decode token for Walker Data
  const token = decode(Auth.getToken());
  const walkerData = token.data;
  console.log(data);

  const handleFormSubmit = async () => {
    alert('Account Updated')
  }

  const walkerArr = [
    {
      display: 'First Name',
      title: walkerData.firstName,
      type: 'text'
    },
    {
      display: 'Last Name',
      title: walkerData.lastName,
      type: 'text'
    },
    {
      display: 'Email',
      title: walkerData.email,
      type: 'email'
    },
  ]


  return (
    <div className="page-body">
      <div className="walker-picture-container">
        IMG HERE
      </div>
      <div className="walker-details-container">
        <div className="walker-profile-container">
          <div>
            My Profile
          </div>
          <form 
            className="user-update-form"
            id="walker-update-form"
            onSubmit={handleFormSubmit}>
            {walkerArr.map((arr) => (
              <div key={arr.display} className="row-data">
                <label className="profile-label">{arr.display}</label>
                <input className="profile-input" placeholder={arr.title} type={arr.type} name={arr.type} defaultValue={arr.title}/>
              </div>
            ))}
            <button
              type="submit"
              className="update-walker-button"
              id="update-walker-button"
            >UPDATE</button>
          </form>
        </div>
        <div className="walker-profile-container">
          <div>
            My Walks
          </div>
        </div>
        <div className="walker-profile-container">
          <div>
            My Reviews
          </div>
        </div>

      </div>

    </div>
  );
}

export default WalkerProfile;

// firstname
// lastname
// email
// neighbourhoods
// rating
// reviews
// earnings
// availability

