import React from 'react';
import '../css/Home.css';
import '../css/About.css';


function About() {
    return (
        <>
            <div className="about-imgholder">
                <img src={process.env.PUBLIC_URL + `/images/banner4.jpg`} className="about-image" alt="image of a dog"/>
                <div className="about-title">About Woof
                <div className="about-caption">For you and your dogs</div>
                </div>
                
            </div>
            
            <div className="about-us">
                <p>
                    You need a break. So do your dogs. We will help both! 
                    Woof connects dog owners with dog walkers who’ll treat your dog like family.
                    You can trust us to keep your pet happy, healthy, and sweet as ever.
                </p>
                <p>
                    We understand that life can be hectic and it may be hard to fit in a lengthy walk for your furry friend. 
                    We are here to take that stress away from you to give your pal the exercise and 
                    relief that it needs so you can focus on other tasks at hand.
                </p>
                <p>
                    We are dog lovers and our dog walkers have lots of experience taking care of dogs. 
                    Walkers are responsible and caring. They take care of your pet with respect. 
                    They offer affection and attention to your pet, when you can’t be there.
                </p>
                <p>
                    Woof is also a cutting edge technology business committed to making pet care safe, 
                    easy, and affordable so that everyone can experience the unconditional love of a pet.
                </p>
            </div>

            <div className="leadership">
                <h2>Team</h2>
                <div className="about-row">
                    <div className="about-card">
                        <img src={process.env.PUBLIC_URL + `/images/alex.png`} className="profile-picture"></img>
                        <h3>Alex</h3>
                        <p>I am who I am</p>
                        <a href="https://github.com/AChung92" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                        <a href="https://www.linkedin.com/in/alex-chung-5b22ba200/" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                    </div>
                
                    <div className="about-card">
                        <img src={process.env.PUBLIC_URL + `/images/benn.jpg`} className="profile-picture"></img>
                        <h3>Benn</h3>
                        <p>I am who I am</p>
                        <a href="https://github.com/BennAsabir" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                        <a href="https://www.linkedin.com/in/benasabir/" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                    </div>
                
                    <div className="about-card">
                        <img src={process.env.PUBLIC_URL + `/images/brian.jpg`} className="profile-picture"></img>
                        <h3>Brian</h3>
                        <p>I am who I am</p>
                        <a href="https://github.com/woof-board" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                        <a href="https://ca.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                    </div>
                
                    <div className="about-card">
                        <img src={process.env.PUBLIC_URL + `/images/eric.jpg`} className="profile-picture"></img>
                        <h3>Eric</h3>
                        <p>I am who I am</p>
                        <a href="https://github.com/e-p-n" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                        <a href="https://www.linkedin.com/in/eric-normann-b8a4991b2/" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                    </div>
    
                    <div className="about-card">
                        <img src={process.env.PUBLIC_URL + `/images/nathan.png`} className="profile-picture"></img>
                        <h3>Nathan</h3>
                        <p>I am who I am</p>
                        <a href="https://github.com/nchow18" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                        <a href="https://www.linkedin.com/in/nathan-chow-1999701b9/" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                    </div>
                
                    <div className="about-card">
                        <img src={process.env.PUBLIC_URL + `/images/rose.jpg`} className="profile-picture"></img>
                        <h3>Rose</h3>
                        <p>I am who I am</p>
                        <a href="https://github.com/rosefrancis-tech" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                        <a href="https://www.linkedin.com/in/francis-tech" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                    </div>
                
                    <div className="about-card">
                        <img src={process.env.PUBLIC_URL + `/images/profile.jpg`} className="profile-picture"></img>
                        <h3>Samiul</h3>
                        <p>I am who I am</p>
                        <a href="https://github.com/woof-board" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                        <a href="https://ca.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                    </div>
                
                    <div className="about-card">
                        <img src={process.env.PUBLIC_URL + `/images/profile.jpg`} className="profile-picture"></img>
                        <h3>Shamim</h3>
                        <p>I am who I am</p>
                        <a href="https://github.com/shamimimtiaz" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                        <a href="https://www.linkedin.com/in/shamim-imtiaz" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;