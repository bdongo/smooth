import { closeItinerary } from '../NavBar/NavBar';
import './Itinerary.css';
import { IoCloseSharp } from 'react-icons/io5';

const Itinerary = () => {


    const handleDrop =(event) => {
        event.preventDefault();
    }
    
    return (
        <div className='itinerary' onDrop={event => handleDrop(event)}>
            <IoCloseSharp id='close-it' onClick={closeItinerary} />
            <div className='welcome'>
                Welcome
            </div>
            <div className='time-frame' >

            </div>
            <div>
                <div>
                    Total Events
                </div>
                <div>
                    Total Price
                </div>
                <div>
                    Total Hours
                </div>
            </div>

            <button>Save Itinerary</button>


        </div>
    )

}

export default Itinerary;