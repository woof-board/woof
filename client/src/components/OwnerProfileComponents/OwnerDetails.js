import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
//import '../../css/OwnerProfile.css';
import { UPDATE_OWNER_PROFILE } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../../utils/actions";
import { cities, neighbourhoods } from '../../utils/helpers';

function OwnerDetails(props) {
    const {
        results,
    } = props

    function handleFormSubmit() {
        console.log('do nothing')
    }

    function handleInputChange() {
        console.log('go sleep');
    }

    return (
        <>
        <div className="walker-contact-container">
            <div className="walker-header"><h2>Personal Information</h2></div>
            <form
                className="walker-update-form"
                id="walker-update-form"
                onSubmit={handleFormSubmit}
            >
                <div className="row-data">
                    <input
                        className="profile-input profile-name"
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        onChange={handleInputChange}
                    />
                    <input
                        className="profile-input profile-name"
                        type="text"
                        name="last_name"
                        placeholder="First Name"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="row-data">
                    <input
                        className="profile-input"
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                    />
                </div>
                <div><h4>City</h4></div>
                <div className="row-data">
                    <input
                        className="profile-input"
                        type="text"
                        name="address_street"
                        placeholder="City"
                        onChange={handleInputChange}
                    />
                </div>
             
                <button
                    type="submit"
                    className="update-walker-button"
                    id="update-walker-profile-button"
                >
                    UPDATE
                </button>
            </form>
        </div>
        </>
    )
}

export default OwnerDetails;