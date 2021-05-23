import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

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

