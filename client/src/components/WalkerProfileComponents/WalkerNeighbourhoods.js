import React from 'react';

function WalkerNeighbourhoods({ neighbourhoods }) {

    return (
        <div className="walker-profile-container">
          <div>
            My Neighbourhoods
          </div>
          <input 
            className="profile-input" 
            defaultValue={neighbourhoods} 
            placeholder={neighbourhoods} 
            />
        </div>
    )
}

export default WalkerNeighbourhoods;