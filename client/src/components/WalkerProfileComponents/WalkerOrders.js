import React from 'react';
import '../../css/WalkerProfile.css';

function WalkerOrders({ orders=[] }) {

    const totalOrders = orders.length;

    return (
        <div className="walker-profile-container">
          <div>
            My Walks - {totalOrders ? `Viewing ${totalOrders} past ${totalOrders === 1 ? 'walk' : 'walks'}:`
            : 'You have no past Walks'}
          </div>
            {orders.map((order, ind) => (
              <div key={ind} className="walks">
                <div>{order.service_date}</div>
                <div>{order.service_time}</div>
              </div>
            ))}
        </div>
    )
}

export default WalkerOrders;