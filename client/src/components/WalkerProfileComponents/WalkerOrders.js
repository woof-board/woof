import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStoreContext } from "../../utils/GlobalState";

function WalkerOrders({ orders=[] }) {

    return (
        <div className="walker-contact-container">
          <div className="walker-header">
            <h3>Welcome Walker!</h3>
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