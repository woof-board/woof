import React from 'react';
import { Link } from 'react-router-dom'

function WalkerOrders({ orders=[] }) {

    const totalOrders = orders.length;

    return (
        <div className="walker-contact-container">
          <div className="walker-header">
            <h3>My Woof <span className="light">{totalOrders ? `Viewing ${totalOrders} upcoming ${totalOrders === 1 ? 'walk' : 'walks'}:`
            : 'You have no upcoming walks'}</span></h3>
          </div>
            {orders.map((order, ind) => (
              <div className="walks">
                <div>{order.service_date}</div>
                <div>{order.service_time}</div>
              </div>
            ))}
          <div className="button-container">
            <Link to="/walkerschedule"><button>My Schedule</button></Link>
            <Link to="/walkertrackwalks"><button>My Walks</button></Link>
          </div>
        </div>
    )
}

export default WalkerOrders;