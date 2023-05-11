import { closeItinerary } from '../NavBar/NavBar';
import './Itinerary.css';
import { IoCloseSharp } from 'react-icons/io5';
import {useDrop} from 'react-dnd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAgenda } from '../../store/agendas';


const Itinerary = () => {
    const events = useSelector((state) => state.events);
    const [plannedEvents, setPlannedEvents] = useState([]);
    const [itinerary, setItinerary] = useState([]);
    const totalHours = itinerary.reduce((acc, eventID) => acc + events[eventID].avgTime, 0);
    const totalPrice = itinerary.reduce((acc, eventID) => acc + events[eventID].avgPrice, 0);
    const totalEvents = itinerary.length;
    const dispatch = useDispatch();
    const [hoursAvailable, setHoursAvailable] = useState(8);
    const [cost, setCost] = useState(100);

    const user = useSelector((state) => state.session.user);

    const handleDrop =(event) => {
        event.preventDefault();
        if (totalHours <= hoursAvailable && totalPrice <= cost){ 
            const eventID = event.dataTransfer.getData("text");
            console.log("dropped event id: ", eventID);
            setItinerary([...itinerary, eventID]);
        }
    }

    console.log("itinerary: ", itinerary);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user){
           const agenda = {
                user: user,
                events: itinerary
            } 
            dispatch(createAgenda(agenda));
        }
        else {
            alert("Please log in to save your itinerary");
        }
        
    }

    const removeEvent = (eventID) => {
       // setItinerary(itinerary.filter((id) => id !== eventID));
        const eventIndex = itinerary.findIndex((id) => id === eventID);
        if (eventIndex !== -1) {
            const updatedItinerary = [...itinerary];
            updatedItinerary.splice(eventIndex, 1);
            setItinerary(updatedItinerary);
        }
    };

    return (
        <div className='itinerary' 
            onDragOver={handleDragOver} 
            onDrop={event => handleDrop(event)}>

            <IoCloseSharp id='close-it' onClick={closeItinerary} />
            <div className='welcome'>
                Welcome
            </div>
            <div className='hours-input'>
                <label>Hours Available: </label>
                <input type='number' value={hoursAvailable} onChange={(e) => setHoursAvailable(e.target.value)} />
            </div>
            <div className='price-input'>
                <label>Your Day's Budget: </label>
                <input type='number' value={cost} onChange={(e) => setCost(e.target.value)} />
            </div>
            <div className='time-frame' >
                    {itinerary.map((eventID, idx) => (
                        <div key={idx} className='itinerary-event' draggable>
                            <div className="image-container">
                                <img src={events[eventID].imageUrls[0] } className="image" />
                            </div>
                            
                            
                            
                            <span className="details">
                                
                                <IoCloseSharp className='remove-icon' onClick={() => removeEvent(eventID)} />
                                <span className="title">{events[eventID].title}  </span>
                                <span>  ${events[eventID].avgPrice.toFixed(2)}  </span>
                                <span>  {events[eventID].avgTime.toFixed(2)} hrs</span>
                            </span>
                            
                        </div>
                    ))}
            </div>
            <div>
                <div>
                    Total Events: {totalEvents}
                </div>
                <div>
                    Total Price: ${totalPrice.toFixed(2)}
                </div>
                <div>
                    Total Hours: {totalHours.toFixed(2)}
                </div>
            </div>

            <button onClick={handleSubmit} className='submit'>Save Itinerary</button>


        </div>
    )

}

export default Itinerary;