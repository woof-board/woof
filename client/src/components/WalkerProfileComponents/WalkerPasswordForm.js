import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
<<<<<<< HEAD
import '../../css/WalkerProfile.css';
=======
//import '../../css/WalkerProfile.css';
>>>>>>> 0588cfdd685bf938a28914e2ba3203539f50aef9
import { UPDATE_WALKER_PASSWORD } from "../../utils/mutations";
// import { useStoreContext } from "../../utils/GlobalState";
// import { UPDATE_CURRENT_USER } from "../../utils/actions";

function WalkerPasswordForm() {
    const [updateWalkerPassword, { error }] = useMutation(UPDATE_WALKER_PASSWORD);
    // const [state, dispatch] = useStoreContext();

    const [formData, setFormData] = useState({ 
        old_password: '', 
        new_password: ''
    });

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

         try {
            await updateWalkerPassword({
                variables: {
                    old_password: formData.old_password,
                    new_password: formData.new_password
                }
            });

            alert('Password Updated');
         } catch (e) {
             console.log(e);
         }
    };

    return (
        <div className="walker-contact-container">
            <div>
                <h4>Update Password</h4>
            </div>
            <form
                className="user-update-form"
                id="walker-update-form"
                onSubmit={handleFormSubmit}
            >
                <div className="row-data">
                    <label className="profile-label">Old Password</label>
                    <input
                        className="profile-input"
                        type="password"
                        name="old_password"
                        onChange={handleInputChange}
                        value={formData.old_password}
                    />
                </div>
                <div className="row-data">
                    <label className="profile-label">New Password</label>
                    <input
                        className="profile-input"
                        type="password"
                        name="new_password"
                        onChange={handleInputChange}
                        value={formData.new_password}
                    />
                </div>
                
                <button
                    type="submit"
                    className="update-walker-button"
                    id="update-walker-button"
                >
                    UPDATE PASSWORD
                </button>
            </form>
        </div>
    )
}

export default WalkerPasswordForm;