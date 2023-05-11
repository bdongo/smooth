import './ExplorePage.css';
import { FaSearch } from 'react-icons/fa';
import feature1 from '../../assets/feature1.jpg';
import feature2 from '../../assets/feature2.jpg';
import feature3 from '../../assets/feature3.jpg';
import feature4 from '../../assets/feature4.jpg';
import feature5 from '../../assets/feature5.jpg';
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