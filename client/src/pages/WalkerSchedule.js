import data from '@iconify-icons/ant-design/home-outlined';
import React from 'react';
import '../css/Walkers.css';

const schedule = [
    {
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


    

    const findBooking = (booking, today, time) => {
        
        for (let i = 0; i < booking.length; i++) {
            const bookDate = booking[i].serviceDate;
            const bookTime = booking[i].serviceTime;
            const todaysDate = today.date;
            if (bookDate === todaysDate && bookTime === time) {
                return (
                    <button className="booked">
                        Walk booked with<br />
                        {booking[i].owner}
                    </button>
                )
            }
        }
        
        return ( 
            <button className="unavailable" id={schedule.date + "U9am"} key={schedule.date + "U9am"}>Unvailable</button>
        )

    }

    return (
        <div id="walkers">
            <div className="headline">            
                <h1>My Walking Schedule</h1>
            </div>
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
                                ? <button className="available" id={schedule.date + "9am"} key={schedule.date + "9am"}>Available</button>
                                : findBooking(scheduledWalks, schedule, "9am")
                               
                            }
                            
                        </div>
                        <div className="schedule-item time-detail">
                            {schedule.slot11am 
                                ? <button className="available" id={schedule.date + "11am"} key={schedule.date + "11am"}>Available</button> 
                                : findBooking(scheduledWalks, schedule, "11am")
                            }
                            
                        </div>
                        <div className="schedule-item time-detail">
                            {schedule.slot1pm 
                                ? <button className="available" id={schedule.date + "1pm"} key={schedule.date + "1pm"}>Available</button>   
                                : findBooking(scheduledWalks, schedule, "1pm")
                            }
                            
                        </div>
                        <div className="schedule-item time-detail">
                            {schedule.slot3pm 
                            ? <button className="available" id={schedule.date + "3pm"} key={schedule.date + "3pm"}>Available</button>
                            :  findBooking(scheduledWalks, schedule, "3pm")
                            }     
                        </div>
                        <div className="schedule-item time-detail">
                            {schedule.slot3pm 
                            ? <button className="available" id={schedule.date + "3pm"} key={schedule.date + "3pm"}>Available</button>
                            :  findBooking(scheduledWalks, schedule, "5pm")
                            }     
                        </div>
                        <div className="schedule-item time-detail">
                            {schedule.slot3pm 
                            ? <button className="available" id={schedule.date + "3pm"} key={schedule.date + "3pm"}>Available</button>
                            :  findBooking(scheduledWalks, schedule, "7pm")
                            }     
                        </div>
                        <div className="schedule-item time-detail">
                            {schedule.slot3pm 
                            ? <button className="available" id={schedule.date + "3pm"} key={schedule.date + "3pm"}>Available</button>
                            :  findBooking(scheduledWalks, schedule, "9pm")
                            }     
                        </div>
                    </div>
                    ))}

                </div>
                </div>

                

                
            </div>
        </div>

    )
}

export default WalkerSchedule;