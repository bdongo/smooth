import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editReview } from '../../store/reviews';
import './UpdateForm.css';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchEvent } from '../../store/event';
import { AiFillStar } from 'react-icons/ai';

const UpdateForm = () => {
    const dispatch = useDispatch();

    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const history = useHistory();
    const id = params.get('eventid')
    const reviewId = params.get('id')
    const event = useSelector((state) => state.events[id])
    const reviews = event?.reviews || [];
    let thisReview = reviews.find((review) => review._id === reviewId)
    const [rating, setRating] = useState(thisReview?.rating);
    const [activeRating, setActiveRating] = useState(thisReview?.rating);
    const [price, setPrice] = useState(thisReview?.price);
    const [time, setTime] = useState(thisReview?.time);
    const [text, setText] = useState(thisReview?.text);
    const currentUser = useSelector((state => state.session.user))

    const [ratingError, setRatingError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [textError, setTextError] = useState('');
    const [textBoxError, setTextBoxError] = useState('');
    const [flashMessage, setFlashMessage] = useState('');

    useEffect(() => {
        dispatch(fetchEvent(id))
    }, [])

    const starRating = () => {
        const hoverRating = activeRating || rating;

        const handleHover = (hoverRating) => {
            setActiveRating(hoverRating);
        };

        const handleClick = (clickedRating) => {
            setRating(clickedRating);
            setActiveRating(clickedRating);
        };

        return (
            <>
                {[1, 2, 3, 4, 5].map((index) => {
                    return (
                        <AiFillStar
                            key={index}
                            id='form-star'
                            className={
                                hoverRating >= index ? "filled-star" : "empty-star"
                            }
                            onMouseEnter={() => handleHover(index)}
                            onMouseLeave={() => handleHover(null)}
                            onClick={() => handleClick(index)}
                        />
                    );
                })}
            </>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentUser) {

            if (!rating || !text || !time || !price) {
                setTextError('Please fill in all the fields');
                return;
            } else {
                setTextError('');
            }

            if (rating > 5 || rating < 1) {
                setRatingError('Please enter a rating between 1 and 5');
                return;
            } else {
                setRatingError('');
            }

            if (price < 1 || price > 100) {
                setPriceError('Please enter a price between $1 and $100');
                return;
            } else {
                setPriceError('');
            }

            if (text.length > 255 || text.length < 1) {
                setTextBoxError('Please ensure the review is less than 255 characters');
                return;
            } else {
                setTextError('');
            }

            if (time < 1 || time > 8) {
                setTimeError('Please enter the time between 1 and 8 hours');
                return;
            } else {
                setTimeError('');
            }
            const form = {
                _id: reviewId,
                rating: parseInt(rating),
                price: parseInt(price),
                time: parseInt(time),
                text,
                author: currentUser._id,
                event: id
            }
            dispatch(editReview(form));
            setPrice('');
            setRating('');
            setTime('');
            setText('');
            setFlashMessage('Review updated successfully! Redirecting to event page...');
            setTimeout(() => {
                setFlashMessage('');
                history.push(`/event/${id}`);
            }, 3000);
        }
        else {
            alert("Please log in to update the review!")
        }

    }
    return (
        <form onSubmit={handleSubmit} className='update-form'>
            <div className='review-form'> 
                <div className = "form-details">
                    <h2 className="headings" id='first-header'>Edit your review</h2>
                    <textarea className = "comments-box" type="text" value={text} onChange={(e) => setText(e.target.value)} />
                    {textBoxError && <div className="error">{textBoxError}</div>}
                    <h2 className="headings">How would you rate this experience?</h2>
                    <div className="star-rating">
                        {/* <input className="star" type="radio" id="star5" name="rating" value="5" onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="star5"></label>
                        <input className="star" type="radio" id="star4" name="rating" value="4" onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="star4"></label>
                        <input className="star" type="radio" id="star3" name="rating" value="3" onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="star3"></label>
                        <input className="star" type="radio" id="star2" name="rating" value="2" onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="star2"></label>
                        <input className="star" type="radio" id="star1" name="rating" value="1" onChange={(e) => setRating(e.target.value)} />
                        <label htmlFor="star1"></label> */}
                        {starRating()}
                    </div>
                    {ratingError && <div className="error">{ratingError}</div>}
                    <h2 className="headings">What was the estimated price for this experience?</h2>
                    <input className = "prices-box" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                    {priceError && <div className="error">{priceError}</div>}
                    <h2 className="headings">How much time (hours) did the experience take?</h2>
                    <input className ="time-box"type="text" value={time} onChange={(e) => setTime(e.target.value)} />
                    {timeError && <div className="error">{timeError}</div>}
                    <br></br>
                    <button type="submit" className="button">
                    Update Review
                    </button>
                </div>
            </div>

            {/* <div className="right-side">
                <h1 id="header">Tell us, how was your experience? </h1>
                {event && <img src={event?.imageUrls[0]} alt="Event Image" id="image" />}

            </div> */}
            {flashMessage && <div className='flash-message'>

                {flashMessage}

            </div>}
        </form>
    )
};
export default UpdateForm;