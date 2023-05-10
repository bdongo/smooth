import { closeItinerary } from '../NavBar/NavBar';
import './Itinerary.css';
import { IoCloseSharp } from 'react-icons/io5';
import {useDrop} from 'react-dnd';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Itinerary = () => {
    const events = useSelector((state) => state.events);
    const [plannedEvents, setPlannedEvents] = useState([]);
    const [itinerary, setItinerary] = useState([]);

    
   

    const handleDrop =(event) => {
        event.preventDefault();
        const eventID = event.dataTransfer.getData("text");
        console.log("dropped event id: ", eventID);
        setItinerary([...itinerary, eventID]);
        
    }
    console.log("itinerary: ", itinerary);
    const handleDragOver = (e) => {
        e.preventDefault();
    };


    return (
        <div className='itinerary' 
            onDragOver={handleDragOver} 
            onDrop={event => handleDrop(event)}>

            <IoCloseSharp id='close-it' onClick={closeItinerary} />
            <div className='welcome'>
                Welcome
            </div>
            <div className='time-frame' >
                    {itinerary.map((eventID, idx) => (
                        <div key={idx} className='itinerary-event' draggable>
                            <span className="title">{events[eventID].title}  </span> 
                            <span className="details">
                                Cost: ${events[eventID].avgPrice.toFixed(2)}    Time: {events[eventID].avgTime.toFixed(2)} hrs
                            </span>
                        </div>
                    ))}
            </div>
            <div>
                <div>
                    Total Events: {itinerary.length}
                </div>
                <div>
                    Total Price: ${itinerary.reduce((acc, eventID) => acc + events[eventID].avgPrice, 0).toFixed(2)}
                </div>
                <div>
                    Total Hours: {itinerary.reduce((acc, eventID) => acc + events[eventID].avgTime, 0).toFixed(2)}
                </div>
            </div>

            <button>Save Itinerary</button>


        </div>
    )

}

export default Itinerary;