import React from 'react';
import '../css/Home.css';
import '../css/About.css';


function About() {

    const developers = [
        {
            name: 'Alex',
            github: 'https://github.com/AChung92',
            linked: 'https://www.linkedin.com/in/alex-chung-5b22ba200/',
            image: '/images/alex.png'
        },
        {
            name: 'Benn',
            github: 'https://github.com/BennAsabir',
            linked: 'https://www.linkedin.com/in/benasabir/',
            image: '/images/benn.jpg'
        },
        {
            name: 'Brian',
            github: 'https://github.com/BrianCKWang',
            linked: 'https://www.linkedin.com/in/chun-kai-brian-wang-292b6b48/',
            image: '/images/brian.jpg'
        },
        {
            name: 'Eric',
            github: 'https://github.com/e-p-n',
            linked: 'https://www.linkedin.com/in/eric-normann-b8a4991b2/',
            image: '/images/eric.jpg'
        },
        {
            name: 'Nathan',
            github: 'https://github.com/nchow18',
            linked: 'https://www.linkedin.com/in/nathan-chow-1999701b9/',
            image: '/images/nathan.png'
        },
        {
            name: 'Rose',
            github: 'https://github.com/rosefrancis-tech',
            linked: 'https://www.linkedin.com/in/francis-tech',
            image: '/images/rose.jpg'
        },
        {
            name: 'Samiul',
            github: 'https://github.com/samiul1988',
            linked: 'https://www.linkedin.com/in/samiul-choudhury/',
            image: '/images/samiul.jpg'
        },
        {
            name: 'Shamim',
            github: 'https://github.com/shamimimtiaz',
            linked: 'https://www.linkedin.com/in/shamim-imtiaz',
            image: '/images/shamim.jpg'
        },
    ]

    return (
        <>
            <div className="about-imgholder">
                <img alt="puppies" src={process.env.PUBLIC_URL + `/images/banner4.jpg`} className="about-image"/>
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
                    {developers.map((dev) => (
                        <div key={dev.name} className="about-card">
                            <img alt={dev.name} src={process.env.PUBLIC_URL + `${dev.image}`} className="profile-picture"></img>
                            <h3>{dev.name}</h3>
                            <p>I am who I am</p>
                            <a href={dev.github}><i className="fab fa-github profile-socialmedia"></i></a>
                            <a href={dev.linked}><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default About;