import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { Admin, Resource } from 'react-admin';
import { Create, UrlField, DisabledInput, SimpleForm, TextInput } from 'react-admin';
import '../css/WalkerProfile.css';
import WalkerDetails from '../components/WalkerProfileComponents/WalkerDetails';
import WalkerReviews from '../components/WalkerProfileComponents/WalkerReviews';
import WalkerOrders from '../components/WalkerProfileComponents/WalkerOrders';
import WalkerEarnings from '../components/WalkerProfileComponents/WalkerEarnings';

import WalkerAvgRating from '../components/WalkerProfileComponents/WalkerAvgRating';

import OwnerDetails from '../components/OwnerProfile/OwnerDetails';


const dataProvider = {WalkerDetails, WalkerReviews, WalkerOrders, WalkerEarnings, WalkerAvgRating, OwnerDetails};



function AdminPage() {  
    return (
      <Admin dataProvider={dataProvider}/>

    );
}




export default AdminPage;