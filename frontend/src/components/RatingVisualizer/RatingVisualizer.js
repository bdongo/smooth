import './RatingVisualizer.css';

const RatingVisualizer = ({score}) => {

    return (
        <div className='ratingVisualizer-contianer'>
            <div className='rating-bar'>
                <div className='score-bar'></div>
            </div>
            <div className='rating-bar'>
                <div className='score-bar'></div>
            </div>
            <div className='rating-bar'>
                <div className='score-bar'></div>
            </div>
            <div className='rating-bar'>
                <div className='score-bar'></div>
            </div>
            <div className='rating-bar'>
                <div className='score-bar'></div>
            </div>

        </div>
    )
}

export default RatingVisualizer;