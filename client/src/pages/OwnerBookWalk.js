import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

// import '../css/Profile.css';

import { QUERY_OWNER_BOOKING } from '../utils/queries';

import OwnerWalkDetails from "../components/OwnerWalkerForm/OwnerWalkDetails"

function OwnerBookWalk() {
    const { loading, data } = useQuery(QUERY_OWNER_BOOKING);

    if (loading){
        return <p>Loading ... </p>
    }

    const ownerData = data.ownerMe;


    return (
        <div id="walkers">
            <div className="headline">            
                <button><Link to="/bookwalk">Book a Walk</Link></button>
            </div>
        </div>
    )

}

export default OwnerBookWalk;

