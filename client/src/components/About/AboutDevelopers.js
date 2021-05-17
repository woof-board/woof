import React from 'react';

function AboutDevelopers() {

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
                {developers.map((dev) => (
                    <div key={dev.name} className="about-card">
                        <img alt={dev.name} src={process.env.PUBLIC_URL + `${dev.image}`} className="profile-picture"></img>
                        <h3>{dev.name}</h3>
                        <p>I am who I am</p>
                        <a href={dev.github}><i className="fab fa-github profile-socialmedia"></i></a>
                        <a href={dev.linked}><i className="fab fa-linkedin-in profile-socialmedia"></i></a>
                    </div>
                ))}
        </>
    )
}

export default AboutDevelopers;