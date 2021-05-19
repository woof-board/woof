import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import { QUERY_WALKER_AVAILABILITY } from "../../utils/queries";
import { ADD_ORDER, UPDATE_ORDER } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";
// import { UPDATE_CURRENT_USER } from "../../utils/actions";
// import { cities, neighbourhoods } from '../../utils/helpers';


let bookDates = []
const today = new Date();
let newDate = new Date(today);
let newFormattedDate = "";

for (let i=1; i <=14; i++) {
    newDate.setDate(newDate.getDate() + 1);
    newFormattedDate = newDate.getFullYear() + "-"+ ('0'+(newDate.getMonth()+1)).slice(-2) + "-" + ('0'+(newDate.getDate())).slice(-2);
    bookDates.push(newFormattedDate);
}

const bookTimes = [
    "9am",
    "11am",
    "1pm",
    "3pm",
    "5pm",
    "7pm",
    "9pm"
];

function OwnerWalkDetails() {
    const [state, dispatch] = useStoreContext();
    const { currentUser } = state;

    const [checkWalkerAvailability, { called, loading, data: WalkerData }] = useLazyQuery(QUERY_WALKER_AVAILABILITY);
    const [addOrder, {error: addOrderError}] = useMutation(ADD_ORDER);
    const [updateOrder, {error: updateOrderError}] = useMutation(UPDATE_ORDER);
    const [showWalkerList, setShowWalkerList] = useState(false);
    const [formData, setFormData] = useState({date:bookDates[0], time: bookTimes[0] });
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        if(WalkerData) {
            setShowWalkerList(true);
        }
    }, [WalkerData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ 
            ...formData, 
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const {date, time} = formData;
        console.log("formData", formData);
        try {
            const { data } = await addOrder({
                variables: {
                    input: {
                        service_date: formData.date,
                        service_time: formData.time,
                        owner: currentUser._id
                    }
                }
            });
            setOrderId(data.addOrder._id);

            checkWalkerAvailability({
                variables: {
                    date,
                    time
                }
            });

        } catch(e) {
            console.log(e);
        }
    };

    const handleUpdateOrder = async (e) => {
        e.preventDefault();
        const walkerId = e.target.getAttribute("data-id");
        try {
            await updateOrder({
                variables:{
                    order_id: orderId,
                    input: {
                        walker: walkerId,
                        status: "PENDING_PROGRESS"
                    }
                }
            });

            alert("Order Updated with Walker Info!");
        }catch (e){
            console.log(e);
        }

    };

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
                    <select 
                        className="profile-input profile-name" 
                        id="book-date" 
                        name="date"
                        value={formData.date} 
                        onChange={handleInputChange}
                    >
                        <option value="choose" selected disabled>Pick a Date</option>
                        {
                        bookDates.map(bookDate => 
                            <option key={bookDate} value={bookDate}>{bookDate}</option>
                            )
                        }
                    </select>


                    <select 
                        className="profile-input profile-name" 
                        id="book-time" 
                        name="time"
                        value={formData.time} 
                        onChange={handleInputChange}
                    >
                        <option value="choose" selected disabled>Pick a Time</option>
                        {
                            bookTimes.map(bookTime => 
                                <option key={bookTime} value={bookTime}>{bookTime}</option>
                            )
                        }
                    </select>

                    <div className="row-data">
                    <input
                        className="profile-input"
                        type="number"
                        name="dog_number"
                        placeholder="#dogs"
                        onChange={handleInputChange}
                        value={formData.email}
                    />
                </div>
                </div>
                {/* {dogs.length > 1 &&
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
                </> */
                }

                <button
                    type="submit"
                    className="update-walker-button"
                    id="update-walker-profile-button"
                >
                    Place Order
                </button>
            </form>
             {
                 showWalkerList && 
                    <div 
                        // onSubmit={handleChangeOrderStatus}
                    >
                        Available Walker
                        {WalkerData?.checkWalkerAvailability.map((data) => 
                        <div>
                            <h5>Walker: {data.first_name} {data.last_name}</h5>
                            <h6>Rating: {data.average_rating}</h6>
                            <button data-id={data._id} onClick={handleUpdateOrder}>Select and confirm booking</button>
                        </div>)}
                    </div>
             }   
                

        </div>
        </>
    )
}

export default OwnerWalkDetails;