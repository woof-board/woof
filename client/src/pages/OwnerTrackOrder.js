import React, { useState, useEffect } from 'react';
import {  useLazyQuery } from '@apollo/react-hooks';
import '../css/Profile.css';
import { QUERY_OWNER_ME, QUERY_OWNER_ORDERS } from '../utils/queries';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../utils/actions";
import ModalDisplay from '../components/ModalDisplay';
import Map from "../components/OwnerTrackOrder/Map";
import ReviewForm from '../components/ReviewForm';
import { idbPromise } from "../utils/helpers";


function OwnerTrackOrder() {
    const [state, dispatch] = useStoreContext();
    const { currentUser } = state;

    const [orders, setOrders] = useState([]);
    const [getProfile, { data: profileData }] = useLazyQuery(QUERY_OWNER_ME, {
        fetchPolicy: 'no-cache'
    });

    const [getOwnerOrders, { data: ownerOrderData }] = useLazyQuery(QUERY_OWNER_ORDERS, {
        variables: {
            owner_id: currentUser?._id
        },
        fetchPolicy: "no-cache"
    });

    const [modalJSX, setModalJSX] = useState(<div />);
    const [modalOpen, setModalOpen] = useState();

    useEffect(() => {
        if (!currentUser && !profileData) {
            getProfile();
        } 
        // retrieved from server
        else if (!currentUser && profileData) {
            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: { ...profileData.ownerMe}
            });
            idbPromise('user', 'put', profileData.ownerMe);
        }
        // eslint-disable-next-line
    }, [currentUser, profileData, dispatch]);

    useEffect(() => {
        if(currentUser) {
            getOwnerOrders();
        }
        // eslint-disable-next-line
    }, [currentUser]);

    useEffect(() => {
        if (ownerOrderData) {
            setOrders(ownerOrderData.ownerOrders);
        }
        // eslint-disable-next-line
    }, [ownerOrderData]);

    const handleReview = (e) => {
        const walker_id = e.target.getAttribute("data-walkerid");
        setModalJSX(
            <ReviewForm walker_id={walker_id} closeModal={closeModal} />
        );
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalJSX(<div />);
        setModalOpen(false);
    };

    return (
        <div id="owners">
           <h1>My Walks</h1>
            <div className='page-wrap'>
                
                <div className="walk-container">
                    {currentUser && currentUser.status === "ACTIVE" &&
                        <>
                            <div className="walker-header"><h2>Upcoming Walks</h2></div>

                            {orders.map((order) => (
                                order.status !== "PENDING_PROGRESS"
                                    ? null
                                    : (
                                        <div className="walks">
                                            <div>
                                                <div><span className="medium-text">Walk Date:</span> {order.service_date}</div>
                                                <div><span className="medium-text">Start time:</span> {order.service_time}</div>
                                                <div><span className="medium-text">Walker:</span> {`${order.walker?.first_name} ${order.walker?.last_name}`} </div>
                                            </div>
                                        </div>
                                    )
                            ))}
                        </>
                    }
                </div>
                <div className="walk-container">
                    {currentUser && currentUser.status === "ACTIVE" &&
                        <>
                             <div className="walker-header"><h2>Past Walks</h2></div>
                            
                            {orders.map((order) => (
                                order.status !== "FULLFILLED"
                                    ? null
                                    : (
                                        <div className="walks">
                                            <div>
                                                <div><span className="medium-text">Walk Date:</span> {order.service_date}</div>
                                                <div><span className="medium-text">Start time:</span> {order.service_time}</div>
                                                <div><span className="medium-text">Status:</span> {order.status}</div>
                                                <div><span className="medium-text">Walker</span>: {`${order.walker.first_name} ${order.walker.last_name}`} </div>
                                                <button
                                                    type="button"
                                                    data-walkerid={order.walker._id}
                                                    onClick={handleReview}
                                                >Add a review</button>
                                                {/* Add map component */}
                                                <Map
                                                    order_id={order._id}
                                                    coords={order.coords}
                                                ></Map>
                                            </div>
                                        </div>
                                    )
                            ))}
                        </>
                    }
                </div>
                <ModalDisplay component={modalJSX} isOpen={modalOpen} closeModal={closeModal} />

            </div>
        </div>
    );
}

export default OwnerTrackOrder;


