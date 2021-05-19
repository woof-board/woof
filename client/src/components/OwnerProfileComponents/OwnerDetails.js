import React, { useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
//import '../../css/OwnerProfile.css';
import { GET_CUSTOMER_SESSION_ID, CHARGE_OWNER } from '../../utils/queries';
import { UPDATE_OWNER_PROFILE } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../../utils/actions";
import { cities, neighbourhoods } from '../../utils/helpers';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51Ir7BPLlbUYQkEo2A2L6kb3YbdMv9jh8IJjshFAJOn3UXJEox2CDMpQoI8AS5HiTiccN6CzYnNbbCnaBJVgb8t08002TgJCE4p');

function OwnerDetails({ user }) {

    const [updateOwnerProfile, { error }] = useMutation(UPDATE_OWNER_PROFILE);
    const [state, dispatch] = useStoreContext();

    const [handleGetSessionId, {data:customer_data}] = useLazyQuery(GET_CUSTOMER_SESSION_ID,{
        onCompleted: (data) => {
          // some actions
          handleGettingInformation(data);
        }
      });
    
      const handleGettingInformation = async (data) => {
        // Call your backend to create the Checkout session.
        const sessionId = data.getCustomerSessionId.session_id;
        // When the customer clicks on the button, redirect them to Checkout.
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({sessionId});
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        if(error){
          console.log(error.message);
        }
      };
      
      useEffect(() => {
        const sessionId = customer_data?.getCustomerSessionId?.session;
        if (sessionId) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: sessionId });
          });
        }
      }, [customer_data]);

    const [formData, setFormData] = useState({ 
        first_name: '', 
        last_name: '', 
        email: '',
        address_city: ''
    });
    
    const amount = 3500; // in cents
    const [handleCharge] = useLazyQuery(CHARGE_OWNER, {
      variables: { 
        amount: amount,
        description: 'testing brian2'
       }
    });

    useEffect(() => {
        if (user) {
            const { first_name, last_name, email, address, status } = user;

            if(status === "PENDING_INFORMATION") {
                setFormData({
                    first_name,
                    last_name,
                    email,
                    address_city: address?.city
                })
            } else {
                setFormData({
                    first_name,
                    last_name,
                    email,
                    address_city: address?.city
                });
            }            
        }
    
    }, [user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ 
            ...formData, 
            [name]: value
        });
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // need to implement form validation here

        const { 
            first_name, 
            last_name,
            email,
            address_city,
            status,
            ...rest
         } = formData;

         try {
            const { data: { updateOwnerProfile: newProfile } } = await updateOwnerProfile({
                variables: {
                    input: {
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        status: "ACTIVE",
                        // ...rest,
                        address: {
                            city: address_city,
                            ...rest
                        },
                        ...rest
                    }
                }
            });
            
            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: newProfile
            });

            alert('Account Updated');
         } catch (e) {
             console.log(e);
         }

    }

    const provinces = [
        { displayName: 'Ontario', value: "ontario"},
        { displayName: 'Quebec', value: "quebec"},
        { displayName: 'New Foundland', value: "new-foundland"},
        { displayName: 'Nova Scotia', value: "nova-scotia"},
        { displayName: 'New Brunswick', value: "new-brunswick"},
        { displayName: 'Manitoba', value: "manitoba"},
        { displayName: 'Saskatchewan', value: "saskatchewan"},
        { displayName: 'Alberta', value: "alberta"},
        { displayName: 'British Columbia', value: "british-columbia"},
        { displayName: 'Prince Edward Island', value: "prince-edward-island"},
    ]

    return (
        <>
        <div className="walker-contact-container">
            <div className="walker-header"><h2>Personal Information</h2></div>
            <form
                className="walker-update-form"
                id="walker-update-form"
                onSubmit={handleFormSubmit}
            >
                <div className="row-data">
                    <input
                        className="profile-input profile-name"
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        onChange={handleInputChange}
                        value={formData.first_name}
                    />
                    <input
                        className="profile-input profile-name"
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        onChange={handleInputChange}
                        value={formData.last_name}
                    />
                </div>
                <div className="row-data">
                    <input
                        className="profile-input"
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        value={formData.email}
                    />
                </div>
                <div><h4>City</h4></div>
                <div className="row-data">
                    <select className="profile-input profile-name" id="walker-cities" name="address_city" onChange={handleInputChange}>
                        {formData.address_city ==="" 
                            ? <option value="choose" selected disabled>Choose your City</option>
                            : <option value="choose" disabled>Choose your City</option>
                        }
                        
                        {
                        cities.map(({name, group}) => 
                            (group 
                                ? <optgroup label={name} ></optgroup>
                                // ? city.name!=="close" 
                                //     ? <optgroup label={city}>
                                //     : </optgroup>
                                : name === formData.address_city
                                    ? <option selected value={name} >{name}</option>
                                    : <option value={name} >  {name}</option>
                            )
                        )
                        }
                    </select>
                {formData.address_city === "toronto" &&
                    <select className="profile-input profile-name" id="walker-province" name="walker-province">
                        <option value="choose" disabled>Choose your neighbourhood</option>
                        {
                            neighbourhoods.map( neighbourhood =>
                                neighbourhood === formData.address_neighbourhood
                                    ? <option selected="selected" value={neighbourhood}>{neighbourhood}</option>
                                    : <option value={neighbourhood}>{neighbourhood}</option>
                            )
                        }
                    </select>
                    
                }
                </div>
             
                <button
                    type="submit"
                    className="update-walker-button"
                    id="update-owner-profile-button"
                >
                    UPDATE PROFILE
                </button>
                <button
                    type="button"
                    role="link" 
                    className="update-walker-button"
                    id="update-owner-Credit-Info-button"
                    onClick={handleGetSessionId}
                >
                    UPDATE CHARGING INFORMATION
                </button>
                <button
                    type="button"
                    role="link" 
                    className="update-walker-button"
                    id="update-owner-charging-button"
                    onClick={handleCharge}
                >
                    CHARGE
                </button>
            </form>
        </div>
        </>
    )
}

export default OwnerDetails;