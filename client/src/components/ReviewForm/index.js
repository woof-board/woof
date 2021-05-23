import React, {useState} from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_REVIEW } from '../../utils/mutations';
import StarRatings from 'react-star-ratings';
import { RatingIconSVG } from '../../utils/helpers'
import { useStoreContext } from "../../utils/GlobalState";


const ReviewForm = ({ walker_id, closeModal }) => {
    const [formData, setFormData] = useState({
        review_text: "",
        rating: 5
    });

    const [message, setMessage] = useState("");
    const [addReview, { error }] = useMutation(ADD_REVIEW);

    // update state based on form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        setFormData({ 
            ...formData, 
            [name]: value
        });
    };
    
    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();
        
        if (formData.review_text.trim() === "") {
            setMessage("Comment field cannot be blank!");
            setTimeout(() => {
                setMessage("");
            }, 2000); 
            return;
        }

        try {
            await addReview({
                variables: {
                    input: {
                        walker_id,
                        rating: formData.rating,
                        review_text: formData.review_text
                    }
                }
            });

            setMessage("Review has been added to Walker's profile!");
            setTimeout(() => {
                setMessage("");
                closeModal();
            }, 3000);
            
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="walker-contact-container">
            <div className="walker-header"><h4>Leave a comment...</h4></div>

            <form
                className="user-update-form"
                onSubmit={handleFormSubmit}
            > 
                <textarea
                    placeholder="Leave a comment..."
                    rows={6}
                    name="review_text"
                    value={formData.review_text}
                    onChange={handleInputChange}
                ></textarea>
                
                <h6>Rate the walker</h6>
                <div className="row-data">
                    <StarRatings
                        rating= {formData.rating}
                        starDimension="15px"
                        starSpacing="2px"
                        starRatedColor="#254e9b"
                        starEmptyColor="#98b4e7"
                        starHoverColor="#266e34"
                        svgIconViewBox={RatingIconSVG.box}
                        svgIconPath={RatingIconSVG.coords}
                        changeRating={newRating => setFormData({...formData, rating: newRating})}
                    />
                </div>
                
                <button 
                    type="submit"
                >
                    Submit
                    </button>
            </form>
            {message !== "" && 
                <p>{message}</p>
            }
            {error && <div>Something went wrong...</div>}
        </div>
    );
}

export default ReviewForm;