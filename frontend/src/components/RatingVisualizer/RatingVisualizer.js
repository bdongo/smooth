import { useEffect, useState } from 'react';
import './RatingVisualizer.css';

const RatingVisualizer = ({score}) => {
    const [fill1, setFill1] = useState('rating-bar')
    const [fill2, setFill2] = useState('rating-bar')
    const [fill3, setFill3] = useState('rating-bar')
    const [fill4, setFill4] = useState('rating-bar')
    const [fill5, setFill5] = useState('rating-bar')

    useEffect(() => {

    }, [score])


    return (
        <div className='ratingVisualizer-contianer'>
            <div className={fill1}>
                <div className='score-bar'></div>
            </div>
            <div className={fill2}>
                <div className='score-bar'></div>
            </div>
            <div className={fill3}>
                <div className='score-bar'></div>
            </div>
            <div className={fill4}>
                <div className='score-bar'></div>
            </div>
            <div className={fill5}>
                <div className='score-bar'></div>
            </div>

        </div>
    )
}

export default RatingVisualizer;