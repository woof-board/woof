import React from 'react';
import '../../css/WalkerProfile.css';
import decode from 'jwt-decode';
import Auth from '../../utils/auth';
import { QUERY_WALKER_ORDERS } from '../../utils/queries';
import { useQuery } from '@apollo/react-hooks';

function WalkerOrders(props) {

    const walkerToken = decode(Auth.getToken());

    const orderData = useQuery(QUERY_WALKER_ORDERS, {
        variables: { walker_id: walkerToken.data._id }
      })
    
    const walkerOrders = orderData?.walker_order || [{ _id: "", serviceData: '', serviceTime: 'Date(11/11/11)', owner: [{ _id: '', firstName: 'Nathan', lastName: ''}] }];

    const totalOrders = walkerOrders.length;

    return (
        <div className="walker-profile-container">
          <div>
            My Walks - {totalOrders ? `Viewing ${totalOrders} past ${totalOrders === 1 ? 'walk' : 'walks'}:`
            : 'You have no past Walks'}
          </div>
            {walkerOrders.map((arr) => (
              <div key={arr._id} className="walks">
                <div>{arr.serviceTime}</div>
                <div>{arr.owner[0].firstName}</div> 
              </div>
            ))}
        </div>
    )
}

export default WalkerOrders;