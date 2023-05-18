import './SearchBar';
import './Search.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents, fetchEvents } from "../../store/event";
import { Link } from 'react-router-dom';
import {useDrag} from 'react-dnd';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Search from './SearchBar';
import { AiFillStar } from 'react-icons/ai';
import { MdLocationPin } from 'react-icons/md';
import { getAgendas, fetchAgendas } from '../../store/agendas';


const SearchResults = ({itineraryOpen, openItinerary}) => {
    const events = useSelector(getEvents);
    const dispatch = useDispatch();
    const location = useLocation();
    
    const params = new URLSearchParams(location.search)
    const query = params.get('query');
    const price = params.get('price');
    const time = params.get('time');
    const rating = params.get('rating');

    useEffect(() => {
        const searchResults = document.querySelector('.search-results')
        if (itineraryOpen) {
            searchResults.style.gridTemplateColumns = 'repeat(2, 1fr)';
            searchResults.style.width = "60%";
            searchResults.style.rowGap = '5vh';

        } else {
            searchResults.style.removeProperty('grid-template-columns');
            searchResults.style.removeProperty('row-gap');
            searchResults.style.removeProperty('width')
        }
    }, [itineraryOpen])

    useEffect(() => {
        if (!query && !price && !time && !rating) return;
        dispatch(fetchEvents(rating, price, time, query));
    }, [query ,price, time, rating]);

    const handleDragStart = (e, eventId) => {
        e.stopPropagation();
        e.dataTransfer.setData('text/plain', eventId);
        openItinerary()
    };

    return (
        <>
        <div className="search-results-header">
            <div className='search-results-bar'>
                <Search />
            </div>
        </div>
        <h2 id='search-title'>Search Results</h2>
        <div className = "search-results">
            {
            events.length === 0 ? <h2 id='no-results'>No results found</h2> :
            
            events.map((event,idx) => (
                <Link to={`/event/${event._id}`} className='card-link'>
                    <div className="card" draggable onDragStart={(e) => handleDragStart(e, event._id)}>
                    <img src={event.imageUrls[0]}/>
                        <div id='card-star'>{event.avgRating.toFixed(0)} <AiFillStar /> </div>
                        <div className = 'card-body'>
                            <h2>{event.title}</h2>
                            <div id='card-details'> 
                                <div> 
                                    <p> <MdLocationPin/>{event.address.city}</p>
                                </div>
                                <div> 
                                    <p>${event.avgPrice.toFixed(2)}</p>
                                    <p> {event.avgTime.toFixed(2)} hours</p>
                                </div>
                            </div>
                        </div>
                </div>
                </Link>
            ))}
        </div>
        </>
    )
}

export default SearchResults;
