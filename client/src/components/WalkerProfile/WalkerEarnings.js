import React from 'react';
import '../../css/WalkerProfile.css';
import decode from 'jwt-decode';
import Auth from '../../utils/auth';
import { QUERY_WALKER_ME } from '../../utils/queries';
import { useQuery } from '@apollo/react-hooks';

function WalkerEarnings(props) {

    const walkerToken = decode(Auth.getToken());

    const walkerEarning = useQuery(QUERY_WALKER_ME, {
        variables: { walker_id: walkerToken.data._id }
      })
    
    const walkerData = walkerEarning?.walker || [{ _id: "", firstName: "", email: "", reviews: [{ owner_id: '', rating: '5', reviewText: 'You are Great'}], averageRating: '', earnings: '500' }];

    const index = walkerData.length - 1;
    const totalEarnings = walkerData[index].length;

    return (
        <div className="walker-profile-container">
          <div>
            My Earnings - {totalEarnings ? `Viewing ${totalEarnings} past ${totalEarnings === 1 ? 'earning' : 'earnings'}:`
              : 'You have no past Earnings'}
          </div>
            {walkerData.map((arr) => (
              <div key="prop" className="walks">
                <div>Earnings: {arr.earning}</div>
              <div>{arr.reviewText}</div> 
            </div>
            ))}
        </div>
    )
}

export default WalkerEarnings;