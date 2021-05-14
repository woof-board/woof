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
    } 
 
]


function WalkerSchedule() {


    return (
        <div id="walkers">
            <div className="headline">            
                <h1>Your Walking Schedule</h1>
            </div>
            <div className="schedule-container">
                <div>
                    <div className="schedule-item times-header"><h5>Times</h5></div>
                    <div className="schedule-item time-label"><h5>9:00am</h5></div>
                    <div className="schedule-item time-label"><h5>11:00am</h5></div>
                    <div className="schedule-item time-label"><h5>1:00pm</h5></div>
                    <div className="schedule-item time-label"><h5>3:00pm</h5></div>
                    <div className="schedule-item time-label"><h5>5:00pm</h5></div>
                    <div className="schedule-item time-label"><h5>7:00pm</h5></div>
                    <div className="schedule-item time-label bottom-left"><h5>9:00pm</h5></div>
                </div>

                {schedule.map((schedule, index) => (



                <div>
                    <div className={index===6 ? ("top-right schedule-item day-header") : ("schedule-item day-header")}><h5>{schedule.date}</h5></div>
                    <div className="schedule-item time-detail">
                        {schedule.slot9am ? (
                            <button className="available" id={schedule.date + "9am"}>Available</button>
                        ) : (
                            <button className="unavailable" id={schedule.date + "9am"}>Unvailable</button>
                        )}
                        
                    </div>
                    <div className="schedule-item time-detail">
                        {schedule.slot11am ? (
                            <button className="available" id={schedule.date + "11am"}>Available</button>
                        ) : (
                            <button className="unavailable" id={schedule.date + "11am"}>Unvailable</button>
                        )}
                        
                    </div>
                    <div className="schedule-item time-detail">
                        {schedule.slot1pm ? (
                            <button className="available" id={schedule.date + "1pm"}>Available</button>
                        ) : (
                            <button className="unavailable" id={schedule.date + "1pm"}>Unvailable</button>
                        )}
                        
                    </div>
                    <div className="schedule-item time-detail">
                        {schedule.slot3pm ? (
                            <button className="available" id={schedule.date + "3pm"}>Available</button>
                        ) : (
                            <button className="unavailable" id={schedule.date + "3pm"}>Unvailable</button>
                        )}
                        
                    </div>
                    <div className="schedule-item time-detail">
                        {schedule.slot5pm ? (
                            <button className="available" id={schedule.date + "5pm"}>Available</button>
                        ) : (
                            <button className="unavailable" id={schedule.date + "5pm"}>Unvailable</button>
                        )}
                        
                    </div>
                    <div className="schedule-item time-detail">
                        {schedule.slot1pm ? (
                            <button className="available" id={schedule.date + "7pm"}>Available</button>
                        ) : (
                            <button className="unavailable" id={schedule.date + "7pm"}>Unvailable</button>
                        )}
                        
                    </div>
                    <div className={index===6 ? ("bottom-right schedule-item time-detail") : ("schedule-item time-detail")}>
                        {schedule.slot9pm ? (
                            <button className={index===6 ? ("bottom-right available") : ("available")} id={schedule.date + "9pm"}>Available</button>
                        ) : (
                            <button className={index===6 ? ("bottom-right unavailable") : ("unavailable")} id={schedule.date + "9pm"}>Unvailable</button>
                        )}
                        
                    </div>

                </div>
                 ))}


                

                
                 
            </div>
        </div>

    )
}

export default WalkerSchedule;