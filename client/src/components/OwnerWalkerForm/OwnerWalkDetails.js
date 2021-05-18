import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { QUERY_WALKER_ORDERS } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../../utils/actions";
import { cities, neighbourhoods } from '../../utils/helpers';

const bookDates = []
const today = new Date();
let newDate = new Date(today);
let newFormattedDate = "";
for (let i=1; i <=14; i++) {
    newDate.setDate(newDate.getDate() + 1);
    newFormattedDate = ('0'+(newDate.getMonth()+1)).slice(-2) + "-" + ('0'+(newDate.getDate())).slice(-2) + "-" + newDate.getFullYear();
    bookDates.push(newFormattedDate);
}

function OwnerWalkDetails({data}) {
    const dogs = data.dogs;
    const ownerId = data._id;


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log(event);

        


        
    };

    

    const bookTimes = [
        "9am",
        "11am",
        "1pm",
        "3pm",
        "5pm",
        "7pm",
        "9pm"
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
                            <option key={bookDate} value={bookDate}>{bookDate}</option>
                            )
                        }
                    </select>


                    <select className="profile-input profile-name" id="book-time" name="book-time">
                        <option value="choose" selected disabled>Pick a Time</option>
                        {
                            bookTimes.map(bookTime => 
                                <option key={bookTime} value={bookTime}>{bookTime}</option>
                            )
                        }
                    </select>

                </div>
                {dogs.length > 1 &&
                <>
                <h3>Which dogs need a walk?</h3>
                <div className="row-data">
                    {
                    dogs.map(dog =>
                        <>
                            <input type="checkbox" key={dog._id} id={dog._id} name={dog.name} value={dog.name} defaultChecked />
                            <label key={dog._id+"1"} htmlFor={dog._id}>{dog.name}</label>
                        </>
                    )}
                </div>
                </>
                }

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