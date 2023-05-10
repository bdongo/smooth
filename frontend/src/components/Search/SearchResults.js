import './SearchBar';
import './Search.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from "../../store/event";
import { Link } from 'react-router-dom';
import {useDrag} from 'react-dnd';

const SearchResults = () => {
    const events = useSelector(getEvents);

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
