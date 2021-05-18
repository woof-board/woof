import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import '../css/Profile.css';

import { QUERY_OWNER_BOOKING } from '../utils/queries';

import OwnerWalkDetails from "../components/OwnerWalkerForm/OwnerWalkDetails"

function OwnerBookWalk() {
    const { loading, data } = useQuery(QUERY_OWNER_BOOKING);
    

    return (
        <div id="walkers">
            <div className="headline">            
                <h1>Book a Walk</h1>
            </div>
            <OwnerWalkDetails data={data}/>
        </div>
    )

}

export default OwnerBookWalk;

