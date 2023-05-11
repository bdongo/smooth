import React from 'react';
import './Search.css'
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FaSearch } from 'react-icons/fa';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useEffect } from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';

const Search = () => {
  const [query, setQuery] = useState('')
  const [avgRating, setAvgRating] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [avgTime, setAvgTime] = useState('');
  const [ratingError, setRatingError] = useState('Rating');
  const [priceError, setPriceError] = useState('');
  const [timeError, setTimeError] = useState('')
  const dispatch = useDispatch();
  const history = useHistory();
  
  const toggleAdvancedSearch = () => {
    const advancedSearch = document.querySelector('.advanced-search');
    if (advancedSearch.style.display === 'none' || advancedSearch.style.display === '') {
      advancedSearch.style.display = 'flex';
    }
    else {
      advancedSearch.style.display = 'none';
    }
  }

  useEffect(()=> {
    const priceBar = document.querySelector('#search-price-bar')
    if(avgPrice > 100 || avgPrice < 1 && avgPrice !== ''){
      setPriceError('Price must be between $1 and $100')
      priceBar.style.border = 'solid'
      priceBar.style.borderColor = 'red'
    } else {
      setPriceError('Price')
      priceBar.style.border = 'none'
    }
  }, [avgPrice])

  useEffect(()=> {
    const input = document.querySelector('#search-rating-bar')
    if(avgRating > 5 || avgRating < 1 && avgRating !== '') {
      setRatingError('Rating must be between 1 and 5')
      input.style.border = 'solid';
      input.style.borderColor = 'red';
    } else {
      setRatingError('Rating')
      input.style.border = 'none';
    }
  }, [avgRating])


  useEffect(()=> {
    const input = document.querySelector('#search-time-bar')
    if(avgTime > 4 || avgTime < 1 && avgTime !== '') {
      setTimeError('Time must be between 1 and 4 hours')
      input.style.border = 'solid'
      input.style.borderColor = 'red'
    } else {
      setTimeError('Time')
      input.style.border = 'none';
    }
  }, [avgTime])

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(ratingError || priceError || timeError) return;
    const params = new URLSearchParams();
    if (avgRating) params.append('rating', avgRating);
    if (avgPrice) params.append('price', avgPrice);
    if (avgTime) params.append('time', avgTime);
    if (query) params.append('query', query);
    window.location.href = `/search?${params}`

    const advancedSearch = document.querySelector('.advanced-search');
    advancedSearch.style.display = 'none';
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
          <FaSearch id='search-icon' />
          <AiOutlinePlusCircle id='plus-icon' onClick={toggleAdvancedSearch}/>
      </form>
    <div className='advanced-search'>
      <div>ADVANCED SEARCH</div>
      <form id='advanced-search-inputs' onSubmit={handleSubmit}>
              <input
                id='search-price-bar'
                placeholder='Price'
                type="number"
                value={avgPrice}
                onChange={(event) => setAvgPrice(event.target.value)}
              />
              <input
                id='search-rating-bar'
                placeholder='Rating'
                type="number"
                value={avgRating}
                onChange={(event) => setAvgRating(event.target.value)}
              />
              <input
                id='search-time-bar'
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

