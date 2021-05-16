import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import '../../css/WalkerProfile.css';
import { UPDATE_WALKER_PROFILE } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../../utils/actions";

function WalkerDetails({ user }) {
    const [updateWalkerProfile, { error }] = useMutation(UPDATE_WALKER_PROFILE);
    const [state, dispatch] = useStoreContext();

    const [formData, setFormData] = useState({ 
        first_name: '', 
        last_name: '', 
        email: '',
        avatar: '',
        neighbourhoods: [],
        address_street: '',
        address_city: '',
        address_neighbourhood: '',
        address_province: '',
        address_postal_code:''
    });

    useEffect(() => {
        if (user) {
            const { first_name, last_name, email, avatar, neighbourhoods, address } = user;
            setFormData({
                first_name,
                last_name,
                email,
                avatar,
                neighbourhoods,
                address_street: address.street,
                address_city: address.city,
                address_neighbourhood: address.neighbourhood,
                address_province: address.province,
                address_postal_code: address.postal_code,
            });
        }
    
    }, [user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ 
            ...formData, 
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // need to implement form validation here
        
        const { 
            address_street, 
            address_city,
            address_neighbourhood,
            address_province,
            address_postal_code,
            ...rest
         } = formData;

         try {
            const { data: { updateWalkerProfile: newProfile } } = await updateWalkerProfile({
                variables: {
                    input: {
                        ...rest,
                        address: {
                            street: address_street,
                            city: address_city,
                            neighbourhood: address_neighbourhood,
                            province: address_province,
                            postal_code: address_postal_code,
                        }
                    }
                }
            });
            
            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: newProfile
            });

            alert('Account Updated');
         } catch (e) {
             console.log(e);
         }
    };

    const provinces = [
        { displayName: 'Ontario', value: "ontario"},
        { displayName: 'Quebec', value: "quebec"},
        { displayName: 'New Foundland', value: "new-foundland"},
        { displayName: 'Nova Scotia', value: "nova-scotia"},
        { displayName: 'New Brunswick', value: "new-brunswick"},
        { displayName: 'Manitoba', value: "manitoba"},
        { displayName: 'Saskatchewan', value: "saskatchewan"},
        { displayName: 'Alberta', value: "alberta"},
        { displayName: 'British Columbia', value: "british-columbia"},
        { displayName: 'Prince Edward Island', value: "prince-edward-island"},
    ]

    return (
        <div className="walker-contact-container">
            <div>
                <h2>My Profile</h2>
            </div>
            <form
                className="user-update-form"
                id="walker-update-form"
                onSubmit={handleFormSubmit}
            >
                <div className="row-data">
                    <label className="profile-label">First Name</label>
                    <input
                        className="profile-input"
                        type="text"
                        name="first_name"
                        onChange={handleInputChange}
                        value={formData.first_name}
                    />
                </div>
                <div className="row-data">
                    <label className="profile-label">Last Name</label>
                    <input
                        className="profile-input"
                        type="text"
                        name="last_name"
                        onChange={handleInputChange}
                        value={formData.last_name}
                    />
                </div>
                <div className="row-data">
                    <label className="profile-label">Email</label>
                    <input
                        className="profile-input"
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        value={formData.email}
                    />
                </div>
                <div><h4>Address Info</h4></div>
                <div className="row-data">
                    <label className="profile-label">Street</label>
                    <input
                        className="profile-input"
                        type="text"
                        name="address_street"
                        onChange={handleInputChange}
                        value={formData.address_street}
                    />
                </div>
                <div className="row-data">
                    <label className="profile-label">Street</label>
                    <input
                        className="profile-input"
                        type="text"
                        name="address_city"
                        onChange={handleInputChange}
                        value={formData.address_city}
                    />
                </div>
                <div className="row-data">
                    <label className="profile-label">Street</label>
                    <input
                        className="profile-input"
                        type="text"
                        name="address_neighbourhood"
                        onChange={handleInputChange}
                        value={formData.address_neighbourhood}
                    />
                </div>
                <div className="row-data">
                    <label className="profile-label">Street</label>
                    <input
                        className="profile-input"
                        type="text"
                        name="address_postal_code"
                        onChange={handleInputChange}
                        value={formData.address_postal_code}
                    />
                </div>

                <div className="row-data">
                    <label className="profile-label">Province</label>
                    <select className="profile-input" id="walker-province" name="walker-province">
                        {provinces.map((province, ind) => (
                            <option key={ind} value={province.value}>{province.displayName}</option>
                        ))}
                    </select>
                </div>
                
                <button
                    type="submit"
                    className="update-walker-button"
                    id="update-walker-button"
                >
                    UPDATE
                </button>
            </form>
        </div>
    )
}

export default WalkerDetails;