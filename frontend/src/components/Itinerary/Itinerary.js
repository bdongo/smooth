// import { closeItinerary } from '../NavBar/NavBar';
import './Itinerary.css';
import { IoCloseSharp } from 'react-icons/io5';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAgenda, editAgenda, saveAgenda, reviseAgenda, getLiveAgenda, fetchLiveAgenda, fetchAgendas } from '../../store/agendas';
import altlogo from '../../assets/altlogo.jpg';
import { Link } from 'react-router-dom';
import { BsPlusSquareDotted } from 'react-icons/bs';
import { useEffect } from 'react';


const Itinerary = ({closeItinerary, itineraryOpen}) => {
    const events = useSelector((state) => state.events);
    const [itinerary, setItinerary] = useState([]);
    const [toggle, setToggle] = useState(true) //true = populate, false = delete
    
    const totalHours = itinerary?.length > 0 ? itinerary?.reduce((acc, event) => acc + event.avgTime, 0) : 0;
    const totalPrice = itinerary?.length > 0 ? itinerary?.reduce((acc, event) => acc + event.avgPrice, 0) : 0;
    const totalEvents = itinerary?.length;

    const dispatch = useDispatch();
    const [hoursAvailable, setHoursAvailable] = useState(8);
    const [cost, setCost] = useState(100);
    const [instructions, setInstructions] = useState(false)

    const user = useSelector((state) => state?.session?.user);

    const agenda = useSelector(getLiveAgenda)

    useEffect(()=> {
        if (user) {
            dispatch(fetchAgendas(user?._id))
        }
    }, [dispatch, user])

    useEffect(()=> {
        if (agenda && Object.keys(events).length !== 0) {
            const events = agenda?.events
            setItinerary(events)
            setHoursAvailable(agenda.time)
            setCost(agenda.budget)
        } 
        // else if ( !agenda && user) {
        //     dispatch(createAgenda(user?._id))
        // }
    }, [agenda, events])

    useEffect(()=> {

    }, [itinerary])

    useEffect(()=> {
        if (itinerary?.length !== 0){
            setInstructions(true)
        } else {
            setInstructions(false)
        }
    }, [itinerary])

    console.log(instructions)

    useEffect(()=> {
        if (hoursAvailable !== agenda?.time || cost !== agenda?.budget){
            console.log(agenda)
            dispatch(reviseAgenda(agenda, hoursAvailable, cost))
        };
    }, [hoursAvailable, cost]);


    const handleDrop = (e) => {
        e.preventDefault();

        const eventId = e.dataTransfer.getData("text");
        const event = events[eventId]
        const newAgenda = [...itinerary, event]
        if (event){
            const updatedTotalHours = newAgenda.reduce(
            (acc, event) => acc + event.avgTime, 0);
            const updatedTotalPrice = newAgenda.reduce(
            (acc, event) => acc + event.avgPrice, 0);
            if (!agenda && user) {
                dispatch(createAgenda(user?._id), event)
            }
            else if (updatedTotalHours <= hoursAvailable && updatedTotalPrice <= cost ) {
                setItinerary(newAgenda)
                dispatch(editAgenda(agenda, newAgenda))
            } else {
                alert("The event cannot be added to your itinerary.");
            };
        };
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user && itinerary.length > 0) {
            dispatch(saveAgenda(agenda))
            setTimeout(()=> {
                alert("Your itinerary has been saved!")
                setItinerary([])
                dispatch(createAgenda(user?._id))
            }, 1000)
        } else {
            alert("No itinerary to save!");
        };
    };


    const removeEvent = (idx) => {
        const updatedItinerary = [...itinerary];
        if(updatedItinerary.length === 1) {
            setItinerary([])
            console.log('hitting')
            dispatch(editAgenda(agenda, []));
        } else {
            updatedItinerary.splice(idx, 1);
            setItinerary(updatedItinerary);
            dispatch(editAgenda(agenda, updatedItinerary));
        };
        console.log(updatedItinerary.length, 'len inside')
        console.log(itinerary, 'itin inside')
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
                   {!instructions && (
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
                
                    {itinerary?.map((event, idx) => (

                        <div key={idx} className='itinerary-event'>
                            <div className="image-container">
                                <img src={event?.imageUrls[0] } className="image" />
                            </div>
                            <span className="details"> 
                                
                                <span className="title">{event.title}  </span>
                                <span>  ${event.avgPrice.toFixed(2)}  </span>
                                <span>  {event.avgTime.toFixed(2)} hrs</span>
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