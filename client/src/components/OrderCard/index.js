import React from 'react';

const OrderCard = ({orderItem}) => {
    const {
        service_date,
        service_time,
        owner: { first_name: ownerFirstName, last_name: ownerLastName},
        walker: { first_name: walkerFirstName, last_name: walkerLastName},
        dogs
    } = orderItem;
    
    return (
        <div className="walks">
            <div>
                <div><span className="medium-text">Walk Date:</span> {service_date}</div>
                <div><span className="medium-text">Start time:</span> {service_time}</div>
                <div><span className="medium-text">Dog Owner:</span> {`${ownerFirstName} ${ownerLastName}`} </div>
                <div><span className="medium-text">Dog Walker:</span> {`${walkerFirstName} ${walkerLastName}`} </div>
            </div>
        </div>
    );
}

export default OrderCard;