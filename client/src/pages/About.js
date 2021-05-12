import React from 'react';
import '../css/Home.css';
import '../css/About.css';


function About() {
    return (
        <>
            <div className="about-imgholder">
                <img src={process.env.PUBLIC_URL + `/images/banner3.jpg`} className="about-image" alt="image of a dog"/>
            </div>
            <div>About Woof</div>
            <div className="about-us">
                <p>
                    You need a break! So do your dogs! We will help both! 
                    Woof connects dog owners with dog walkers who’ll treat their your dog like family.
                </p>
                <p>
                    We are dog lovers and our dog walkers have lots of experience taking care of dogs. 
                    Walkers are responsible and caring and take care of your pet with respect. 
                    They offer affection and attention to your pet, when you can’t be there.
                    You can trust us to keep your pet happy, healthy, and sweet as ever.
                </p>
                <p>
                    Woof is also a cutting edge technology business committed to making pet care safe, 
                    easy, and affordable so that everyone can experience the unconditional love of a pet.
                </p>
            </div>

            <div className="leadership">
                <h2>Leadership</h2>
                
                <div className="row">
                    
                        <div className="card">
                            <img src={process.env.PUBLIC_URL + `/images/profile.jpg`} className="profile-picture"></img>
                            <h3>Name 1</h3>
                            <p>I am who I am</p>
                            <a href="https://github.com/woof-board" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                            <a href="https://ca.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                        </div>
                    
                    
                        <div className="card">
                            <img src={process.env.PUBLIC_URL + `/images/profile.jpg`} className="profile-picture"></img>
                            <h3>Name 1</h3>
                            <p>I am who I am</p>
                            <a href="https://github.com/woof-board" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                            <a href="https://ca.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                        </div>
                    
                        <div className="card">
                            <img src={process.env.PUBLIC_URL + `/images/profile.jpg`} className="profile-picture"></img>
                            <h3>Name 1</h3>
                            <p>I am who I am</p>
                            <a href="https://github.com/woof-board" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                            <a href="https://ca.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                        </div>
                    
                        <div className="card">
                            <img src={process.env.PUBLIC_URL + `/images/profile.jpg`} className="profile-picture"></img>
                            <h3>Name 1</h3>
                            <p>I am who I am</p>
                            <a href="https://github.com/woof-board" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                            <a href="https://ca.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                        </div>
                    
                        <div className="card">
                            <img src={process.env.PUBLIC_URL + `/images/profile.jpg`} className="profile-picture"></img>
                            <h3>Name 1</h3>
                            <p>I am who I am</p>
                            <a href="https://github.com/woof-board" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                            <a href="https://ca.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                        </div>
                    
                        <div className="card">
                            <img src={process.env.PUBLIC_URL + `/images/profile.jpg`} className="profile-picture"></img>
                            <h3>Name 1</h3>
                            <p>I am who I am</p>
                            <a href="https://github.com/woof-board" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                            <a href="https://ca.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                        </div>
                    
                        <div className="card">
                            <img src={process.env.PUBLIC_URL + `/images/profile.jpg`} className="profile-picture"></img>
                            <h3>Name 1</h3>
                            <p>I am who I am</p>
                            <a href="https://github.com/woof-board" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                            <a href="https://ca.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                        </div>
                    
                        <div className="card">
                            <img src={process.env.PUBLIC_URL + `/images/profile.jpg`} className="profile-picture"></img>
                            <h3>Name 1</h3>
                            <p>I am who I am</p>
                            <a href="https://github.com/woof-board" target="_blank"><i className="fab fa-github profile-socialmedia"></i></a>
                            <a href="https://ca.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                        </div>
                    
                </div>
            </div>
        </>
    )
}

export default About;