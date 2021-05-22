
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { QUERY_PENDING_WALKERS } from '../utils/queries';
import { UPDATE_WALKER_STATUS } from '../utils/mutations';
import ModalDisplay from '../components/ModalDisplay';

function AdminPage() {
    const { data: walkersToBeApproved, loading } = useQuery(QUERY_PENDING_WALKERS, {pollInterval:500});
    const [updateWalkerStatus] = useMutation(UPDATE_WALKER_STATUS);
    const [pendingWalkerList, setPendingWalkerList] = useState([]);
    const [modalJSX, setModalJSX] = useState(<div />);
    const [modalOpen, setModalOpen] = useState();

    useEffect(() => {
        // if not already in global store
        if (walkersToBeApproved) {
            setPendingWalkerList([...walkersToBeApproved.getPendingWalkers])
        }
    }, [walkersToBeApproved]);

    const handleWalkerStatus = async (event) => {
        const walker_id = event.target.getAttribute("data-walkerid");
        event.preventDefault();

        try {
            await updateWalkerStatus({
                variables: {
                    walker_id,
                    status: "ACTIVE"
                }
            });

            const updatedWalkerList = pendingWalkerList.filter(walker => walker._id !== walker_id);
            setPendingWalkerList([...updatedWalkerList]);

            setModalJSX(
                <div>
                    <h6>Walker profile has been activated successfully!</h6>
                </div>
            );
            setModalOpen(true);

        } catch(e) {
            console.log(e);
        }
    };

    const closeModal = () => {
        setModalJSX(<div />);
        setModalOpen(false);
    };

    return (
        <div className="walker-contact-container">
            <div className="walker-header">
                <h2>Walkers to be approved</h2>
            </div>
            {
                loading &&
                <div>Loading Dashboard...</div>
            }
            <div>
                {
                    pendingWalkerList.length > 0 &&
                    pendingWalkerList.map((walker, index) => (
                        <div className="walks">
                            <div>
                                <span className="medium-text">Name:</span> {`${walker.first_name} ${walker.last_name}`}
                            </div>
                            <button 
                                type="button" 
                                data-walkerid={walker._id}
                                onClick={handleWalkerStatus}
                            >
                                Approve
                            </button>
                        </div>
                    )) 

                }
            </div>
            <ModalDisplay component={modalJSX} isOpen={modalOpen} closeModal={closeModal}/>
        </div>
    )
};

export default AdminPage;
