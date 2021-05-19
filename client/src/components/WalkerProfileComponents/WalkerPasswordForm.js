import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_WALKER_PASSWORD } from "../../utils/mutations";
import ModalDisplay from '../../components/ModalDisplay';

function WalkerPasswordForm() {
    const [updateWalkerPassword, { error }] = useMutation(UPDATE_WALKER_PASSWORD);
    const [modalJSX, setModalJSX] = useState(<div />);
    const [modalOpen, setModalOpen] = useState();
    
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

            setModalJSX(
                <div>
                    <h6>Password has been updated successfully!</h6>
                    <button type="button" onClick={() => setModalOpen(false)}>Close</button>
                </div>
            );
            setModalOpen(true);
            setFormData({ 
                old_password: '', 
                new_password: ''
            });

         } catch (e) {
             console.log(e);
         }
    };

    const closeModal = () => {
        setModalJSX(<div />);
        setModalOpen(true);
    };

    return (
        <div className="walker-contact-container">
            <div className="walker-header"><h3>Update Password</h3></div>

            <form
                className="user-update-form"
                id="walker-update-form"
                onSubmit={handleFormSubmit}
            >
                <div className="row-data">
                    <input
                        className="profile-input"
                        type="password"
                        name="old_password"
                        placeholder="Current Password"

                        onChange={handleInputChange}
                        value={formData.old_password}
                    />

                    <input
                        className="profile-input"
                        type="password"
                        placeholder="New Password"
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
            <ModalDisplay component={modalJSX} isOpen={modalOpen} closeModal={closeModal}/>
        </div>
    )
}

export default WalkerPasswordForm;