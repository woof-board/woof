import React, { useState } from 'react';

function AboutContactForm() {

    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })

        console.log(formData);
    }

    const formHandler = (event) => {
        event.preventDefault();
        
        alert('Email sent')
    }


    return (
        <>
            <div className="contact-us-container-right">
                <form onSubmit={formHandler} className="flex-c">
                    <input type="text" onChange={handleInputChange} name="name" className="contactus-input" placeholder="Name"></input>
                    <input type="text" onChange={handleInputChange} name="email" className="contactus-input"  placeholder="Email"></input>
                    <input type="text" onChange={handleInputChange} name="question" className="contactus-question" placeholder="Questions"></input>
                    <button type="submit">SUBMIT</button>
                </form>
                <div className="triangle-left"></div>
            </div>
        </>
    )
}

export default AboutContactForm;