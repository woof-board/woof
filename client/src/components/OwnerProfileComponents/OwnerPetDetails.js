import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_OWNER_PROFILE, UPDATE_DOG, REMOVE_DOG } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../../utils/actions";
import ModalDisplay from '../../components/ModalDisplay';
import { validateInput } from '../../utils/helpers';
import { openUploadWidget } from '../../utils/CloudinaryService';

function OwnerPetDetails({ user }) {

    const [updateOwnerProfile, { error }] = useMutation(UPDATE_OWNER_PROFILE);
    // const [updateOwnerAvatar] = useMutation(UPDATE_OWNER_AVATAR);
    const [updateDog] = useMutation(UPDATE_DOG);
    const [removeDog] = useMutation(REMOVE_DOG);
    const [state, dispatch] = useStoreContext();
    const { currentUser } = state;
    const [formData, setFormData] = useState({
        dogs: []
    });
    const [modalJSX, setModalJSX] = useState(<div />);
    const [modalOpen, setModalOpen] = useState();

    useEffect(() => {
        if (user) {
            const { dogs } = user;
            console.log("dogs in useeffc", user, dogs);
            setFormData({
                dogs: [...dogs]
            })

        }

    }, [user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const dogId = event.target.getAttribute("data-dogid");

        let oldState = [...formData.dogs];
        let newState = oldState.map((item)=>{
            if(item._id === dogId) {
                item[name] = value;        
            }
            return item;
        });
        setFormData({
            dogs: [...newState]
        });
    };

    const { dogs } = formData;

    const handleUpdateDog = async (e) => {
        e.preventDefault();
        const dogId = e.target.getAttribute("data-dogid");

        const { dogs } = formData;
        const updatedDog = dogs.filter(dog => dog._id === dogId)[0];
        
        // validation
        const errors = validateInput([
            {input_title: 'Name', input_val: updatedDog.name, criteria: ['required']},
            {input_title: 'Breed', input_val: updatedDog.breed, criteria: ['required']}
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
            const { data: { updateDog: newProfile } } = await updateDog({
                variables: {
                        dog_id: updatedDog._id,
                        name: updatedDog.name,
                        breed: updatedDog.breed,
                        weight: parseFloat(updatedDog.weight),
                        treats: updatedDog.treats,
                        avatar: updatedDog.avatar
                    } 
            });

            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: {
                    ...currentUser,
                    dogs: [...newProfile.dogs]
                }
            });

            setModalJSX(<div>Dog info has been updated successfully!</div>);
            setModalOpen(true);
        } catch (e) {
            console.log(e);
        }
    }
    const handleRemoveDog = async (e) => {
        e.preventDefault();
        const dogId = e.target.getAttribute("data-dogid");
        
        try {    
            const { data: { removeDog: newProfileFromRemoveAction } } = await removeDog({
                variables: {
                    dog_id: dogId
                } 
            });

            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: {
                    ...currentUser,
                    dogs: [...newProfileFromRemoveAction.dogs]
                }
            });

            setModalJSX(<div>Dog has been removed from database successfully!</div>);
            setModalOpen(true);
        } catch (e) {
            console.log(e);
        }
    };

    const closeModal = () => {
        setModalJSX(<div />);
        setModalOpen(false);
    };

    // const uploadImageWithCloudinary = async () => {
    //     const uploadOptions = {
    //       cloud_name: 'w-oo-f',
    //       upload_preset: 'iqgryfiq' //Create an unsigned upload preset and update this
    //     };
    
    //     openUploadWidget(uploadOptions, (error, result) => {
    //       if (!error) {
    //         const {event, info} = result;
    //         if (event === "success") {
    //           updateOwnerAvatar({
    //             variables:{
    //               avatar: info.public_id
    //             }
    //           })
    //           .then(newOwner => {
    //             dispatch({
    //               type: UPDATE_CURRENT_USER,
    //               currentUser: newOwner.data.updateOwnerAvatar
    //             });
    //           });
    
    //         }
    //       } else {
    //         console.log(error);
    //       }
    //     });
    //   }

    return (
        <>
            <div className="walker-contact-container">
                <div className="walker-header"><h2>Dog Information</h2></div>
                <form
                    className="walker-update-form"
                    id="walker-update-form"
                    // onSubmit={handleFormSubmit}
                >
                    {
                        dogs.map((dog, index) =>
                            <div key={index}>
                                <img src={'https://res.cloudinary.com/w-oo-f/image/upload/v1/' + dog.avatar} width="150"></img>
                                <div className="row-data">

                                    <input
                                        className="dog-info"
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        data-dogid={dog._id}
                                        onChange={handleInputChange}
                                        value={dog.name}
                                    />

                                    <input
                                        className="dog-info"
                                        type="text"
                                        name="breed"
                                        placeholder="Breed"
                                        data-dogid={dog._id}
                                        onChange={handleInputChange}
                                        value={dog.breed}
                                    />

                                    <input
                                        className="dog-weight"
                                        type="text"
                                        name="weight"
                                        placeholder="Weight"
                                        data-dogid={dog._id}
                                        onChange={handleInputChange}
                                        value={dog.weight}
                                    /><label className="weight-label">lbs.</label>
                                    <label className="treats-label">Dog Treats allowed</label>
                                    <select 
                                        className="treats-input" 
                                        id="walker-cities" 
                                        name="treats"
                                        data-dogid={dog._id} 
                                        value={dog.treats ? "true" : "false"}
                                        onChange={handleInputChange}
                                    >
                                        <>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </>
                                        {/* {console.log(dog.treats)}
                                        {dog.treats
                                            ? <><option selected value="true">Yes</option><option value="false">No</option></>
                                            : <><option value="true">Yes</option><option selected value="false">No</option></>
                                        } */}
                                    </select>
                                    
                                </div>
                                <div className="row-data">
                                <button 
                                    type="button"
                                    onClick={handleUpdateDog}
                                    data-dogid={dog._id} 
                                >
                                    Update
                                </button>
                                <button 
                                    type="button"
                                    onClick={handleRemoveDog}
                                    data-dogid={dog._id} 
                                >
                                    Remove
                                </button>
                                </div>
                            </div>
                        )}


                    {/* <div className="button-container">
                        <button
                            type="submit"
                            className="update-walker-button"
                            id="update-owner-profile-button"
                        >
                            UPDATE
                </button>
                    </div> */}
                </form>
                <ModalDisplay component={modalJSX} isOpen={modalOpen} closeModal={closeModal}/>
            </div>
        </>
    )
}

export default OwnerPetDetails;