import './ExplorePage.css';
import { FaSearch } from 'react-icons/fa';
import Search from '../Search/SearchBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSplashEvents, getEvents } from '../../store/event';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';



function ExplorePage() {
    const dispatch = useDispatch();
    const events = useSelector(getEvents)
   
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(()=> {
        dispatch(fetchSplashEvents());
        document.title = `Smooth - Explore`;
    }, []);

    useEffect(() => () => document.title = `Smooth`, []);

    return (
        <> 
        <div className="explore-page">
            <div className='splash-1-overlay'></div>
            <h2>What are you looking for?</h2>
            <div className='explore-page-header'>
                <Search/>
            </div>
        </div>
        <div className='explore-2'>
            <div className='featured-experiences'>
                <h2>Featured Experiences</h2>
                <div className='featured-experiences-container'>
                    {   events?.map((event, idx) => (
                        <Link  className="event-link" to={`/event/${event._id}`} >
                            <img key={idx} src={event?.imageUrls[0]} alt='feature1' />
                        </Link>
                    ))}
                </div>
            </div>
        </div>

        </>
    )
}

export default ExplorePage;