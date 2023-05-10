import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./EventShow.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent, fetchEvents, getEvent } from "../../store/event";
import { useEffect, useState } from "react";
import WrappedMap from "../Map/Map";
import RatingVisualizer from "../RatingVisualizer/RatingVisualizer";
import PieChart from "../PieChart/PieChart";

const EventShow = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    // obj id of union sq 645a7bffc64b62d6212c51b5 
    const event = useSelector(getEvent(id))
    const location = event?.location;
    const [map, setMap] = useState(null);
    // console.log(location)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(()=> {
        // dispatch(fetchEvent(id))
        dispatch(fetchEvents())
    }, [dispatch, id])


    useEffect(() => {
        if (event) {
            document.title = `Smooth - ${event.title}`;
        }
    }, [event]);

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
                        <WrappedMap mapOptions={{ center: event?.location }} />
                    </div>
                    <div>
                        
                        <div className="rating">
                            <p className="sub-header">Price: {event?.avgPrice}</p>
                            <RatingVisualizer score={event?.avgPrice}/>
                        </div>

                        
                        <div className="rating">
                            <p className="sub-header">Rating: {event?.avgRating}</p>
                            <RatingVisualizer score={event?.avgRating} />
                        </div>
                    </div>
                    
                    <div className="chart">
                        <p className="sub-header">Time: {event?.avgTime} hours</p>
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
                        <h2>{idx + 1}.</h2>
                        <p>Rating: {review.rating}</p>
                        <p>Price: {review.price}</p>
                        <p>Time: {review.time}</p>
                        <p>{review.text}</p>
                    </div>
                ))}
            </div>
           
        </div>
    )
}

export default EventShow;