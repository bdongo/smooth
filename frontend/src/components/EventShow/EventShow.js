import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./EventShow.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent, fetchEvents, getEvent } from "../../store/event";
import { useEffect } from "react";

const EventShow = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    // obj id of union sq 645a7bffc64b62d6212c51b5 
    const event = useSelector(getEvent(id))

    useEffect(()=> {
        dispatch(fetchEvent(id))
        // dispatch(fetchEvents())
    }, [dispatch, id])


    return (
        <div className="show-page">

            <div className="show-page-img-container">
                {   event?.imageUrls.map((image, idx) => (
                    <img key={idx} src={image} />
                ))
                }
            </div>
            <div className="set-title">
                <h2 className="show-page-text">{event?.title}</h2>
            </div>
            <ul className="show-page-text">
                <li>{event?.address.street}</li>
                <li>{event?.address.city}</li>
                <li>{event?.address.state}</li>
                <li>{event?.address.zipcode}</li>
            </ul>
            <p>{event?.description}</p>

        </div>
    )
}

export default EventShow;