import { closeItinerary } from '../NavBar/NavBar';
import './Itinerary.css';
import { IoCloseSharp } from 'react-icons/io5';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAgenda } from '../../store/agendas';
import altlogo from '../../assets/altlogo.jpg';
import { Link } from 'react-router-dom';
import { BsPlusSquareDotted } from 'react-icons/bs';


const Itinerary = () => {
    const events = useSelector((state) => state.events);
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

        const eventID = event.dataTransfer.getData("text");
        const updatedItinerary = [...itinerary, eventID];
        if (eventID){
            const updatedTotalHours = updatedItinerary.reduce(
            (acc, eventID) => acc + events[eventID].avgTime, 0);
            const updatedTotalPrice = updatedItinerary.reduce(
            (acc, eventID) => acc + events[eventID].avgPrice,0);
            if (updatedTotalHours <= hoursAvailable && updatedTotalPrice <= cost) {
                setItinerary(updatedItinerary);
            } else {
                alert("The event cannot be added to your itinerary.");
            }
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user && itinerary.length > 0){
           const agenda = {
                user: user,
                events: itinerary
            } 
            dispatch(createAgenda(agenda));
            alert("Your itinerary has been saved!")
        }
        else {
            alert("No itinerary to save!");
        }
        
    }


    const removeEvent = (idx) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary.splice(idx, 1);
        setItinerary(updatedItinerary);
    };

    return (
        <div className='itinerary' 
            onDragOver={handleDragOver} 
            onDrop={event => handleDrop(event)}>

            <IoCloseSharp id='close-it' onClick={closeItinerary} />
            <div id='id-background' />
            <h2 id='it-header'>ITINERARY</h2>
        { user ? 
            <>
            <div id='it-settings'> 
                <div className='hours-input'>
                    <p>Hours Available</p>
                    <input type='number' 
                        value={hoursAvailable} 
                        onChange={(e) => setHoursAvailable(e.target.value)} 
                        placeholder='Hours Available'/>
                </div>
                <div className='price-input'>
                    <p>Budget</p>
                    <input type='number' 
                        value={cost} 
                        onChange={(e) => setCost(e.target.value)} 
                        placeholder='Budget'/>
                </div>
            </div>   
            <div className='time-frame' >
                <div className="instruction-message">
                   {itinerary.length === 0 && (
                    <>
                    <p>
                        1. Search for events to add to your itinerary 
                        <br />
                        <br />
                        2. Set your time frame and budget
                        <br />
                        <br />
                        3. Drag and drop here
                        <br />
                        <br />
                        4. Save when you're done!
                    </p>
                    <BsPlusSquareDotted id='drop-icon'/>
                    </>
                )} 
                </div>
                
                    {itinerary.map((eventID, idx) => (

                        <div key={idx} className='itinerary-event'>
                            <div className="image-container">
                                <img src={events[eventID].imageUrls[0] } className="image" />
                            </div>
                            <span className="details"> 
                                
                                <span className="title">{events[eventID].title}  </span>
                                <span>  ${events[eventID].avgPrice.toFixed(2)}  </span>
                                <span>  {events[eventID].avgTime.toFixed(2)} hrs</span>
                            </span>
                            <IoCloseSharp className='remove-icon' onClick={() => removeEvent(idx)} />
                        </div>
                    ))}
            </div>
            <div className='it-end'>
                <div className='end-details'>
                    <div>
                        Total Events: <p>{totalEvents}</p>
                    </div>
                    <div>
                        Total Price: <p>${totalPrice.toFixed(2)} </p>
                    </div>
                    <div>
                        Total Hours: <p>{totalHours.toFixed(2)} </p>
                    </div>
                </div>

                <button onClick={handleSubmit} className='submit'>Save Itinerary</button>
            </div>
            </>
            : 
            <> 
                <div className="please-log-in">
                    <div>
                        <img src={altlogo} alt='altlogo' id='altlogo'/>
                        <Link to='/login' id='please-log-in-button' onClick={closeItinerary}>LOG IN TO PLAN</Link>
                    </div>
                </div>
            </>
        }
        </div>
    )

}

export default Itinerary;