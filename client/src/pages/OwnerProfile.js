import React, { useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';

import '../css/Profile.css';
import OwnerDetails from '../components/OwnerProfileComponents/OwnerDetails';
import OwnerPetDetails from '../components/OwnerProfileComponents/OwnerPetDetails';
import OwnerPasswordForm from '../components/OwnerProfileComponents/OwnerPasswordForm';
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_OWNER_ME } from '../utils/queries';
import { UPDATE_OWNER_AVATAR } from '../utils/mutations';
import { UPDATE_CURRENT_USER } from "../utils/actions";
import { Link } from 'react-router-dom';
import { openUploadWidget } from '../utils/CloudinaryService';
import OwnerReviews from '../components/OwnerProfileComponents/OwnerReviews';

function OwnerProfile() {
  const [state, dispatch] = useStoreContext();
  const { currentUser } = state;

  const [getOwnerProfile, { loading, data }] = useLazyQuery(QUERY_OWNER_ME);
  const [updateOwnerAvatar] = useMutation(UPDATE_OWNER_AVATAR);

  useEffect(() => {
    // if not already in global store
    if (!currentUser && !data) {
      getOwnerProfile(); // get profile from database
    }
    // retrieved from server
    else if (!currentUser && data) {
      dispatch({
        type: UPDATE_CURRENT_USER,
        currentUser: data.ownerMe
      });
    }
    // eslint-disable-next-line
  }, [currentUser, data, loading, dispatch]);

  const uploadImageWithCloudinary = async () => {
    const uploadOptions = {
      cloud_name: 'w-oo-f',
      upload_preset: 'iqgryfiq' //Create an unsigned upload preset and update this
    };

    openUploadWidget(uploadOptions, (error, result) => {
      if (!error) {
        const {event, info} = result;
        if (event === "success") {
          updateOwnerAvatar({
            variables:{
              avatar: info.public_id
            }
          })
          .then(newOwner => {
            dispatch({
              type: UPDATE_CURRENT_USER,
              currentUser: newOwner.data.updateOwnerAvatar
            });
          });

        }
      } else {
        console.log(error);
      }
    });
  }

  return (
    <div id="owners">
      <h1>My Profile</h1>
      <div className="page-wrap">
        {currentUser && currentUser.status === "SUSPENDED" &&
          <>
            <div className="walker-contact-container">
              <div className="walker-header">
                <h2>Current account status</h2>
              </div>
              <div className="account-status">
                ACCOUNT SUSPENDED
            </div>
            </div>
          </>
        }
        <>
          {currentUser &&
            <div className="walker-picture-container">
              <img src={'https://res.cloudinary.com/w-oo-f/image/upload/v1/' + currentUser.avatar} alt={`${currentUser.first_name} ${currentUser.last_name}`}  />
              <div>
                <button className="upload-button" onClick={uploadImageWithCloudinary}>Update your picture</button>
              </div>
            </div>
          }
          <div className="walker-details-container">
            {currentUser && currentUser.status === "PENDING_INFORMATION" &&
              <div className="walker-contact-container">
                <div className="walker-header">
                  <h2>Current account status</h2>
                </div>
                <div className="account-status">
                  COMPLETE ALL FORMS FOR APPROVAL
                </div>
              </div>
            }
            {currentUser && currentUser.status === "ACTIVE" &&
              <div className="walker-contact-container">
                <div className="walker-header">
                  <h2>Welcome {currentUser.first_name}!</h2>
                </div>

              <div className="button-container">
                <Link to="/bookwalk"><button>Book a walk</button></Link>
                <Link to="/ownertrackorder"><button>My Walks</button></Link>
                <Link to={"/ownerlivemap"}><button>View Tracker</button></Link>
              </div>
              </div>
            }
            <OwnerDetails user={currentUser} />
            <OwnerPasswordForm />
            <OwnerPetDetails user={currentUser} />
            {
                currentUser && currentUser.status === "ACTIVE" &&
                <OwnerReviews user={currentUser}/>
            }
          </div>
        </>
      </div>
    </div>
  );
}

export default OwnerProfile;


