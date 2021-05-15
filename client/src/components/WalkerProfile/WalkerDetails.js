import React from 'react';
import '../../css/WalkerProfile.css';
import decode from 'jwt-decode';
import Auth from '../../utils/auth';

function WalkerContact(props) {

    const walkerToken = decode(Auth.getToken());
    console.log(walkerToken.data);

    const walkerArr = [
        {
            display: 'First Name',
            title: walkerToken.firstName,
            type: 'text'
        },
        {
            display: 'Last Name',
            title: walkerToken.lastName,
            type: 'text'
        },
        {
            display: 'Email',
            title: walkerToken.email,
            type: 'email'
        }
    ]

    const handleFormSubmit = async () => {
        alert('Account Updated')
    }

    return (
        <div className="walker-contact-container">
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
    )
}

export default WalkerContact;