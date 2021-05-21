import { useLazyQuery } from '@apollo/react-hooks';
import React, { Component } from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { Create, UrlField, DisabledInput, SimpleForm, TextInput } from 'react-admin';
import '../css/WalkerProfile.css';
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
//import React, { Component } from 'react';
//import AdminHeader from './components/AdminHeader';
//import SideBar from './components/SideBar';
//import Content from './components/AdminContent';

//class AdminPage extends Component {

//  render() {
//    return (
//      <div>
//        <AdminHeader />
//        <SideBar />
//        <Content />
//      </div>
//    );
//  }
//}



function AdminPage() {  
    return (
      <Admin dataProvider={dataProvider}>
        <Resource name="users" list={ListGuesser} />
      </Admin>
    );
}




export default AdminPage;