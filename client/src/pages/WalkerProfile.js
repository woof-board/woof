import React, { useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import '../css/Profile.css'
// import Auth from '../utils/auth';
import WalkerDetails from '../components/WalkerProfileComponents/WalkerDetails';
import WalkerReviews from '../components/WalkerProfileComponents/WalkerReviews';
import WalkerOrders from '../components/WalkerProfileComponents/WalkerOrders';
import WalkerEarnings from '../components/WalkerProfileComponents/WalkerEarnings';
import WalkerPasswordForm from '../components/WalkerProfileComponents/WalkerPasswordForm';
import WalkerAvgRating from '../components/WalkerProfileComponents/WalkerAvgRating';
import { QUERY_WALKER_ME } from '../utils/queries';
import { UPDATE_WALKER_AVATAR } from '../utils/mutations';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../utils/actions";
import { openUploadWidget } from '../utils/CloudinaryService';

function WalkerProfile() {
    const [state, dispatch] = useStoreContext();
    const [getWalkerProfile, { called, loading, data }] = useLazyQuery(QUERY_WALKER_ME);
    const [updateWalkerAvatar] = useMutation(UPDATE_WALKER_AVATAR);
    // const { loading, data } = useQuery(QUERY_WALKER_ME);
    const { currentUser } = state;

    useEffect(() => {
        // if not already in global store
        if (!currentUser && !data) {
            getWalkerProfile(); // get profile from database
        } 
        // retrieved from server
        else if (!currentUser && data) {
            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: data.walkerMe
            });
        }
        // get cache from idb
        // else if (!loading) {
        //     idbPromise('products', 'get').then((indexedProducts) => {
        //     dispatch({
        //         type: UPDATE_PRODUCTS,
        //         products: indexedProducts
        //     });
        //     });
        // }
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
            updateWalkerAvatar({
              variables:{
                avatar: info.public_id
              }
            })
            .then(newOwner => {
              dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: newOwner.data.updateWalkerAvatar
              });
            });
  
          }
        } else {
          console.log(error);
        }
      });
    }

  return (
    <div id="walkers">
      <h1>My Profile</h1>
      <div className='page-wrap'>
      
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
        {currentUser && currentUser.status === "ACTIVE" && 
          <div className="walker-picture-container">
            <img src={'https://res.cloudinary.com/w-oo-f/image/upload/v1/' + currentUser.avatar} width="160" alt="profile-img"/>
            <div>
                <button className="upload_button" onClick={uploadImageWithCloudinary}>Upload</button>
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
            {currentUser && currentUser.status === "PENDING_APPROVAL" && 
              <div className="walker-contact-container">
                <div className="walker-header">
                  <h2>Current account status</h2>
                </div>
                <div className="account-status">
                  PENDING APPROVAL
                </div>
              </div>
            }
            {currentUser && currentUser.status === "ACTIVE" && 
                <WalkerOrders orders={currentUser.orders}/>
            }
            <WalkerDetails user={currentUser}/>
            <WalkerPasswordForm />
            {currentUser && currentUser.status === "ACTIVE" && 
              <>
                <WalkerAvgRating average_rating={currentUser.average_rating}/>
                <WalkerReviews reviews={currentUser.reviews} />
                
                <WalkerEarnings earnings={currentUser.earnings}/>
              </>
            }
          </div>
        </>
    </div>
    </div>
  );
}

export default WalkerProfile;


