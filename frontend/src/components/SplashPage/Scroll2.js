import './SplashPage.css'; 
import scroll2pic from '../../assets/scroll2pic.jpg';
import scroll2pic2 from '../../assets/scroll2pic2.jpg';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

function Scroll2 () {
    const history = useHistory();

    return (
        <div className="scroll-2">
            <h2>How does it work?</h2>
            <div className='scroll-2-wrapper'>
                <div className='scroll-2-image'>
                    <div id='fake-search'>
                        <FaSearch id='fake-search-icon'/>
                        <p>San Francisco</p>
                    </div>
                    <img src={scroll2pic} alt='scroll2pic' id='scroll2-1'/>
                    <img src={scroll2pic2} alt='scroll2pic2' id='scroll2-2' />
                </div>
                <div className="scroll-2-text">
                    <div id='scroll-2-header'>Give us your budget or location</div>
                    <div id='scroll-2-p'>Think of your time, budget, 
                        and location - like "$100, 6 hours, San Francisco" - and we'll
                        find the best experiences for you.
                    </div>
                    <button className='explore-button' id='e1' onClick={()=>{history.push('/explore')}}>Explore</button>
                </div>
            </div>
        </div>
    )
}

export default Scroll2;