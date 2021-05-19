import React, { useEffect } from 'react';
// import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

// import '../css/Profile.css';

// import { QUERY_OWNER_BOOKING } from '../utils/queries';

// import OwnerWalkDetails from "../components/OwnerWalkerForm/OwnerWalkDetails"

function OwnerBookWalk() {
    return (
        <div id="walkers">
            <div className="headline">            
            <Link to={"/bookwalk"}><button> Book a Walk</button></Link>
            </div>
        </div>
    )

}

export default OwnerBookWalk;

