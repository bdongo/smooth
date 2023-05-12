import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editReview } from '../../store/reviews';
import './UpdateForm.css';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchEvent } from '../../store/event';

const ReviewForm = () => {
    const dispatch = useDispatch();

    const [rating, setRating] = useState('');
    const [price, setPrice] = useState('');
    const [time, setTime] = useState('');
    const [text, setText] = useState('');
    const currentUser = useSelector((state => state.session.user))
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const history = useHistory();
    const id = params.get('eventid')
    const reviewId = params.get('id')
    
    const event = useSelector((state) => state.events[id])



    useEffect(() => {
        dispatch(fetchEvent(id))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentUser) {
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
            alert("Review updated successfully!")
            history.push(`/event/${id}`)
        }
        else {
            alert("Please log in to update the review!")
        }

    }
    return (
        <form onSubmit={handleSubmit} className='update-form'>
            <div className = "form-details">
                 <h2 className="headings">Write your review</h2>
                <textarea className = "comments-box" type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <h2 className="headings">How would you rate this experience?</h2>
                <input className = "ratings-box" type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
                <h2 className="headings">What was the estimated price for this experience?</h2>
                <input className = "prices-box" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                <h2 className="headings">How much time (hours) did the experience take?</h2>
                <input className ="time-box"type="text" value={time} onChange={(e) => setTime(e.target.value)} />
                <br></br>
                <button type="submit" className="button">
                Update Review
                </button>
            </div>

            <div className="right-side">
                <h1 id="header">Tell us, how was your experience? </h1>
                {event && <img src={event?.imageUrls[0]} alt="Event Image" id="image" />}

            </div>
        </form>
    )
};
export default ReviewForm;