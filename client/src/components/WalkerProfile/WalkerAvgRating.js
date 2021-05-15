import React from 'react';
import '../../css/WalkerProfile.css';
import decode from 'jwt-decode';
import Auth from '../../utils/auth';
import { QUERY_WALKER_ME } from '../../utils/queries';
import { useQuery } from '@apollo/react-hooks';

function WalkerAvgRating(props) {

    const walkerToken = decode(Auth.getToken());

    const walkerArr = useQuery(QUERY_WALKER_ME, {
        variables: { walker_id: walkerToken.data._id }
      })
    
    const walkerData = walkerArr?.walker || { _id: "", firstName: "", email: "", reviews: [{ owner_id: '', rating: '5', reviewText: 'You are Great'}], averageRating: '9.5', earnings: '500', neighbourhoods: ['Toronto', 'Markham'] };

    return (
        <div className="walker-profile-container">
          <div>
            My Rating
          </div>
          <div className="average-rating">
            {walkerData.averageRating}
          </div>
        </div>
    )
}

export default WalkerAvgRating;