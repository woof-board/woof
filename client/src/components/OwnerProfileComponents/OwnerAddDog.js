import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_DOG } from "../../utils/mutations";

function OwnerAddDog() {
    const [addOwnerDog] = useMutation(ADD_DOG);

    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        weight: 0,
        treats: false
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: name === 'treats'? (value.toLowerCase() === 'false'? true : false ): value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const {
            name,
            breed,
            weight,
            treats
        } = formData;

        try {
            console.log(treats);
            if (name && breed && parseFloat(weight)) {
                await addOwnerDog({
                    variables: {
                        input: {
                            'name': name,
                            'breed': breed,
                            'weight': parseFloat(weight),
                            'treats': treats,
                        }
                    }
                });

                alert('Dog added');
            }
            else{
                alert('Incomplete dog information!');
            }

        } catch (e) {
            console.log(e);
        }

    }

    return (
        <>
            <div className="walker-contact-container">
                <div className="walker-header"><h2>ADD DOG</h2></div>
                <form
                    className="walker-update-form"
                    id="add-dog-form"
                    onSubmit={handleFormSubmit}
                >
                    <div className="row-data">
                        <input
                            className="profile-input profile-name"
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={handleInputChange}
                            value={formData.name}
                        />
                        <input
                            className="profile-input profile-name"
                            type="text"
                            name="breed"
                            placeholder="Breed"
                            onChange={handleInputChange}
                            value={formData.breed}
                        />
                    </div>
                    <div className="row-data">
                        <input
                            className="profile-input profile-name"
                            type="number"
                            name="weight"
                            placeholder="Weight"
                            onChange={handleInputChange}
                            value={formData.weight}
                        />
                    </div>
                    <div className="row-data">
                        <input
                            className="profile-input profile-name"
                            type="checkBox"
                            name="treats"
                            placeholder="Treats"
                            onChange={handleInputChange}
                            value={formData.treats}
                        />
                        <label for="treats"> Treats</label>
                    </div>

                    <button
                        type="submit"
                        className="update-walker-button"
                        id="owner-add-dog-button"
                    >
                        ADD
                </button>
                </form>
            </div>
        </>
    )
}

export default OwnerAddDog;