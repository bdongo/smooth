import './SplashPage.css'; 
import scroll3pic from '../../assets/scroll3pic.jpg';
import { useHistory } from 'react-router-dom';

function Scroll3() {
    const history = useHistory();

    return (
        <div className="scroll-3">
            <div className='scroll-3-wrapper'>
                <div className="scroll-3-text">
                    <div id='scroll-3-header'>Create your itinerary</div>
                    <div id='scroll-3-p'>Drag and drop experiences into your itinerary.
                        We'll calculate your total expenses and time so you can plan
                        your perfect trip.
                    </div>
                    <button className='explore-button' id='e2' onClick={() => { history.push('/explore')}}>Explore</button>
                </div>
                <div className='scroll-3-image'>
                    <img src={scroll3pic} alt='scroll3pic' id='scroll3-1'/>
                    <div id='fake-expenses'>
                        <p>Estimated Total: $120</p>
                    </div>
                    <div id='fake-time'>
                        <p>Estimated Time: 2 hours</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Scroll3;