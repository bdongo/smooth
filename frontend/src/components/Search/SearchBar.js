import React from 'react';
import './Search.css'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from "../../store/event";
import { useParams } from 'react-router-dom'

const Search = () => {
  const queryInput = useParams();
  const [query, setQuery] = useState('')
  const [avgRating, setAvgRating] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [avgTime, setAvgTime] = useState('');
  const [events, setEvents] = useState(null);
  const [placeholder, setPlaceholder] = useState('Search by name or city') 
  const searchRef = useRef(null);
  const searchResultsRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(()=> {
    if (queryInput) {
      setQuery(queryInput)
    }
  }, [queryInput])


  const handleSubmit = (e) => {
    e.preventDefault();
    // /search?query=${}?avgRating=${}
    dispatch(fetchEvents(avgRating,avgPrice,avgTime, query))
  }

    return (
      <>
      <div clasName = "search-bar">
          <form onSubmit={handleSubmit}>
          <label>
            Search:
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label>
            Price
            <input
              type="number"
              value={avgPrice}
              onChange={(event) => setAvgPrice(event.target.value)}
            />
          </label>
          <label>
            Rating:
            <input
              type="number"
              value={avgRating}
              onChange={(event) => setAvgRating(event.target.value)}
            />
          </label>
          <label>
            Time:
            <input
              type="number"
              value={avgTime}
              onChange={(event) => setAvgTime(event.target.value)}
            />
          </label>
          <button type="submit">Search</button>
        </form>
    </div>
    </>
    );
  };


export default Search;

