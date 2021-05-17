import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { UPDATE_WALKER_AVAILABILITY } from "../utils/mutations";
import { createInitialState } from "../utils/helpers";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../utils/actions";
import '../css/Walkers.css';

// const schedule = [
//     {
//         _id:"1",
//         date: 'Thurs. May 13',
//         slot9am: true,
//         slot11am: true,
//         slot1pm: false,
//         slot3pm: false,
//         slot5pm: false,
//         slot7pm: true,
//         slot9pm: true,
//     },
//     {
//         _id:"2",
//         date: 'Fri. May 14',
//         slot9am: true,
//         slot11am: true,
//         slot1pm: false,
//         slot3pm: false,
//         slot5pm: false,
//         slot7pm: true,
//         slot9pm: true,
//     }, 
//     {
//         _id:"3",
//         date: 'Sat. May 15',
//         slot9am: true,
//         slot11am: true,
//         slot1pm: true,
//         slot3pm: true,
//         slot5pm: true,
//         slot7pm: true,
//         slot9pm: true,
//     }, 
//     {
//         _id:"4",
//         date: 'Sun. May 16',
//         slot9am: false,
//         slot11am: false,
//         slot1pm: false,
//         slot3pm: false,
//         slot5pm: false,
//         slot7pm: false,
//         slot9pm: false,
//     }, 
//     {
//         _id:"5",
//         date: 'Mon. May 17',
//         slot9am: true,
//         slot11am: true,
//         slot1pm: false,
//         slot3pm: false,
//         slot5pm: false,
//         slot7pm: true,
//         slot9pm: true,
//     }, 
//     {
//         _id:"6",
//         date: 'Tues. May 18',
//         slot9am: true,
//         slot11am: true,
//         slot1pm: false,
//         slot3pm: false,
//         slot5pm: false,
//         slot7pm: true,
//         slot9pm: true,
//     }, 
//     {
//         _id:"7",
//         date: 'Wed. May 19',
//         slot9am: true,
//         slot11am: true,
//         slot1pm: false,
//         slot3pm: false,
//         slot5pm: false,
//         slot7pm: true,
//         slot9pm: true,
//     }, 
//     {
//         _id:"8",
//         date: 'Thurs. May 20',
//         slot9am: true,
//         slot11am: true,
//         slot1pm: false,
//         slot3pm: false,
//         slot5pm: false,
//         slot7pm: true,
//         slot9pm: true,
//     },
//     {
//         _id:"9",
//         date: 'Fri. May 21',
//         slot9am: true,
//         slot11am: true,
//         slot1pm: false,
//         slot3pm: false,
//         slot5pm: false,
//         slot7pm: true,
//         slot9pm: true,
//     }, 
//     {
//         _id:"10",
//         date: 'Sat. May 22',
//         slot9am: true,
//         slot11am: true,
//         slot1pm: true,
//         slot3pm: true,
//         slot5pm: true,
//         slot7pm: true,
//         slot9pm: true,
//     }, 
//     {
//         _id:"11",
//         date: 'Sun. May 23',
//         slot9am: false,
//         slot11am: false,
//         slot1pm: false,
//         slot3pm: false,
//         slot5pm: false,
//         slot7pm: false,
//         slot9pm: false,
//     }, 
//     {
//         _id:"12",
//         date: 'Mon. May 24',
//         slot9am: true,
//         slot11am: true,
//         slot1pm: false,
//         slot3pm: false,
//         slot5pm: false,
//         slot7pm: true,
//         slot9pm: true,
//     }, 
//     {
//         _id:"13",
//         date: 'Tues. May 25',
//         slot9am: true,
//         slot11am: true,
//         slot1pm: false,
//         slot3pm: false,
//         slot5pm: false,
//         slot7pm: true,
//         slot9pm: true,
//     }, 
//     {
//         _id:"14",
//         date: 'Wed. May 26',
//         slot9am: true,
//         slot11am: true,
//         slot1pm: false,
//         slot3pm: false,
//         slot5pm: false,
//         slot7pm: true,
//         slot9pm: true,
//     },  
 
// ]

