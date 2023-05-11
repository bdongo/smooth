import React from 'react';
import './Search.css'
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Search = () => {
  const [query, setQuery] = useState('')
  const [avgRating, setAvgRating] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [avgTime, setAvgTime] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (avgRating) params.append('rating', avgRating);
    if (avgPrice) params.append('price', avgPrice);
    if (avgTime) params.append('time', avgTime);
    if (query) params.append('query', query);
    window.location.href = `/search?${params}`
  }

  const resetForm = () => {
    setQuery('');
    setAvgRating('');
    setAvgPrice('');
    setAvgTime('');
  }

    return (
      <>
      <form onSubmit={handleSubmit}>
        <input
          id='search-bar'
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Search by location'
        />
      </form>
    <div className='advanced-search'>
      <div>ADVANCED SEARCH</div>
      <form onSubmit={handleSubmit}>
              <input
                placeholder='Price'
                type="number"
                value={avgPrice}
                onChange={(event) => setAvgPrice(event.target.value)}
              />
              <input
                placeholder='Rating'
                type="number"
                value={avgRating}
                onChange={(event) => setAvgRating(event.target.value)}
              />
              <input
                placeholder='Time'
                type="number"
                value={avgTime}
                onChange={(event) => setAvgTime(event.target.value)}
              />
            <div onClick={resetForm} id='reset-button'>RESET</div>
            <button type="submit">Search</button>
      </form>
    </div>
    </>
    );
  };


export default Search;

