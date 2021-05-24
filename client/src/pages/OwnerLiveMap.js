import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import '../css/Profile.css';
import { QUERY_OWNER_ME, QUERY_OWNER_ORDERS } from '../utils/queries';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../utils/actions";

import Map from "../components/OwnerTrackOrder/Map";
import { idbPromise } from "../utils/helpers";

function OwnerLiveMap() {
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

    // function for refreshing the page on button click
    function refreshWindow(event) {
        event.preventDefault();
        window.location.reload();
    }

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
    }, [ownerOrderData]);

    return (
        <div id="owners">

            <h1>Live Tracker</h1>
            <div className='page-wrap'>
                <div className="walker-contact-container">
                    {currentUser && currentUser.status === "ACTIVE" &&
                        <>
                            <div className="walker-header"><h2>Live Tracker is active when the dog walk starts</h2></div>
                            <div className="map-refresh"><h3>Please press <span><button type="button" className="button" onClick={refreshWindow}>REFRESH</button></span> to watch the progress</h3></div>
                            
                            {orders.map((order) => (
                                order.status !== "IN_PROGRESS"
                                    ? null
                                    : (
                                        <div className="walks">
                                            <div>
                                                <div><span className="medium-text">Walk Date:</span> {order.service_date}</div>
                                                <div><span className="medium-text">Start time:</span> {order.service_time}</div>
                                                <Map
                                                    order_id={order._id}
                                                    coords={order.coords}
                                                />
                                            </div>
                                        </div>
                                    )
                            ))}
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default OwnerLiveMap;


