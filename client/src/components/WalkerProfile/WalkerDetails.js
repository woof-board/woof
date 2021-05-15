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
            title: walkerToken.data.firstName,
            type: 'text',
            input: 'input'
        },
        {
            display: 'Last Name',
            title: walkerToken.data.lastName,
            type: 'text',
            input: 'input'
        },
        {
            display: 'Email',
            title: walkerToken.data.email,
            type: 'email'
        },
        { 
            display: 'Street Number',
            title: '#',
            type: 'text',
            input: 'input'
        },
        {
            display: 'Street Name',
            title: 'Union',
            type: 'text',
            input: 'input'
        },
        {
            display: 'City',
            title: 'Toronto',
            type: 'text',
            input: 'input'
        },
    ]

    const province = ['Alberta', 'British Columnbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon']

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
                <div className="row-data">
                    <label className="profile-label">Province</label>
                    <select className="profile-input" id="walker-province" name="walker-province">
                        {province.map((arr) => (
                            <option key={arr} value={arr}>{arr}</option>
                        ))}
                    </select>
                </div>
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