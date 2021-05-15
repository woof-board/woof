import React from 'react';
import '../../css/WalkerProfile.css';
import decode from 'jwt-decode';
import Auth from '../../utils/auth';
import { QUERY_WALKER_ME } from '../../utils/queries';
import { useQuery } from '@apollo/react-hooks';

function WalkerNeighbourhoods(props) {

    const walkerToken = decode(Auth.getToken());

    const walkerEarning = useQuery(QUERY_WALKER_ME, {
        variables: { walker_id: walkerToken.data._id }
      })
    
    const walkerData = walkerEarning?.walker || [{ _id: "", firstName: "", email: "", reviews: [{ owner_id: '', rating: '5', reviewText: 'You are Great'}], averageRating: '', earnings: '500', neighbourhoods: ['Toronto', 'Markham'] }];

    const totalNeighbourhoods = walkerData.length;

    return (
        <div className="walker-profile-container">
          <div>
            My Earnings - {totalNeighbourhoods ? `Viewing ${totalNeighbourhoods} past ${totalNeighbourhoods === 1 ? 'neighbourhood' : 'neighbourhoods'}:`
              : 'You have no past Neighbourhoods'}
          </div>
            {walkerData.map((arr) => (
              <div key="prop" className="walks">
                <input className="profile-input" defaultValue={arr.neighbourhoods} placeholder={arr.neighbourhoods} />
              <div>{arr.reviewText}</div> 
            </div>
            ))}
        </div>
    )
}

export default WalkerNeighbourhoods;