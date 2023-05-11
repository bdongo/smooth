import { useEffect, useState } from 'react';
import './RatingVisualizer.css';

const RatingVisualizer = ({score}) => {
    const [fill1, setFill1] = useState('rating-bar')
    const [fill2, setFill2] = useState('rating-bar')
    const [fill3, setFill3] = useState('rating-bar')
    const [fill4, setFill4] = useState('rating-bar')
    const [fill5, setFill5] = useState('rating-bar')

    const barArr = [
        "one-bar",
        "two-bar",
        "three-bar",
        "four-bar",
        "five-bar"
    ]

    const fillArr = [
        setFill1,
        setFill2,
        setFill3,
        setFill4,
        setFill5
    ]


    useEffect(() => {
        const wholeNum = Math.floor(score)
        const leftOver = score - wholeNum;
        const width = leftOver * 60;
        for (let i = 0; i < wholeNum - 1; i++) {
            let currentElement = barArr[i]
            document.getElementById(currentElement).style.width = `60px`;
            fillArr[i]("rating-bar-filled");

            if (leftOver !== 0) {
                let currentElement = document.getElementById(barArr[wholeNum])
                currentElement.style.width = `${width}px`;
            }
        }
        if (wholeNum > 0) {
            fillArr[wholeNum - 1]("rating-bar-filled");
        }
    }, [score]);



    return (
        <div className='ratingVisualizer-container'>
            <div className={fill1}>
                <div id='one-bar'></div>
            </div>
            <div className={fill2}>
                <div id='two-bar'></div>
            </div>
            <div className={fill3}>
                <div id='three-bar'></div>
            </div>
            <div className={fill4}>
                <div id='four-bar'></div>
            </div>
            <div className={fill5}>
                <div id='five-bar' ></div>
            </div>

        </div>
    )
}


export default RatingVisualizer;