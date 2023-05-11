import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, createReview } from '../../store/reviews';
import './ReviewForm.css';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const ReviewForm = () => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState('');
    const [price, setPrice] = useState('');
    const [time, setTime] = useState('');
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const currentUser = useSelector((state => state.session.user))
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const history = useHistory();
    const id = params.get('id')
    const event = useSelector((state) => state.events[id])

    console.log(currentUser);
    console.log(id, "event id")
    console.log(event, "event")
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentUser){
            

            console.log("submitted")

            const form = {
                rating: parseInt(rating),
                price: parseInt(price),
                time: parseInt(time),
                text,
                title,
                author: currentUser._id,
                event: id
            } 
            dispatch(createReview(form));
            setPrice('');
            setRating('');
            setTime('');
            alert("Review created successfully!")
            history.push(`/event/${id}`)
        }
        else {
            alert("Please log in to create a review!")
        }
        
    }
    return (
        <form onSubmit={handleSubmit} className='create-form'>
            <label>
                Rating:
                <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
            </label>
            <label>
                Price:
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <label>
                Time:
                <input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
            </label>
            <label> Comment:
                <textarea type="text" value={text} onChange={(e) => setText(e.target.value)} />
            </label>
            <label> Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <button type="submit">
                Create Review
            </button>

            
                
            

             
            
        </form>
    )
};
export default ReviewForm;