import './ExplorePage.css';
import { FaSearch } from 'react-icons/fa';
import feature1 from '../../assets/feature1.jpg';
import feature2 from '../../assets/feature2.jpg';
import feature3 from '../../assets/feature3.jpg';
import feature4 from '../../assets/feature4.jpg';
import feature5 from '../../assets/feature5.jpg';


function ExplorePage() {

    return (
        <div className="explore-page">
            <div className='explore-page-header'>
                <input type='text' placeholder='Search for experiences' />
                <FaSearch id='search-icon'/>
            </div>
            <div className='featured-experiences'>
                <h2>Featured Experiences</h2>
                <div className='featured-experiences-container'>
                    <img src={feature1} alt='feature1' />
                    <img src={feature2} alt='feature2' />
                    <img src={feature3} alt='feature3' />
                    <img src={feature4} alt='feature4' />
                    <img src={feature5} alt='feature5' />
                </div>
            </div>
        </div>
    )
}

export default ExplorePage;