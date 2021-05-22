import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Redirect } from 'react-router';
import StarRatings from 'react-star-ratings';

import ModalDisplay from '../ModalDisplay';
import { QUERY_WALKER_AVAILABILITY, QUERY_OWNER_ME } from "../../utils/queries";
import { ADD_ORDER, UPDATE_ORDER } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../../utils/actions";
import { formatDate, addDays } from '../../utils/helpers';
import "react-datepicker/dist/react-datepicker.css";
import { RatingIconSVG } from '../../utils/helpers'
import { idbPromise } from "../../utils/helpers";

// for react-select
const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    })
};

const bookTimes = [ "9am", "11am", "1pm", "3pm", "5pm", "7pm", "9pm" ];

function OwnerWalkDetails() {
    const [state, dispatch] = useStoreContext();
    const { currentUser } = state;
    const [getProfile, { data: profileData }] = useLazyQuery(QUERY_OWNER_ME, {
        fetchPolicy: 'network-only'
    });
    
    const [checkWalkerAvailability, { called, loading, data: walkerData }] = useLazyQuery(QUERY_WALKER_AVAILABILITY, {
        fetchPolicy: "no-cache"
    });
    const [addOrder, {error: addOrderError}] = useMutation(ADD_ORDER);
    const [updateOrder, {error: updateOrderError}] = useMutation(UPDATE_ORDER);
    
    const [showWalkerList, setShowWalkerList] = useState(false);
    const [modalJSX, setModalJSX] = useState(<div />);
    const [modalOpen, setModalOpen] = useState();
    const [formData, setFormData] = useState({
        date: formatDate(new Date()), 
        time: bookTimes[0],
        dogIdList: [],
        dogListOptions: [] 
    });
    const [orderId, setOrderId] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [redirect, setRedirect ] = useState(false);

    useEffect(() => {
        if (!currentUser && !profileData) {
            getProfile();
        } 
        // retrieved from server
        else if (!currentUser && profileData) {
            console.log("profileData",profileData)
            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: { ...profileData.ownerMe}
            });
            idbPromise('user', 'put', profileData.ownerMe);
        }
    }, [currentUser, profileData, dispatch]);

    useEffect(() => {
        if(walkerData) {
            setShowWalkerList(true);
        }
    }, [walkerData]);

    useEffect(() => {
        if(currentUser) {
            const dogIds = currentUser.dogs.map(dog => dog._id);
            const dogOptions = currentUser.dogs.map(dog => ({ value: dog._id, label: dog.name }));
            
            setFormData({
                ...formData,
                dogIdList: dogIds,
                dogListOptions: dogOptions
            });
        }
    }, [currentUser]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ 
            ...formData, 
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const {date, time, dogIdList } = formData;
        console.log("formData", formData);
        if (dogIdList.length < 1) {
            setModalJSX(
                <div>
                    <h6>Please select at least one dog!</h6>
                    <button type="button" onClick={() => setModalOpen(false)}>Close</button>
                </div>
            );
            setModalOpen(true);
            return;
        }

        try {
            // const { data } = await addOrder({
            //     variables: {
            //         input: {
            //             service_date: formData.date,
            //             service_time: formData.time,
            //             owner: currentUser._id,
            //             dogs: formData.dogIdList
            //         }
            //     }
            // });
            // setOrderId(data.addOrder._id);

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

    const handleAddOrder = async (e) => {
        e.preventDefault();
        const walkerId = e.target.getAttribute("data-id");
        try {
            // await updateOrder({
            //     variables:{
            //         order_id: orderId,
            //         input: {
            //             walker: walkerId,
            //             status: "PENDING_PROGRESS"
            //         }
            //     }
            // });

            const { data } = await addOrder({
                variables: {
                    input: {
                        service_date: formData.date,
                        service_time: formData.time,
                        owner: currentUser._id,
                        walker: walkerId,
                        dogs: formData.dogIdList,
                        status: "PENDING_PROGRESS"
                    }
                }
            });


            setModalJSX(
                <div>
                    <h6>Your order is booked with the selected walker!</h6>
                    <button type="button" onClick={() => {
                        setModalOpen(false);
                        setRedirect(true);
                        }}>Close</button>
                </div>
            );
            setModalOpen(true);
        }catch (e){
            console.log(e);
        }
    };
    
    const handleChangeDogSelect = (selectedOption) => {
        const selectedDogIds = selectedOption.map(option => option.value);
        setFormData({
            ...formData,
            dogIdList: [...selectedDogIds]
        });
    };

    const closeModal = () => {
        setModalJSX(<div />);
        setModalOpen(true);
    };


    return (
        
        <div id="owners">
            <div className="headline">            
                <h1>Book a walk</h1>
            </div>
            
        <div className="walker-contact-container">
            
            <div className="walker-header"><h2>Walk Details</h2></div>
            <form
                className="walker-update-form"
                id="book-walk-form"
                onSubmit={handleFormSubmit}
            >
                <h4>Pick date and time</h4>
                <div className="row-data">
                    <DatePicker 
                        className="profile-input profile-name date-picker" 
                        id="book-date" 
                        name="date"
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        maxDate={addDays(new Date(), 13)}
                        selected={startDate} 
                        onChange={date => {
                            setStartDate(date);
                            const formattedDate = formatDate(date);
                            setFormData({ 
                                ...formData, 
                                date: formattedDate
                            });
                        }}
                    />

                    <select 
                        className=" profile-name time-picker" 
                        id="book-time" 
                        name="time"
                        value={formData.time} 
                        onChange={handleInputChange}
                    >
                        {
                            bookTimes.map(bookTime => 
                                <option key={bookTime} value={bookTime}>{bookTime}</option>
                            )
                        }
                    </select>
                    </div>
                        <h4>Which dogs are going on the walk?</h4>
                        <div className="row-data">  
                        <Select 
                            customStyles={customStyles}
                            className="profile-input profile-name" 
                            options={formData.dogListOptions}
                            isMulti={true}
                            onChange={handleChangeDogSelect}
                            value={formData.dogListOptions}
                        />
                        </div>
                <button
                    type="submit"
                    className="update-walker-button"
                    id="update-walker-profile-button"
                >
                    Book Walk
                </button>
            </form>
             {
                 showWalkerList && 
                    <div className="walker-list-container"
                    >
                        {(!loading && (walkerData?.checkWalkerAvailability === undefined || walkerData.checkWalkerAvailability.length == 0)) 
                        ? <div> Sorry, no walker available at your selected time </div>
                        : (
                            <>

                                <h4> Available Walkers</h4>
                                { walkerData?.checkWalkerAvailability.map((data) => 
                                <div className = "walker-container">
                                    <img src={'https://res.cloudinary.com/w-oo-f/image/upload/v1/' + data.avatar} width="85" />
                                    <h5>Walker: <span className="regText">{data.first_name} {data.last_name}</span></h5>
                                    <h6>Rating: <span className="regText">{data.average_rating > 0
                                                ? <>
                                                <StarRatings
                                                    rating= {data.average_rating}
                                                    starDimension="18px"
                                                    starSpacing="3px"
                                                    starRatedColor="#254e9b"
                                                    starEmptyColor="#98b4e7"
                                                    svgIconViewBox={RatingIconSVG.box}
                                                    svgIconPath={RatingIconSVG.coords}
                                                />&nbsp;<span className="light">({data.average_rating.toFixed(1)})</span>
                                                </>
                                                 
                                                : "This walker has not been rated yet."
                                                }</span></h6>
                                    {data.reviews[0] && <h6>Reviews</h6>}
                                    {data.reviews.map(review =>
                                        <>
                                        

                                        <div><StarRatings
                                            rating= {review.rating}
                                            starDimension="12px"
                                            starSpacing="2px"
                                            starRatedColor="#254e9b"
                                            starEmptyColor="#98b4e7"
                                            svgIconViewBox={RatingIconSVG.box}
                                            svgIconPath={RatingIconSVG.coords}
                                        /> {review.review_text}</div> 
                                        </>
                                    )}
                                    <div className="button-container">
                                        <button data-id={data._id} onClick={handleAddOrder}>Select and confirm booking</button>
                                    </div>
                                </div>
                                )}
                            </>
                            )
                        }
                    </div>
             }   
                
                <ModalDisplay component={modalJSX} isOpen={modalOpen} closeModal={closeModal}/>
                { redirect && <Redirect to="/ownerprofile" />}
        </div>
        </div>
    )
}

export default OwnerWalkDetails;