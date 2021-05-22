import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_DOG } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../../utils/actions";
import ModalDisplay from '../../components/ModalDisplay';
import { validateInput } from '../../utils/helpers';

function OwnerAddDog() {
    const [addOwnerDog] = useMutation(ADD_DOG);
    const [state, dispatch] = useStoreContext();
    const { currentUser } = state;

    const [modalJSX, setModalJSX] = useState(<div />);
    const [modalOpen, setModalOpen] = useState();
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
            [name]: name === 'treats'? (value.toLowerCase() === 'false'? false : true ): value
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

        // validation
        const errors = validateInput([
            {input_title: 'Name', input_val: name, criteria: ['required']},
            {input_title: 'Breed', input_val: breed, criteria: ['required']}
        ]);
         
         if (errors.length > 0) {
             setModalJSX(
                <div>
                    {errors.map((error, index) => <p key={index}>{error}</p>)}
                </div>
            );
             setModalOpen(true);
             return;
         }

        try {
            if (name && breed && parseFloat(weight) > 0) {
                const { data: { addDog: newProfile } } = await addOwnerDog({
                    variables: {
                        input: {
                            'name': name,
                            'breed': breed,
                            'weight': parseFloat(weight),
                            'treats': treats,
                        }
                    }
                });
                
                dispatch({
                    type: UPDATE_CURRENT_USER,
                    currentUser: {
                        ...currentUser,
                        dogs: [...newProfile.dogs]
                    }
                });
                setModalJSX(<div>Dog has been added successfully!</div>);
                setModalOpen(true);
            }
            else{
                setModalJSX(<div>Dog has been added successfully!</div>);
                setModalOpen(true);
            }

        } catch (e) {
            console.log(e);
        }

    }

    const closeModal = () => {
        setModalJSX(<div />);
        setModalOpen(false);
    };
    
    return (
        <>
            <div className="walker-contact-container">
                <div className="walker-header"><h2>Add a Dog</h2></div>
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
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            className="profile-input profile-name"
                            type="text"
                            name="breed"
                            value={formData.breed}
                            placeholder="Breed"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row-data">
                        <input
                            className="profile-input profile-name"
                            type="text"
                            name="weight"
                            value={formData.weight}
                            placeholder="Weight in pounds"
                            onChange={handleInputChange}
                        />      
                        <label className="checkbox" for="treats"><span className="normal-text">Check box if dog is allowed treats</span>      
                            <input
                                type="checkBox"
                                name="treats"
                                placeholder="Treats"
                                onChange={handleInputChange}
                            />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div className="button-container">
                        <button
                            type="submit"
                            className="update-walker-button"
                            id="owner-add-dog-button"
                        >
                            ADD
                        </button>
                    </div>
                </form>
                <ModalDisplay component={modalJSX} isOpen={modalOpen} closeModal={closeModal}/>
            </div>
        </>
    )
}

export default OwnerAddDog;