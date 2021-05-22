
import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import { UserList } from '../components/Admin/list';
import { UserEdit } from '../components/Admin/edit';
import { UserCreate } from '../components/Admin/create';


import '../css/WalkerProfile.css';
import { useLazyQuery } from '@apollo/react-hooks';
import WalkerDetails from '../components/WalkerProfileComponents/WalkerDetails';
import WalkerReviews from '../components/WalkerProfileComponents/WalkerReviews';
import WalkerOrders from '../components/WalkerProfileComponents/WalkerOrders';
import WalkerEarnings from '../components/WalkerProfileComponents/WalkerEarnings';

import WalkerAvgRating from '../components/WalkerProfileComponents/WalkerAvgRating';

import OwnerDetails from '../components/OwnerProfile/OwnerDetails';
import jsonServerProvider from "ra-data-json-server";

//const dataProvider = {WalkerDetails, WalkerReviews, WalkerOrders, WalkerEarnings, WalkerAvgRating, OwnerDetails};
const dataProvider =
  jsonServerProvider("https://jsonplaceholder.typicode.com");





function AdminPage() {  
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
    </Admin>
    );
  }





export default AdminPage;