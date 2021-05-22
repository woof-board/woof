
import React, { Component, useEffect } from 'react';
//import { Admin, Resource } from 'react-admin';
import { useQuery } from '@apollo/react-hooks';
////import { UserList } from '../components/Admin/list';
//import { UserEdit } from '../components/Admin/edit';
//import { UserCreate } from '../components/Admin/create';
import { QUERY_PENDING_WALKERS } from '../utils/queries';


import '../css/WalkerProfile.css';

//import jsonServerProvider from "ra-data-json-server";

//const dataProvider = {WalkerDetails, WalkerReviews, WalkerOrders, WalkerEarnings, WalkerAvgRating, OwnerDetails};
//const dataProvider =

//jsonServerProvider("https://jsonplaceholder.typicode.com");





function AdminPage() {  


  const {data, loading} = useQuery(QUERY_PENDING_WALKERS);


  
  useEffect(() => {
    // if not already in global store
    if (data) {
        console.log(data); // get profile from database
    } 


}, [ data]);


  return (
    <div className="walker-contact-container">
    <div className="walker-header">
      <h2>Admin</h2>
    </div>
    <div className="account-status">
        Test
    </div>
  </div>
  )
};






export default AdminPage;