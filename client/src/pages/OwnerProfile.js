import React from 'react';
import '../css/OwnerProfile.css';



function OwnerProfile() {
    return (
        <>
        <div className="w3-content w3-margin-top" style={{maxWidth: "1400px"}}>
             <div className="w3-row-padding">

                <div className="w3-third">

                    <div className="w3-white w3-text-grey w3-card-4">
                        <div className="w3-display-container">
                        {/* <img src="./benspicture.JPG" style="width:100%" alt="Avatar"> */}
                            <div className="w3-display-bottomleft w3-container w3-text-black">
                                <h2>Benn Asabir</h2>
                            </div>

                        </div>
                    </div>

                </div>


                <div className="w3-twothird">
                    <div className="w3-container w3-card w3-white w3-margin-bottom">

                        <h2 className="w3-padding-16"><i className="w3-margin-right w3-xxlarge"></i>My Profile</h2>

                        <div className="w3-container">
                            <h5 className="w3-opacity"><b>Full Name</b></h5>
                            <p>Cure Insta</p>
                            <hr></hr>
                        </div>

                        <div className="w3-container">
                            <h5 className="w3-opacity"><b>Email</b></h5>
                            <p>Benny555@gmail.com</p>
                            <hr></hr>
                        </div>

                        <div className="w3-container">
                            <h5 className="w3-opacity"><b>Number</b></h5>
                            <p>555 5555 5555</p>
                            <hr></hr>
                        </div>

                        <div className="w3-container">
                            <h5 className="w3-opacity"><b>Address</b></h5>
                            <p>555 Queensway Drive, Etobicoke, ON, L5M6Y7</p>
                            <hr></hr>
                        </div>
  
                    </div>
                </div>


                <div className="w3-container w3-card w3-white">

                    <h2 className="w3-padding-16">My Dog/s</h2>

                    <div className="w3-container">
                        {/* <img src="./home-samson.jpg" alt="" height="200"> */}
                    </div>

                    <div className="w3-container">
                        <h5 className="w3-opacity"><b>Dog Name</b></h5>
                        <p>Samson</p>
                        <hr></hr>
                    </div>

                    <div className="w3-container">
                        <h5 className="w3-opacity"><b>Dog Age</b></h5>
                        <p>4</p>
                        <hr></hr>
                    </div>

                    <div className="w3-container">
                        <h5 className="w3-opacity"><b>Dog Weight</b></h5>
                        <p>...</p>
                        <hr></hr>
                    </div>

                </div>

                
             </div>
        </div>
        </>
    )
}

export default OwnerProfile;