import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_WALKER_AVAILABILITY } from "../utils/mutations";
import { createInitialState } from "../utils/helpers";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../utils/actions";
import ModalDisplay from '../components/ModalDisplay';
import '../css/Walkers.css';
 
const scheduledWalks = [
    {
        service_date: "2021-05-19",
        service_time: "5pm",
        owner: "Nathan Chow",
        walker: "d45g11r43a333",
        dogs: ["Pixel", "Pudding"]
    },
    {
        service_date: "2021-05-23",
        service_time: "3pm",
        owner: "Eric Normann",
        walker: "d45g11r43a333",
        dogs: ["Pixel", "Pudding"]
    }
]


function WalkerSchedule() {
    const [state, dispatch] = useStoreContext();
    const { currentUser } = state;
    const [updateWalkerAvailability, { error }] = useMutation(UPDATE_WALKER_AVAILABILITY);

    const [ schedule, setSchedule ] = useState(createInitialState());
    const [buttonVisible, setButtonVisible] = useState(false);
    const [modalJSX, setModalJSX] = useState(<div />);
    const [modalOpen, setModalOpen] = useState(false);

    const timeSlotArr = ["slot9am", "slot11am", "slot1pm", "slot3pm", "slot5pm", "slot7pm", "slot9pm"];

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

            alert('Availability Updated');
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

    const createScheduleItemComponent = (index, scheduleItem, timeSlot) => {
        // check with booked services
        let isBooked = false;
        let ownerName = "";
        const slot = timeSlot.replace("slot", "");

        scheduledWalks.map((walk, index) => {
            if(!isBooked){
                if(walk.service_date === scheduleItem.date && walk.service_time === slot) {
                    isBooked = true;
                    ownerName = walk.owner;
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
                                                {createScheduleItemComponent(index, scheduleItem, timeSlot)}
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