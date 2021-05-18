import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { Admin, Resource } from 'react-admin';

import '../css/WalkerProfile.css';
import Auth from '../utils/auth';
import WalkerDetails from '../components/WalkerProfileComponents/WalkerDetails';
import WalkerReviews from '../components/WalkerProfileComponents/WalkerReviews';
import WalkerOrders from '../components/WalkerProfileComponents/WalkerOrders';
import WalkerEarnings from '../components/WalkerProfileComponents/WalkerEarnings';
import WalkerPasswordForm from '../components/WalkerProfileComponents/WalkerPasswordForm';
import WalkerAvgRating from '../components/WalkerProfileComponents/WalkerAvgRating';
import { QUERY_WALKER_ME } from '../utils/queries';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../utils/actions";
import OwnerDetails from '../components/OwnerProfile/OwnerDetails';
import StarRatingComponent from 'react-star-rating-component'; 
 
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_OWNER_ME } from '../utils/queries';
import { UPDATE_CURRENT_USER } from "../utils/actions";

function AdminPage() {  
    render() 
    return (
      <Admin dataProvider={WalkerDetails, WalkerReviews, WalkerOrders, WalkerEarnings, WalkerAvgRating, OwnerDetails} />
    );
}




export default AdminPage;