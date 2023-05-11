import './SearchBar';
import './Search.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents, fetchEvents } from "../../store/event";
import { Link } from 'react-router-dom';
import {useDrag} from 'react-dnd';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


const SearchResults = () => {
    const events = useSelector(getEvents);
    const dispatch = useDispatch();
    const location = useLocation();
    console.log(location);

    const params = new URLSearchParams(location.search)
    const query = params.get('query');
    console.log(query);
    const price = params.get('price');
    const time = params.get('time');
    const rating = params.get('rating');

    useEffect(() => {
        if (!query && !price && !time && !rating) return;
        console.log('fetching events');
        dispatch(fetchEvents(rating, price, time, query));
    }, [query ,price, time, rating]);

    const handleDragStart = (e, eventId) => {
        e.stopPropagation();
        e.dataTransfer.setData('text/plain', eventId);
        console.log('dragging', eventId);
    };

    return (
        <>
        <div className = "search-results">
            {events.map((event,idx) => (
                <Link to={`/event/${event._id}`} className='card-link'>
                    <div className="card" draggable onDragStart={(e) => handleDragStart(e, event._id)}>
                    <img src={event.imageUrls[0]}/>
                        <div className = 'card-body'>
                            <h2>{event.title}</h2>
                            <p>${event.avgPrice.toFixed(2)}</p>
                            <p> {event.avgTime.toFixed(2)} hours</p>
                            <p>{event.avgRating.toFixed(0)}</p>
                        </div>
                </div>
                </Link>
            ))}
        </div>
        </>
    )
}

export default SearchResults;
