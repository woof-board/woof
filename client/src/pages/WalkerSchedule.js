import React, { useState } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../utils/actions";

import '../css/Walkers.css';

const schedule = [
    {
        _id:"1",
        date: 'Thurs. May 13',
        slot9am: true,
        slot11am: true,
        slot1pm: false,
        slot3pm: false,
        slot5pm: false,
        slot7pm: true,
        slot9pm: true,
    },
    {
        _id:"2",
        date: 'Fri. May 14',
        slot9am: true,
        slot11am: true,
        slot1pm: false,
        slot3pm: false,
        slot5pm: false,
        slot7pm: true,
        slot9pm: true,
    }, 
    {
        _id:"3",
        date: 'Sat. May 15',
        slot9am: true,
        slot11am: true,
        slot1pm: true,
        slot3pm: true,
        slot5pm: true,
        slot7pm: true,
        slot9pm: true,
    }, 
    {
        _id:"4",
        date: 'Sun. May 16',
        slot9am: false,
        slot11am: false,
        slot1pm: false,
        slot3pm: false,
        slot5pm: false,
        slot7pm: false,
        slot9pm: false,
    }, 
    {
        _id:"5",
        date: 'Mon. May 17',
        slot9am: true,
        slot11am: true,
        slot1pm: false,
        slot3pm: false,
        slot5pm: false,
        slot7pm: true,
        slot9pm: true,
    }, 
    {
        _id:"6",
        date: 'Tues. May 18',
        slot9am: true,
        slot11am: true,
        slot1pm: false,
        slot3pm: false,
        slot5pm: false,
        slot7pm: true,
        slot9pm: true,
    }, 
    {
        _id:"7",
        date: 'Wed. May 19',
        slot9am: true,
        slot11am: true,
        slot1pm: false,
        slot3pm: false,
        slot5pm: false,
        slot7pm: true,
        slot9pm: true,
    }, 
    {
        _id:"8",
        date: 'Thurs. May 20',
        slot9am: true,
        slot11am: true,
        slot1pm: false,
        slot3pm: false,
        slot5pm: false,
        slot7pm: true,
        slot9pm: true,
    },
    {
        _id:"9",
        date: 'Fri. May 21',
        slot9am: true,
        slot11am: true,
        slot1pm: false,
        slot3pm: false,
        slot5pm: false,
        slot7pm: true,
        slot9pm: true,
    }, 
    {
        _id:"10",
        date: 'Sat. May 22',
        slot9am: true,
        slot11am: true,
        slot1pm: true,
        slot3pm: true,
        slot5pm: true,
        slot7pm: true,
        slot9pm: true,
    }, 
    {
        _id:"11",
        date: 'Sun. May 23',
        slot9am: false,
        slot11am: false,
        slot1pm: false,
        slot3pm: false,
        slot5pm: false,
        slot7pm: false,
        slot9pm: false,
    }, 
    {
        _id:"12",
        date: 'Mon. May 24',
        slot9am: true,
        slot11am: true,
        slot1pm: false,
        slot3pm: false,
        slot5pm: false,
        slot7pm: true,
        slot9pm: true,
    }, 
    {
        _id:"13",
        date: 'Tues. May 25',
        slot9am: true,
        slot11am: true,
        slot1pm: false,
        slot3pm: false,
        slot5pm: false,
        slot7pm: true,
        slot9pm: true,
    }, 
    {
        _id:"14",
        date: 'Wed. May 26',
        slot9am: true,
        slot11am: true,
        slot1pm: false,
        slot3pm: false,
        slot5pm: false,
        slot7pm: true,
        slot9pm: true,
    },  
 
]

const walker = "d45g11r43a333";
 
const scheduledWalks = [
    {
        serviceDate: "Mon. May 17",
        serviceTime: "5pm",
        owner: "Nathan Chow",
        walker: "d45g11r43a333",
        dogs: ["Pixel", "Pudding"]
    },
    {
        serviceDate: "Wed. May 19",
        serviceTime: "3pm",
        owner: "Eric Normann",
        walker: "d45g11r43a333",
        dogs: ["Pixel", "Pudding"]
    }
]

