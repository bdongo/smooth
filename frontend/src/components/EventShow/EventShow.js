import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./EventShow.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent, fetchEvents, getEvent } from "../../store/event";
import { useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from '../Map/Map'
import RatingVisualizer from "../RatingVisualizer/RatingVisualizer";
import PieChart from "../PieChart/PieChart";
import PricingVisualizer from "../RatingVisualizer/PriceVisualizer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { removeReview } from "../../store/reviews";

const EventShow = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    // obj id of union sq 645a7bffc64b62d6212c51b5 
    const event = useSelector(getEvent(id))
    const currentUser = useSelector((state) => state.session.user)
    const location = event?.location;
    const [map, setMap] = useState(null);
    // console.log(location)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(()=> {
         dispatch(fetchEvent(id))
       // dispatch(fetchEvents())
    }, [dispatch, id, event.reviews.length])


    useEffect(() => {
        if (event) {
            document.title = `Smooth - ${event.title}`;
        }
    }, [event]);


    const deleteReview = (reviewID) => {
        dispatch(removeReview(reviewID))
    }

    return (
        <div className="show-page">
            <div className="show-page-top">
                <div className="show-page-img-container">
                        <img src={event?.imageUrls[0]} />
                        <div className="set-title">
                            <h2 className="show-page-text">{event?.title}</h2>
                        </div>
                        <img src={event?.imageUrls[1]} />
                </div>
                <div className="ratings-container">
                    <div id="map">
                        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
                            <Map mapOptions={ {center: location}} />
                        </Wrapper>
                    </div>
                    <div>
                        <div className="rating">
                            <p className="sub-header">Average rating: {event?.avgRating.toFixed(2)}</p>
                            <RatingVisualizer score={event?.avgRating} />
                        </div>

                        <div className="rating">
                            <p className="sub-header">Average amount spent: ${event?.avgPrice.toFixed(2)}</p>
                            <PricingVisualizer score={event?.avgPrice}/>
                        </div>
                    </div>
                    
                    <div className="chart">
                        <p className="sub-header">Average time spent: {event?.avgTime.toFixed(2)} hours</p>
                        <PieChart value={event?.avgTime} />
                    </div>
                </div>
            </div>
            <div className="show-page-info-container">
                <ul className="show-page-text address">
                    <li className="sub-header">{event?.address.street}</li>
                    <li>{event?.address.city}, {event?.address.state}</li>
                    <li>{event?.address.zipcode}</li>
                </ul>
                
                <p className="show-page-text about">{event?.description}</p>
            </div>
                

            <div className="review-container">
                {event?.reviews?.map((review, idx) => (
                    <div key={idx} className="review show-page-text">
                        <p className="show-page-text">{review.text}</p>
                        <div>
                        <p className="sub-header">
                            Rating: <RatingVisualizer score={review.rating} />
                        </p>
                        <p className="sub-header">
                            Price: <PricingVisualizer score={review.price} />
                        </p>
                        <p className="sub-header">
                            Time: <PieChart value={review.time} />
                        </p>
                        </div>
                        {currentUser && (currentUser._id === review.author) && (
                            <button className="remove-icon" onClick={() => deleteReview(review._id)}>
                                Remove Review
                            </button>
                        )}
                        
                    </div>
                    
                ))}
            </div>
            <Link to={`/newReview?id=${id}`}>
                Make a Review
            </Link>
        </div>
    )
}

export default EventShow;