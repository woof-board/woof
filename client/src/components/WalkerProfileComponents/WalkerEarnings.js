import React, { useState } from 'react';
import ModalDisplay from '../../components/ModalDisplay';

function WalkerEarnings({ earnings = 0 }) {
    const [modalJSX, setModalJSX] = useState(<div />);
    const [modalOpen, setModalOpen] = useState();
    const closeModal = () => {
        setModalJSX(<div />);
        setModalOpen(false);
    };

    const handleSubmit = event => {
        event.preventDefault();
        setModalJSX(
            <div>
                <h6>Payout request has been placed!</h6>
                <button type="button" onClick={() => setModalOpen(false)}>Close</button>
            </div>
        );
        setModalOpen(true);
    };

    return (
        <div className="walker-contact-container">
            <div className="walker-header">
                <h3>My Earnings</h3>
            </div>
            <form
                className="user-update-form"
                onSubmit={handleSubmit}
            >
                <div key="prop" className="walks">
                    <div>Earnings: ${earnings.toFixed(2)}</div>
                </div>
                <button
                    type="submit"
                    className="update-walker-button"
                >
                    REQUEST PAYOUT
            </button>
            </form>
            <ModalDisplay component={modalJSX} isOpen={modalOpen} closeModal={closeModal}/>
        </div>
    )
}

export default WalkerEarnings;