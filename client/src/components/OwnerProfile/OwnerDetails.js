import React, { useState, useEffect } from 'react';

function WalkerDetails({ user }) {

    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
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
        <>
        <h1>My Profile</h1>
        <div className="walker-contact-container">
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
                        name="firstName"
                        onChange={handleInputChange}
                        value={formData.firstName}
                    />
                </div>
                <div className="row-data">
                    <label className="profile-label">Last Name</label>
                    <input
                        className="profile-input"
                        type="text"
                        name="lastName"
                        onChange={handleInputChange}
                        value={formData.lastName}
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
                <div className="row-data">
                    <label className="profile-label">Phone</label>
                    <input
                        className="profile-input"
                        type="text"
                        name="phone"
                        onChange={handleInputChange}
                        value={formData.phone}
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
        </>
    )
}

export default WalkerDetails;