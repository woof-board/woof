import React from 'react';
import '../../css/WalkerProfile.css';
// import decode from 'jwt-decode';
// import Auth from '../../utils/auth';
// import { QUERY_WALKER_ME } from '../../utils/queries';
// import { useQuery } from '@apollo/react-hooks';

function WalkerEarnings({earnings=0}) {

    // const walkerToken = decode(Auth.getToken());

    // const walkerEarning = useQuery(QUERY_WALKER_ME, {
    //     variables: { walker_id: walkerToken.data._id }
    //   })
    
    // const walkerData = walkerEarning?.walker || [{ _id: "", firstName: "", email: "", reviews: [{ owner_id: '', rating: '5', reviewText: 'You are Great'}], averageRating: '', earnings: '500' }];

    // const index = walkerData.length - 1;
    // const totalEarnings = walkerData[index].length;

    return (
        <div className="walker-profile-container">
          <div>
            My Earnings for current period
          </div>
              <div key="prop" className="walks">
                <div>Earnings: {earnings} CAD</div>
            </div>
        </div>
    )
}

export default WalkerEarnings;