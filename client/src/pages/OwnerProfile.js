import React from 'react';
import '../css/OwnerProfile.css';

import { useQuery, useMutation } from '@apollo/react-hooks';
import decode from 'jwt-decode';
import { QUERY_OWNER_ORDERS } from '../utils/queries';

function OwnerProfile() {

    const { loading, data } = useQuery(QUERY_OWNER_ORDERS)
    console.log(data)
    // decode token for Owner Data
    const token = decode(Auth.getToken());
    const ownerData = token.data;
    console.log(data);
  
    const handleFormSubmit = async () => {
      alert('Account Updated')
    }

    const ownerArr = [
        {
          display: 'First Name',
          title: ownerData.firstName,
          type: 'text'
        },
        {
          display: 'Last Name',
          title: ownerData.lastName,
          type: 'text'
        },
        {
          display: 'Email',
          title: ownerData.email,
          type: 'email'
        },
      ]


    return (
        <>
            <div className="page-body">
                <div className="owner-picture-container">
                IMG HERE
                </div>
                <div className="owner-details-container">
                    <div className="owner-profile-container">
                        <div>
                            My Profile
                        </div>
                        <form 
                            className="user-update-form"
                            id="owner-update-form"
                            onSubmit={handleFormSubmit}>
                            {ownerArr.map((arr) => (
                            <div key={arr.display} className="row-data">
                                <label className="profile-label">{arr.display}</label>
                                <input className="profile-input" placeholder={arr.title} type={arr.type} name={arr.type} defaultValue={arr.title}/>
                            </div>
                            ))}
                            <button
                            type="submit"
                            className="update-owner-button"
                            id="update-owner-button"
                            >UPDATE</button>
                        </form>
                    </div>
                </div>

                <div className="dog-picture-container">
                IMG HERE
                </div>
                <div className="dog-details-container">
                    <div className="dog-profile-container">
                        <div>
                            My Profile
                        </div>
                        <form 
                            className="user-update-form"
                            id="dog-update-form"
                            onSubmit={handleFormSubmit}>
                            {dogArr.map((arr) => (
                            <div key={arr.display} className="row-data">
                                <label className="profile-label">{arr.display}</label>
                                <input className="profile-input" placeholder={arr.title} type={arr.type} name={arr.type} defaultValue={arr.title}/>
                            </div>
                            ))}
                            <button
                            type="submit"
                            className="update-dog-button"
                            id="update-dog-button"
                            >UPDATE</button>
                        </form>
                    </div>
                </div>

            </div>


        </>
    )
}

export default OwnerProfile;