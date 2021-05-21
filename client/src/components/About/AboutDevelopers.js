import React from 'react';

function AboutDevelopers() {

    const developers = [
        {
            name: 'Alex',
            github: 'https://github.com/AChung92',
            linked: 'https://www.linkedin.com/in/alex-chung-5b22ba200/',
            image: '/images/alex.png',
            dog: '/images/dogs/1.jpg'
        },
        {
            name: 'Benn',
            github: 'https://github.com/BennAsabir',
            linked: 'https://www.linkedin.com/in/benasabir/',
            image: '/images/benn.jpg',
            dog: '/images/dogs/2.jpg'
        },
        {
            name: 'Brian',
            github: 'https://github.com/BrianCKWang',
            linked: 'https://www.linkedin.com/in/chun-kai-brian-wang-292b6b48/',
            image: '/images/brian.jpg',
            dog: '/images/dogs/3.jpg'
        },
        {
            name: 'Eric',
            github: 'https://github.com/e-p-n',
            linked: 'https://www.linkedin.com/in/eric-normann-b8a4991b2/',
            image: '/images/eric.jpg',
            dog: '/images/dogs/4.jpg'
        },
        {
            name: 'Nathan',
            github: 'https://github.com/nchow18',
            linked: 'https://www.linkedin.com/in/nathan-chow-1999701b9/',
            image: '/images/nathan.png',
            dog: '/images/dogs/1.jpg'
        },
        {
            name: 'Rose',
            github: 'https://github.com/rosefrancis-tech',
            linked: 'https://www.linkedin.com/in/francis-tech',
            image: '/images/rose.jpg',
            dog: '/images/dogs/2.jpg'
        },
        {
            name: 'Samiul',
            github: 'https://github.com/samiul1988',
            linked: 'https://www.linkedin.com/in/samiul-choudhury/',
            image: '/images/samiul.jpg',
            dog: '/images/dogs/7.jpg'
        },
        {
            name: 'Shamim',
            github: 'https://github.com/shamimimtiaz',
            linked: 'https://www.linkedin.com/in/shamim-imtiaz',
            image: '/images/shamim.jpg',
            dog: '/images/dogs/8.jpg'
        },
    ]

    return (
        <>
            {developers.map((dev) => (
                <div key={dev.name} className="about-card">
                    <div>
                        <img alt={dev.dog} src={process.env.PUBLIC_URL + `${dev.dog}`} className="about-card-dog font-night"/>
                    </div>
                    <div className="profile-picture-container">
                        <img alt={dev.name} src={process.env.PUBLIC_URL + `${dev.image}`} className="profile-picture font-night"></img>
                    </div>
                    <div className="dev-contact">
                        <h3 className="font-night">{dev.name}</h3>
                        <p className="font-night">I am who I am</p>
                        <a href={dev.github}><i className="fab fa-github profile-socialmedia font-night"></i></a>
                        <a href={dev.linked}><i className="fab fa-linkedin-in profile-socialmedia font-night"></i></a>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AboutDevelopers;