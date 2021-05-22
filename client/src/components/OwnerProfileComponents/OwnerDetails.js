import React, { useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { GET_CUSTOMER_SESSION_ID, CHARGE_OWNER } from '../../utils/queries';
import { UPDATE_OWNER_PROFILE } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../../utils/actions";
import { cities, neighbourhoods, validateInput } from '../../utils/helpers';
import { loadStripe } from '@stripe/stripe-js';
import ModalDisplay from '../ModalDisplay';
const stripePromise = loadStripe('pk_test_51Ir7BPLlbUYQkEo2A2L6kb3YbdMv9jh8IJjshFAJOn3UXJEox2CDMpQoI8AS5HiTiccN6CzYnNbbCnaBJVgb8t08002TgJCE4p');

function OwnerDetails({ user }) {

    const [updateOwnerProfile, { error }] = useMutation(UPDATE_OWNER_PROFILE);
    const [state, dispatch] = useStoreContext();
    const [modalJSX, setModalJSX] = useState(<div />);
    const [modalOpen, setModalOpen] = useState();
    const [formData, setFormData] = useState({ 
        first_name: '', 
        last_name: '', 
        email: '',
        address_street: "",
        address_city: "",
        address_neighbourhood: "",
        address_postal_code: "",
    });

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

    
    
    // const amount = 3500; // in cents
    // const [handleCharge, { called, loading: charging, data }] = useLazyQuery(CHARGE_OWNER, {
    //   variables: { 
    //     amount: amount,
    //     description: 'testing brian2'
    //    }
    // });

    useEffect(() => {
        if (user) {
            const { first_name, last_name, email, address } = user;
            setFormData({
                first_name,
                last_name,
                email,
                address_street: address?.street,
                address_city: address?.city,
                address_neighbourhood: address?.neighbourhood,
                address_postal_code: address?.postal_code
            });
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
        console.log("asdadasdadsadsassdasd");
        e.preventDefault();

        const { 
            first_name, 
            last_name,
            email,
            address_street,
            address_city,
            address_neighbourhood,
            address_postal_code
         } = formData;

         // Validation
         const errors = validateInput([
            {input_title: 'First Name', input_val: first_name, criteria: ['required']},
            {input_title: 'Last Name', input_val: last_name, criteria: ['required']},
            {input_title: 'Email', input_val: email, criteria: ['required','email']},
            {input_title: 'Street Name', input_val: address_street, criteria: ['required']},
            {input_title: 'City', input_val: address_city, criteria: ['required']},
            {input_title: 'Postal Code', input_val: address_postal_code, criteria: ['required']}
        ]);
         
         if (errors.length > 0) {
             setModalJSX(
                <div>
                    {errors.map((error, index) => <p key={index}>{error}</p>)}
                </div>
            );
             setModalOpen(true);
             return;
         }

         try {
            const { data: { updateOwnerProfile: newProfile } } = await updateOwnerProfile({
                variables: {
                    input: {
                        first_name,
                        last_name,
                        email,
                        status: "ACTIVE",
                        address: {
                            street: address_street,
                            city: address_city,
                            neighbourhood: address_city === "Toronto" ? address_neighbourhood : address_city,
                            postal_code: address_postal_code
                        }
                    }
                }
            });
            
            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: newProfile
            });

            setModalJSX(<div>Profile has been updated successfully!</div>);
            setModalOpen(true);
         } catch (e) {
             console.log(e);
         }
    };

    const closeModal = () => {
        setModalJSX(<div />);
        setModalOpen(false);
    };

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
                <div><h4>Address</h4></div>
                <div className="row-data">
                    <input
                        className="profile-input street-input"
                        type="text"
                        name="address_street"
                        placeholder="Street"
                        onChange={handleInputChange}
                        value={formData.address_street}
                    />
                </div>
                <div className="row-data">
                    <select 
                        className="profile-input profile-name" 
                        id="address_city" 
                        name="address_city"
                        value={formData.address_city} 
                        onChange={handleInputChange}
                        placeholder="Choose your City"
                    >
                        {/* {formData.city ==="" 
                            ? <option value="choose" selected disabled>Choose your City</option>
                            : <option value="choose" disabled>Choose your City</option>
                        } */}
                        
                        {
                        cities?.map(({name, group}, index) => 
                            (group 
                                ? <optgroup key={index} label={name}></optgroup>
                                : <option key={index} value={name}>{name}</option>
                            )
                        )
                        }
                    </select>
                 {formData.address_city === "Toronto" &&
                    <select 
                        className="profile-input profile-name" 
                        id="address_neighbourhood" 
                        name="address_neighbourhood"
                        value={formData.address_neighbourhood}
                        onChange={handleInputChange}
                    >
                        <option value="choose" disabled>Choose your neighbourhood</option>
                        {
                            neighbourhoods.map( (neighbourhood, index) =>
                            <option key={index} value={neighbourhood}>{neighbourhood}</option>
                            )
                        }
                    </select> 
                    
                }
                </div>
                <div className="row-data">
                
                    <input
                        className="profile-input"
                        type="text"
                        name="address_postal_code"
                        placeholder="Postal Code"
                        onChange={handleInputChange}
                        value={formData.address_postal_code}
                    />
                </div>
                <div className="button-container">
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
                        className="update-walker-button right-button"
                        id="update-owner-Credit-Info-button"
                        onClick={handleGetSessionId}
                    >
                        UPDATE PAYMENT INFORMATION
                    </button>
                </div>
                {/* {!charging ?
                <button
                    type="button"
                    role="link" 
                    className="update-walker-button"
                    id="update-owner-charging-button"
                    onClick={handleCharge}
                >
                     CHARGE
                </button>
                :
                <button
                    type="button"
                    role="link" 
                    className="update-walker-button"
                    id="update-owner-charging-button"
                >
                     CHARGING
                </button>} */}
                
            </form>
            <ModalDisplay component={modalJSX} isOpen={modalOpen} closeModal={closeModal}/>
        </div>
        </>
    )
}

export default OwnerDetails;