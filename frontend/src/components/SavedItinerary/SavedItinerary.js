import './SavedItinerary.css';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { MdLocationPin } from 'react-icons/md';

const SavedItinerary = ({itinerary}) => {
    return (
        <div className="saved-itinerary">
            {itinerary.events.map((event, idx) => 
                <Link to={`/event/${event._id}`} className='saved-card-link'>
                    <div className="saved-card" >
                        <img src={event.imageUrls[0]} />
                        <div id='saved-card-star'>{event.avgRating.toFixed(0)} <AiFillStar /> </div>
                        <div className='saved-card-body'>
                            <h2>{event.title}</h2>
                            <div id='saved-card-details'>
                                <div>
                                    <p> <MdLocationPin />{event.address.city}</p>
                                </div>
                                <div>
                                    <p>${event.avgPrice.toFixed(2)}</p>
                                    <p> {event.avgTime.toFixed(2)} hours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            )}

        </div>
    )
}

export default SavedItinerary;