function WalkerSchedule() {
    const [state, dispatch] = useStoreContext();
    const { currentUser: {availability} } = state;
    
    console.log("availability", availability);
    const [buttonVisible, setButtonVisible] = useState(false);

    const changeAvailability = event => {
        event.preventDefault()
        if(event.target.className === "unavailable"){
            event.target.className = "available";
            event.target.innerHTML = "Available";
        } else {
            event.target.className = "unavailable";
            event.target.innerHTML = "Unavailable"
        }
        if(!buttonVisible) {
            setButtonVisible(true);
        }
    }
    const viewWalkDetails = event => {
        event.preventDefault()
        console.log(event.target.id);
        if(!buttonVisible) {
            setButtonVisible(true);
        }
    }

    const findBooking = (booking, today, time) => {
        
        for (let i = 0; i < booking.length; i++) {
            const bookDate = booking[i].serviceDate;
            const bookTime = booking[i].serviceTime;
            const todaysDate = today.date;
            if (bookDate === todaysDate && bookTime === time) {
                return (
                    <button className="booked" onClick={viewWalkDetails} id={today._id + "-" +time}>
                        Walk booked with<br />
                        {booking[i].owner}
                    </button>
                )
            }
        }
        
        return ( 
            <button className="unavailable"  onClick={changeAvailability} id={today._id + "-" +time} >Unavailable</button>
        )

    }

    return (
        <div id="walkers">
            <div className="headline">            
                <h1>My Walking Schedule</h1>
            </div>
            <form>
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
                    {schedule.map((schedule, index) => (

                        <div>
                            <div className="schedule-item day-header"><h5>{schedule.date}</h5></div>
                            <div className="schedule-item time-detail">
                                {schedule.slot9am 
                                    ? <button className="available" onClick={changeAvailability} id={schedule._id + "-9am"}>Available</button>
                                    : findBooking(scheduledWalks, schedule, "9am")
                                
                                }
                                
                            </div>
                            <div className="schedule-item time-detail">
                                {schedule.slot11am 
                                    ? <button className="available" onClick={changeAvailability} id={schedule._id + "-11am"}>Available</button> 
                                    : findBooking(scheduledWalks, schedule, "11am")
                                }
                                
                            </div>
                            <div className="schedule-item time-detail">
                                {schedule.slot1pm 
                                    ? <button className="available" onClick={changeAvailability} id={schedule._id + "-1pm"}>Available</button>   
                                    : findBooking(scheduledWalks, schedule, "1pm")
                                }
                                
                            </div>
                            <div className="schedule-item time-detail">
                                {schedule.slot3pm 
                                ? <button className="available" onClick={changeAvailability} id={schedule._id + "-3pm"}>Available</button>
                                :  findBooking(scheduledWalks, schedule, "3pm")
                                }     
                            </div>
                            <div className="schedule-item time-detail">
                                {schedule.slot3pm 
                                ? <button className="available" onClick={changeAvailability} id={schedule._id + "-3pm"}>Available</button>
                                :  findBooking(scheduledWalks, schedule, "5pm")
                                }     
                            </div>
                            <div className="schedule-item time-detail">
                                {schedule.slot3pm 
                                ? <button className="available" onClick={changeAvailability} id={schedule._id + "-3pm"}>Available</button>
                                :  findBooking(scheduledWalks, schedule, "7pm")
                                }     
                            </div>
                            <div className="schedule-item time-detail">
                                {schedule.slot3pm 
                                ? <button className="available" onClick={changeAvailability} id={schedule._id + "-3pm"}>Available</button>
                                :  findBooking(scheduledWalks, schedule, "9pm")
                                }     
                            </div>
                        </div>
                        ))}

                    </div>
                    </div>

                    

                    
                </div>
                {buttonVisible &&
                    <div className="schedule-button-container">
                        <button>Cancel Changes</button>
                        <button>Update Changes</button>
                    </div>
                }   
            </form>

        </div>

    )
}

export default WalkerSchedule;