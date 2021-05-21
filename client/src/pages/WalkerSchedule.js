import React, { useState, useEffect, useContext } from 'react';
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks';
import { UPDATE_WALKER_AVAILABILITY } from "../utils/mutations";
import { QUERY_WALKER_ORDERS, QUERY_WALKER_ME } from "../utils/queries";
import { createInitialState } from "../utils/helpers";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../utils/actions";
import ModalDisplay from '../components/ModalDisplay';
import { idbPromise } from "../utils/helpers";
import '../css/Walkers.css';

function WalkerSchedule() {
    const [state, dispatch] = useStoreContext();
    const { currentUser } = state;
    const [updateWalkerAvailability, { error }] = useMutation(UPDATE_WALKER_AVAILABILITY);
    const [getWalkerProfile, { called, loading, data }] = useLazyQuery(QUERY_WALKER_ME);
    const [ getWalkerOrders, { loading: orderDataLoading, data: walkerOrderData } ] = useLazyQuery(QUERY_WALKER_ORDERS, {
        variables: {
            walker_id: currentUser?._id
        }
    }); 
    // const { data: walkerOrderData } = useQuery(QUERY_WALKER_ORDERS, {
    //     variables: {
    //         walker_id: currentUser?._id
    //     }
    // }); 

    const [ schedule, setSchedule ] = useState(createInitialState());
    const [buttonVisible, setButtonVisible] = useState(false);
    const [modalJSX, setModalJSX] = useState(<div />);
    const [modalOpen, setModalOpen] = useState(false);
    const [ scheduledWalks, setScheduledWalks ] = useState([]);

    const timeSlotArr = ["slot9am", "slot11am", "slot1pm", "slot3pm", "slot5pm", "slot7pm", "slot9pm"];

    useEffect(() => {
        // if not already in global store
        if (!currentUser && !data) {
            getWalkerProfile(); // get profile from database
        } 
        // retrieved from server
        else if (!currentUser && data) {
            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: data.walkerMe
            });
            
            getWalkerOrders();
        }
        // } else if (currentUser && scheduledWalks.length  < 1) {
        //     getWalkerOrders();
        // }
    }, [currentUser, data, loading, dispatch]);

    useEffect(() => {
        if (walkerOrderData) {
            console.log("walker orders", walkerOrderData);

            setScheduledWalks(walkerOrderData.walkerOrders);
        }
    }, [walkerOrderData]);

    useEffect(()=>{
        const availability = currentUser?.availability || null; 
        if (availability) {
            let tempSchedule = createInitialState();  
            
            availability.map(availabilityItem => {
                schedule.map((item, ind) => {
                    if (item.date === availabilityItem.date) {
                        // just grab the required fields, there are some additional fields in availabilityItem that we dont need
                        const {date, slot9am, slot11am, slot1pm, slot3pm, slot5pm, slot7pm, slot9pm } = availabilityItem;
                        tempSchedule[ind] = {date, slot9am, slot11am, slot1pm, slot3pm, slot5pm, slot7pm, slot9pm };
                    }        
                });
            });

            setSchedule([...tempSchedule]);
        }
    }, [currentUser]);

    const changeAvailability = event => {
        event.preventDefault();
        const slotStatus = event.target.getAttribute("data-status");
        
        if (slotStatus === "booked") {
            return viewWalkDetails();
        }

        let tempArr = Array.from(schedule, x => x); 
        const index = parseInt(event.target.getAttribute("data-index"));
        const timeSlot = event.target.getAttribute("data-time");
        
        if(event.target.className === "unavailable"){
            tempArr[index][timeSlot] = true; 
        } else {
            tempArr[index][timeSlot] = false; 
        }
        
        setSchedule([...tempArr]);
        if(!buttonVisible) {
            setButtonVisible(true);
        }
    };

    const viewWalkDetails = () => {
        const messageJSX = (
            <div className="available" width="400px" height="400px">
                This slot is booked <br />
                More info and formatting coming soon... 
            </div>
        );  
        setModalJSX(messageJSX);
        setModalOpen(true); 
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const inputArr = [...schedule];
         try {
            const { data: { updateWalkerAvailability: newProfile } } = await updateWalkerAvailability({
                variables: {
                    input: [...inputArr]
                }
            });
            
            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: newProfile
            });

            setModalJSX(<div>Availability has been updated successfully!</div>);
            setModalOpen(true);
         } catch (e) {
             console.log(e);
         }
    };

    const cancelUpdate = event => {
        const availability = currentUser?.availability || null; 
        if (availability) {
            let tempSchedule = createInitialState();  
            
            availability.map(availabilityItem => {
                schedule.map((item, ind) => {
                    if (item.date === availabilityItem.date) {
                        const {date, slot9am, slot11am, slot1pm, slot3pm, slot5pm, slot7pm, slot9pm } = availabilityItem;
                        tempSchedule[ind] = {date, slot9am, slot11am, slot1pm, slot3pm, slot5pm, slot7pm, slot9pm };
                    }        
                });
            });
            
            setSchedule([...tempSchedule]);
            setButtonVisible(false);
        }
    };

    const createScheduleItemJSX = (index, scheduleItem, timeSlot) => {
        // check with booked services
        let isBooked = false;
        let ownerName = "";
        const slot = timeSlot.replace("slot", "");

        scheduledWalks.map((walk, index) => {
            if(!isBooked){
                if(walk.service_date === scheduleItem.date && walk.service_time === slot) {
                    isBooked = true;
                    ownerName = walk.owner.first_name + " " + walk.owner.last_name;
                }
            }
        });

        return (
            <button 
                className={isBooked ? "booked" : (scheduleItem[timeSlot] ? "available" : "unavailable")} 
                onClick={changeAvailability} 
                id={index + "-" + timeSlot} 
                data-index={index} 
                data-time={timeSlot}
                data-status={isBooked ? "booked" : (scheduleItem[timeSlot] ? "available" : "unavailable")} 
            >
                {isBooked ? `Walk booked with ${ownerName}` : (scheduleItem[timeSlot] ? "Available" : "Unavailable")}
            </button>
        );
    };

    const closeModal = () => {
        setModalJSX(<div />);
        setModalOpen(false);
    };

    return (
        <div id="walkers">
            <div className="headline">            
                <h1>My Walking Schedule</h1>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="schedule-container">

                    <div>
                        <div className="schedule-item times-header"><h5>Time</h5></div>
                        <div className="schedule-item time-label"><h5>9am</h5></div>
                        <div className="schedule-item time-label"><h5>11am</h5></div>
                        <div className="schedule-item time-label"><h5>1pm</h5></div>
                        <div className="schedule-item time-label"><h5>3pm</h5></div>
                        <div className="schedule-item time-label"><h5>5pm</h5></div>
                        <div className="schedule-item time-label"><h5>7pm</h5></div>
                        <div className="schedule-item time-label bottom-left"><h5>9pm</h5></div>
                    </div>

                    <div className="scroll-holder">
                    
                    <div className="schedule-days" id="scrolling-schedule">
                    {
                        schedule.map((scheduleItem, index) => (
                            <div key={index}>
                                <div className="schedule-item day-header"><h5>{scheduleItem.date}</h5></div>
                                    {
                                        timeSlotArr.map((timeSlot, timeInd) => (
                                            <div key={timeInd} className="schedule-item time-detail">
                                                {createScheduleItemJSX(index, scheduleItem, timeSlot)}
                                            </div>
                                        ))
                                    }
                            </div>
                        ))   
                    }
                    </div>
                    </div>    
                </div>
                {buttonVisible &&
                    <div className="schedule-button-container">
                        <button type="button" onClick={cancelUpdate}>Cancel Changes</button>
                        <button type="submit">Update Changes</button>
                    </div>
                }   
            </form>
            <ModalDisplay component={modalJSX} isOpen={modalOpen} closeModal={closeModal}/>
        </div>

    )
}

export default WalkerSchedule;