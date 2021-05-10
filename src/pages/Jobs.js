import React from 'react';
import '../css/Jobs.css'
import ProfileImage from '../assets/images/user-img.png';

function Jobs() {

    const jobs = [1,2,3,4,5]

    return (
        <div id="jobs" className="jobs-container">
            {jobs.map((walkers) => (
            <div className="job-card">
                    <div><img className="job-profile-img" alt="" src={ProfileImage}></img></div>
                    <div className="job-content">
                        <div>
                            <div className="job-title"><span>Looking for Dog Walker!</span></div>
                            <div className="job-date"><span>Date Posted: 2021/05/21</span></div>
                        </div>
                        <div classname="job-description">Need dog walker now!</div>
                    </div>
            </div>
            ))}
        </div>
    )
}

export default Jobs;