// const walker = "d45g11r43a333";
 
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

    const viewWalkDetails = event => {
        event.preventDefault();
        console.log(event.target.id);
        // if(!buttonVisible) {
        //     setButtonVisible(true);
        // }
    };

    // const findBooking = (booking, today, time, index) => {
    //     for (let i = 0; i < booking.length; i++) {
    //         const bookDate = booking[i].service_date;
    //         const bookTime = booking[i].service_time;
    //         const todaysDate = today.date;
    //         if (bookDate === todaysDate && bookTime === time) {
    //             return (
    //                 <button className="booked" onClick={viewWalkDetails} id={index + "-" +time} data-index={index} data-time={"slot" + time}>
    //                     Walk booked with<br />
    //                     {booking[i].owner}
    //                 </button>
    //             )
    //         }
    //     }
        
    //     return ( 
    //         <button className="unavailable"  onClick={changeAvailability} id={index + "-" +time} data-index={index} data-time={"slot" + time}>Unavailable</button>
    //     )

    // };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const inputArr = [...schedule];
        console.log("schde format", inputArr);
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
            
            console.log("cancel", tempSchedule);
            setSchedule([...tempSchedule]);
            setButtonVisible(false);
        }
    };

    const displayLabel = (availabilityStatus, date, timeSlot) => {
        // console.log(availabilityStatus, date, timeSlot);
        // check with serviceHistory
        let isBooked = false;
        let ownerName = "";
        const slot = timeSlot.replace("slot", "");

        scheduledWalks.map((walk, index) => {
            if(walk.service_date === date && walk.service_time === slot) {
                isBooked = true;
                ownerName = walk.owner;
            }
        });

        if (isBooked) {
            return (
                <button 
                    className="booked" 
                    onClick={viewWalkDetails} 
                >
                    Walk booked with <br />
                    {ownerName}
                </button>
            );
        }

        return availabilityStatus ? "Available" : "Unavailable";
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
                                                <button 
                                                    className={scheduleItem[timeSlot] ? "available" : "unavailable"} 
                                                    onClick={changeAvailability} 
                                                    id={index + "-" + timeSlot} 
                                                    data-index={index} 
                                                    data-time={timeSlot}
                                                >
                                                    {displayLabel(scheduleItem[timeSlot], scheduleItem.date, timeSlot)}
                                                </button>
                                            </div>
                                        ))
                                    }
                            </div>
                        ))
                        
                    }

                    {
                    // schedule.map((scheduleItem, index) => {
                    //     // console.log(scheduleItem, index, "index");
                    //     return (

                    //     <div key={index}>
                    //         <div className="schedule-item day-header"><h5>{scheduleItem.date}</h5></div>
                    //         <div className="schedule-item time-detail">
                    //             {scheduleItem.slot9am 
                    //                 ? <button className="available" onClick={changeAvailability} id={index + "-9am"} data-index={index} data-time="slot9am">Available</button>
                    //                 : findBooking(scheduledWalks, scheduleItem, "9am", index)
                                
                    //             }
                                
                    //         </div>
                    //         <div className="schedule-item time-detail">
                    //             {scheduleItem.slot11am 
                    //                 ? <button className="available" onClick={changeAvailability} id={index + "-11am"} data-index={index} data-time="slot11am">Available</button> 
                    //                 : findBooking(scheduledWalks, scheduleItem, "11am", index)
                    //             }
                                
                    //         </div>
                    //         <div className="schedule-item time-detail">
                    //             {scheduleItem.slot1pm 
                    //                 ? <button className="available" onClick={changeAvailability} id={index + "-1pm"} data-index={index} data-time="slot1pm">Available</button>   
                    //                 : findBooking(scheduledWalks, scheduleItem, "1pm", index)
                    //             }
                                
                    //         </div>
                    //         <div className="schedule-item time-detail">
                    //             {scheduleItem.slot3pm 
                    //             ? <button className="available" onClick={changeAvailability} id={index + "-3pm"} data-index={index} data-time="slot3pm">Available</button>
                    //             :  findBooking(scheduledWalks, scheduleItem, "3pm", index)
                    //             }     
                    //         </div>
                    //         <div className="schedule-item time-detail">
                    //             {scheduleItem.slot5pm 
                    //             ? <button className="available" onClick={changeAvailability} id={index + "-5pm"} data-index={index} data-time="slot5pm">Available</button>
                    //             :  findBooking(scheduledWalks, scheduleItem, "5pm", index)
                    //             }     
                    //         </div>
                    //         <div className="schedule-item time-detail">
                    //             {scheduleItem.slot7pm 
                    //             ? <button className="available" onClick={changeAvailability} id={index + "-7pm"} data-index={index} data-time="slot7pm">Available</button>
                    //             :  findBooking(scheduledWalks, scheduleItem, "7pm", index)
                    //             }     
                    //         </div>
                    //         <div className="schedule-item time-detail">
                    //             {scheduleItem.slot9pm 
                    //             ? <button className="available" onClick={changeAvailability} id={index + "-9pm"} data-index={index} data-time="slot9pm">Available</button>
                    //             :  findBooking(scheduledWalks, scheduleItem, "9pm", index)
                    //             }     
                    //         </div>
                    //     </div>
                    //     )})
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

        </div>

    )
}

export default WalkerSchedule;