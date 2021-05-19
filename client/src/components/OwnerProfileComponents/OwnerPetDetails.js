import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_OWNER_PROFILE } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../../utils/actions";
import { cities, neighbourhoods } from '../../utils/helpers';

function OwnerDetails({ user }) {

    const [updateOwnerProfile, { error }] = useMutation(UPDATE_OWNER_PROFILE);
    const [state, dispatch] = useStoreContext();



    const [formData, setFormData] = useState({ 
        dogs: []
    });
    

    useEffect(() => {
        if (user) {
            const { dogs } = user;
            setFormData({
                dogs

            })
  
        }
    
    }, [user]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ 
            ...formData, 
            [name]: value
        });
    };
    const {dogs} = formData;
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // need to implement form validation here

        const { 
            dogs,
            ...rest
         } = formData;

         try {
            const { data: { updateOwnerProfile: newProfile } } = await updateOwnerProfile({
                variables: {
                    input: {
                        dogs: {
                            breed: dogs.breed,
                            weight: dogs.weight,
                            treats: dogs.treats,
                            avatar: dogs.avatar,
                            ...rest
                        },
                        ...rest
                    }
                }
            });
            
            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: newProfile
            });

            alert('Account Updated');
         } catch (e) {
             console.log(e);
         }

    }

    return (
        <>
        <div className="walker-contact-container">

            <div className="walker-header"><h2>Pet Information</h2></div>
            <form
                className="walker-update-form"
                id="walker-update-form"
                onSubmit={handleFormSubmit}
            >


                    {
                    dogs.map((dog) => 
                    <>
                    <img src={dog.avatar} width="150"></img>
                    <div className="row-data">

                        <input
                            className="profile-input profile-name"
                            type="text"
                            name="dog_name"
                            placeholder="Name"
                            onChange={handleInputChange}
                            value={dog.name}
                        />
                    
                    <input
                        className="profile-input profile-name"
                        type="text"
                        name="breed"
                        placeholder="Breed"
                        onChange={handleInputChange}
                        value={dog.breed}
                    />
                    </div>
                    <div className="row-data">
                     <input
                        className="profile-input profile-name"
                        type="text"
                        name="weight"
                        placeholder="Weight"
                        onChange={handleInputChange}
                        value={dog.weight}
                    />lbs.
                    <label>Dog Treats allowed</label>
                    <select className="profile-input profile-name" id="walker-cities" name="address_city" onChange={handleInputChange}>
                                {console.log(dog.treats)}
                                {dog.treats
                                    ? <><option selected value="true">Yes</option><option value="false">No</option></>
                                    : <><option value="true">Yes</option><option selected value="false">No</option></>
                                }
                    </select>

                    </div>
                    </>
                    )}
                    
            
                
                
                <div className="button-container">
                <button
                    type="submit"
                    className="update-walker-button"
                    id="update-owner-profile-button"
                >
                    UPDATE
                </button>
                </div>
            </form>
        </div>
        </>
    )
}

export default OwnerDetails;