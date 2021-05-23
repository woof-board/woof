import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Select from 'react-select';
import { UPDATE_WALKER_PROFILE } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_USER } from "../../utils/actions";
import ModalDisplay from '../ModalDisplay';
import { cities, neighbourhoods, validateInput } from '../../utils/helpers';


function WalkerDetails({ user }) {
    const [updateWalkerProfile, { error }] = useMutation(UPDATE_WALKER_PROFILE);
    const [state, dispatch] = useStoreContext();
    const [modalJSX, setModalJSX] = useState(<div />);
    const [modalOpen, setModalOpen] = useState();

    const [formData, setFormData] = useState({ 
        first_name: '', 
        last_name: '', 
        email: '',
        neighbourhoods: [],
        address_street: '',
        address_city: '',
        address_neighbourhood: '',
        address_province: '',
        address_postal_code:''
    });

    useEffect(() => {
        if (user) {
            const { first_name, last_name, email, neighbourhoods, address, status } = user;
            if(status === "PENDING_INFORMATION") {
                setFormData({
                    first_name,
                    last_name,
                    email,
                    neighbourhoods: [],
                    address_street: "",
                    address_city: "",
                    address_neighbourhood: "",
                    address_province: "",
                    address_postal_code: "",
                })
            } else {
                setFormData({
                    first_name,
                    last_name,
                    email,
                    neighbourhoods,
                    address_street: address.street,
                    address_city: address.city,
                    address_neighbourhood: address.neighbourhood,
                    address_province: address.province,
                    address_postal_code: address.postal_code,
                });
            }            
        }
    
    }, [user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ 
            ...formData, 
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        const { 
            first_name, 
            last_name,
            email,
            neighbourhoods,
            address_street, 
            address_city,
            address_neighbourhood,
            address_province,
            address_postal_code,
         } = formData;

         const neighbourhoodArr = address_city === "Toronto" ? neighbourhoods : []; 
         // Validation
         const errors = validateInput([
            {input_title: 'First Name', input_val: first_name, criteria: ['required']},
            {input_title: 'Last Name', input_val: last_name, criteria: ['required']},
            {input_title: 'Email', input_val: email, criteria: ['required','email']},
            {input_title: 'Street Name', input_val: address_street, criteria: ['required']},
            {input_title: 'City', input_val: address_city, criteria: ['required']},
            {input_title: 'Postal Code', input_val: address_postal_code, criteria: ['required']}
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
            const { data: { updateWalkerProfile: newProfile } } = await updateWalkerProfile({
                variables: {
                    input: {
                        first_name,
                        last_name,
                        email,
                        status: "ACTIVE",
                        neighbourhoods: neighbourhoodArr,
                        address: {
                            street: address_street,
                            city: address_city,
                            neighbourhood: address_neighbourhood,
                            province: address_province,
                            postal_code: address_postal_code,
                        }
                    }
                }
            });
            
            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: newProfile
            });

            setModalJSX(<div>Profile has been updated successfully!</div>);
            setModalOpen(true);
         } catch (e) {
             console.log(e);
         }
    };

    // const getNeighbourhoodOptions = () => {
    //     return neighbourhoods.map(neighbourhood=> {({value: neighbourhood?.toLowerCase(), label: neighbourhood })})
    // };
    const capitalize = (string) => {
        var neighbourhood = string.toLowerCase().split(" ");
        let finalNeighbourhood = "";
        for(var i = 0; i< neighbourhood.length; i++){
            neighbourhood[i] = neighbourhood[i][0].toUpperCase() + neighbourhood[i].slice(1);
            finalNeighbourhood += " " + neighbourhood[i]
        }
     return finalNeighbourhood.trim();
    }
    const getNeighbourhoodDefaultValues = () => {
        return formData?.neighbourhoods.map(neighbourhood=> ({value: neighbourhood?.toLowerCase(), label: capitalize(neighbourhood) }))
    };

    const closeModal = () => {
        setModalJSX(<div />);
        setModalOpen(false);
    };

    const handleNeighbourhoodSelect = (selectedOption) => {
        const selectedNieghbourhoods = selectedOption.map(option => option.value);
        setFormData({
            ...formData,
            neighbourhoods: [...selectedNieghbourhoods]
        });
    };

    const loadServiceArea = () => {
        let serviceArea =[]
        cities.map(city => {
            if (!city.group) {
                if(city.name==='Toronto') {
                    console.log (neighbourhoods);
                    neighbourhoods.map(neighbourhood => 
                        serviceArea.push({value: neighbourhood?.toLowerCase(), label: 'Toronto: '+ neighbourhood}))
                } else {
                    serviceArea.push({value: city.name?.toLowerCase(), label: city.name})
                }
            }
        })
        return serviceArea
    }


    return (
        <>
        <div className="walker-contact-container">
            <div className="walker-header"><h2>Personal Information</h2></div>
            <form
                className="walker-update-form"
                id="walker-update-form"
                onSubmit={handleFormSubmit}
            >
                <div className="row-data">
                    <input
                        className="profile-input profile-name"
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        onChange={handleInputChange}
                        value={formData.first_name}
                    />
                    <input
                        className="profile-input profile-name"
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        onChange={handleInputChange}
                        value={formData.last_name}
                    />
                </div>
                <div className="row-data">
                    <input
                        className="profile-input"
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        value={formData.email}
                    />
                </div>
                <h3>Service Areas</h3>
                <div className="row-data">
                    {
                        formData.address_city === "Toronto" &&
                        <Select 
                            className="profile-input street-input" 
                            options={loadServiceArea()} 
                            isMulti={true}
                            placeholder="What areas can you serve?"
                            onChange={handleNeighbourhoodSelect}
                            defaultValue={getNeighbourhoodDefaultValues()}
                        />
                    }
                    
                </div>
                <div><h3>Address</h3></div>
                <div className="row-data">
                    <input
                        className="profile-input street-input"
                        type="text"
                        name="address_street"
                        onChange={handleInputChange}
                        value={formData.address_street}
                    />
                </div>
                <div className="row-data">
                    <select 
                            className="profile-input profile-name" 
                            id="address_city" 
                            name="address_city"
                            onChange={handleInputChange}
                            value={formData.address_city}
                            placeholder="Choose your City"
                        >
                            {
                            cities.map(({name, group}, index) => 
                                (group 
                                    ? <optgroup key={index} label={name}></optgroup>
                                    : <option key={index} value={name}>{name}</option>
                                )
                            )
                            }
                        </select>
                    {/* <select 
                        className="profile-input profile-name" 
                        id="address_city" 
                        name="address_city"
                        onChange={handleInputChange}
                    >
                        {formData.address_city === "" 
                            ? <option value="choose" selected disabled>Choose your City</option>
                            : <option value="choose" disabled>Choose your City</option> 
                        }
                        
                        {
                        cities.map(({name, group}, index) => 
                            (group 
                                ? <optgroup key={index} label={name}></optgroup>
                                : name.toLowerCase() === formData.address_city.toLowerCase()
                                    ? <option selected="selected" value={name}>{name}</option>
                                    : <option value={name}>  {name}</option>
                            )
                        )
                        }
                    </select> */}
                {formData.address_city === "Toronto" &&
                    <select 
                        className="profile-input profile-name" 
                        id="address_neighbourhood" 
                        name="address_neighbourhood"
                        value={formData.address_neighbourhood}
                        onChange={handleInputChange}
                    >
                        <option value="choose" disabled>Choose your neighbourhood</option>
                        {
                            neighbourhoods.map( (neighbourhood, index) => 
                                <option key={index} value={neighbourhood}>{neighbourhood}</option>
                            )
                        }
                    </select>
                    
                }
                </div>
                <div className="row-data">
                    <input
                        className="profile-input"
                        type="text"
                        name="address_postal_code"
                        onChange={handleInputChange}
                        value={formData.address_postal_code}
                    />
                </div>
                <div className="button-container">
                    <button
                        type="submit"
                        id="update-walker-profile-button"
                    >
                        UPDATE
                    </button>
                </div>
            </form>
            <ModalDisplay component={modalJSX} isOpen={modalOpen} closeModal={closeModal}/>
        </div>
        </>
    )
}

export default WalkerDetails;