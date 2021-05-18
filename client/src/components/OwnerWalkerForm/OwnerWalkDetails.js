import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_WALKER_PROFILE } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../../utils/actions";
import { cities, neighbourhoods } from '../../utils/helpers';

function OwnerWalkDetails({data}) {
    console.log(data);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // need to implement form validation here
        


         try {
            // const { data: { updateWalkerProfile: newProfile } } = await updateWalkerProfile({
            //     variables: {
            //         input: {
            //             ...rest,
            //             address: {
            //                 street: address_street,
            //                 city: address_city,
            //                 neighbourhood: address_neighbourhood,
            //                 province: address_province,
            //                 postal_code: address_postal_code,
            //             }
            //         }
            //     }
            // });
            
            // dispatch({
            //     type: UPDATE_CURRENT_USER,
            //     currentUser: newProfile
            // });

            alert('Account Updated');
         } catch (e) {
             console.log(e);
         }
    };


    const bookDates = [
        "05-17-2021",
        "05-18-2021",
        "05-19-2021",
        "05-20-2021",
        "05-21-2021",
        "05-22-2021",
        "05-23-2021",
        "05-24-2021",
        "05-25-2021",
        "05-26-2021",
        "05-27-2021",
        "05-28-2021",
        "05-29-2021",
        "05-30-2021"
    ]
    const bookTimes = [
        "9am",
        "11am",
        "1pm",
        "3pm",
        "5pm",
        "7pm",
        "9pm"
    ]
    const dogs = [
        "Pixel",
        "Pudding",
        "Samson"

    ]

    return (
        <>
        <div className="walker-contact-container">
            <div className="walker-header"><h2>Walk Details</h2></div>
            <form
                className="walker-update-form"
                id="book-walk-form"
                onSubmit={handleFormSubmit}
            >
                <div className="row-data">
                    <select className="profile-input profile-name" id="book-date" name="book-date">
                        <option value="choose" selected disabled>Pick a Date</option>
                        {
                        bookDates.map(bookDate => 
                            <option value={bookDate}>{bookDate}</option>
                            )
                        }
                    </select>


                    <select className="profile-input profile-name" id="book-time" name="book-time">
                        <option value="choose" selected disabled>Pick a Time</option>
                        {
                            bookTimes.map(bookTime => 
                                <option value={bookTime}>{bookTime}</option>
                            )
                        }
                    </select>

                </div>
                <h3>Which dogs need a walk?</h3>
                <div className="row-data">
                    {
                    data.ownerMe.dogs.map(dog =>
                        <>
                            <input type="checkbox" id={dog._id} name={dog.name} value={dog.name} checked />
                            <label for={dog._id}>{dog.name}</label>
                        </>
                    )}
                </div>

                <button
                    type="submit"
                    className="update-walker-button"
                    id="update-walker-profile-button"
                >
                    BOOK YOUR WALK
                </button>
            </form>
        </div>
        </>
    )
}

export default OwnerWalkDetails;