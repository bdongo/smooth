import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./EventShow.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent, fetchEvents, getEvent } from "../../store/event";
import { useEffect, useState } from "react";

const EventShow = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    // obj id of union sq 645a7bffc64b62d6212c51b5 
    const event = useSelector(getEvent(id))
    const location = event?.location;
    const [map, setMap] = useState(null);
    console.log(location)

    useEffect(()=> {
        // dispatch(fetchEvent(id))
        dispatch(fetchEvents())
    }, [dispatch, id])

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCjrBYUMZ1OmEPxs7ElpcNPPZ_HqC0vc60`;
        script.onload = () => {
            if (location) {
                const map = new window.google.maps.Map(document.getElementById("map"), {
                    center: { lat: location.lat, lng: location.lng },
                    zoom: 13,
                });
                const marker = new window.google.maps.Marker({
                    position: { lat: location.lat, lng: location.lng },
                    map: map,
                    title: `${event?.title}`,
                });
                setMap(map);
            }
        };
        document.body.appendChild(script);
    }, [location]);

    return (
        <div className="show-page">

            <div className="show-page-img-container">
                    <img src={event?.imageUrls[0]} />
                    <div className="set-title">
                        <h2 className="show-page-text">{event?.title}</h2>
                    </div>
                    <img src={event?.imageUrls[1]} />
            </div>
            <div className="show-page-info-container">
                <ul className="show-page-text address">
                    <li className="bold">{event?.address.street}</li>
                    <li>{event?.address.city}, {event?.address.state}</li>
                    <li>{event?.address.zipcode}</li>
                </ul>
                <p className="show-page-text about">{event?.description}</p>
            </div>
            <div id="map"></div>
        </div>
    )
}

export default EventShow;