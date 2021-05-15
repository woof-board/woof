import React from 'react';
import Jumbotron from '../components/Jumbotron';


function Success() {
  
  setTimeout(function(){ window.location.assign('/'); }, 3000);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>
          Your charging information is received!
        </h2>
        <h2>
          You will now be redirected to your profile 
        </h2>
      </Jumbotron>
    </div>
  );
};

export default Success;
