import React, { useState, useEffect } from 'react';
import '../../css/WalkerProfile.css';

function WalkerDetails({ user }) {

    const [formData, setFormData] = useState({ 
        first_name: '', 
        last_name: '', 
        email: '',
        // avatar: '',
        // neighbourhoods: [],
        // street: '',
        // city: '',
        // neighbourhood: '',
        // province: '',
        // postal:''

    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
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

    const handleFormSubmit = async () => {
        alert('Account Updated');
    };

    return (
        <div className="walker-contact-container">
            <div>
                My Profile
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
                {
                // <div className="row-data">
                //     <label className="profile-label">Province</label>
                //     <select className="profile-input" id="walker-province" name="walker-province">
                //         {province.map((arr) => (
                //             <option key={arr} value={arr}>{arr}</option>
                //         ))}
                //     </select>
                // </div>
                }
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