import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import '../css/Profile.css';
import { QUERY_WALKER_ME, QUERY_WALKER_ORDERS } from '../utils/queries';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import WalkerTrackOrder from "../components/WalkerTrackWalks/WalkerTrackOrder"

function WalkerTrackWalks() {
    const [state, dispatch] = useStoreContext();
    const { currentUser } = state;

    const [orders, setOrders] = useState([]);
    const [getProfile, { data: profileData }] = useLazyQuery(QUERY_WALKER_ME, {
        fetchPolicy: 'no-cache'
    });

    const [getWalkerOrders, { data: walkerOrderData }] = useLazyQuery(QUERY_WALKER_ORDERS, {
        variables: {
            walker_id: currentUser?._id
        },
        fetchPolicy: "no-cache"
    });

    useEffect(() => {
        if (!currentUser && !profileData) {
            getProfile();
        }
        // retrieved from server
        else if (!currentUser && profileData) {
            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: { ...profileData.walkerMe }
            });
            idbPromise('user', 'put', profileData.walkerMe);
        }
    }, [currentUser, profileData, dispatch]);

    useEffect(() => {
        if (currentUser) {
            getWalkerOrders();
        }
    }, [currentUser]);

    useEffect(() => {
        if (walkerOrderData) {
            setOrders(walkerOrderData.walkerOrders);
        }
    }, [walkerOrderData]);

    return (
        <div id="walkers">
            <h1>My Walks</h1>
            {console.log("order: ", orders[0])}
            <div className='page-wrap'>
                <div className="walk-container">
                    {currentUser && currentUser.status === "ACTIVE" &&
                        <>
                            <div className="walker-header"><h2>Upcoming Walks</h2></div>
                            {orders.filter(order => order.status === "PENDING_PROGRESS" || order.status === "IN_PROGRESS").map((order) => (
                                <div className="walks">
                                    <div><span class="medium-text">Walk Date: </span>{order.service_date}</div>
                                    <div><span class="medium-text">Start time: </span>{order.service_time}</div>
                                    <div><span class="medium-text">Name: </span>{order.owner.first_name} {order.owner.last_name}</div>
                                    <div><span class="medium-text">Address: </span>{order.owner.address.street}, {order.owner.address.city}, {order.owner.address.postal_code}</div>
                                    <WalkerTrackOrder
                                        order_id={order._id}
                                        service_date={order.service_date}
                                        service_time={order.service_time}
                                        status={order.status}
                                    />
                                </div>
                            ))}
                        </>
                    }
                </div>
                {/* fulfilled walks */}
                <div className="walk-container">
                    {currentUser && currentUser.status === "ACTIVE" &&
                        <>
                            <div className="walker-header"><h2>Completed Walks</h2></div>
                            {orders.filter(order => order.status === "FULLFILLED" || order.status === "DENIED").map((order) => (
                                <div className="walks">
                                    <div><span class="medium-text">Walk Date: </span>{order.service_date}</div>
                                    <div><span class="medium-text">Start time: </span>{order.service_time}</div>
                                    <div><span class="medium-text">Name: </span>{order.owner.first_name} {order.owner.last_name}</div>
                                </div>
                            ))}
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default WalkerTrackWalks;


