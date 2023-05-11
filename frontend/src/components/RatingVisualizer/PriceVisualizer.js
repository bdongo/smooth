import { useEffect, useState } from 'react';
import './RatingVisualizer.css';

const PricingVisualizer = ({ score }) => {
    const [fill1, setFill1] = useState('pricing-bar')
    const [fill2, setFill2] = useState('pricing-bar')
    const [fill3, setFill3] = useState('pricing-bar')
    const [fill4, setFill4] = useState('pricing-bar')
    const [fill5, setFill5] = useState('pricing-bar')

    const barArr = [
        "price-one-bar",
        "price-two-bar",
        "price-three-bar",
        "price-four-bar",
        "price-five-bar"
    ]

    const fillArr = [
        setFill1,
        setFill2,
        setFill3,
        setFill4,
        setFill5
    ]

    useEffect(() => {
        const wholeNum = Math.floor(score / 20);
        const leftOver = (score % 20) / 20;
        const width = leftOver * 60;
        for (let i = 0; i < wholeNum - 1; i++) {
            let currentElement = barArr[i];
            document.getElementById(currentElement).style.width = `60px`;
            fillArr[i]("pricing-bar-filled");

            if (leftOver !== 0) {
                let currentElement = document.getElementById(barArr[wholeNum - 1])
                currentElement.style.width = `${width}px`;
            }
        }
        if (wholeNum > 0) {
            fillArr[wholeNum - 1]("pricing-bar-filled");
        }
    }, [score]);



    // useEffect(() => {
    //     const wholeNum = Math.floor(score / 20);
    //     const leftOver = (score % 20) / 20;
    //     const width = leftOver * 60;
    //     for (let i = 0; i < wholeNum; i++) {
    //         let currentElement = barArr[i];
    //         document.getElementById(currentElement).style.width = `60px`;
    //         fillArr[i]("pricing-bar-filled");
    //         if (leftOver !== 0 && i < wholeNum - 1) {
    //             document.getElementById(barArr[i + 1]).style.width = `${width}px`;
    //         }
    //     }
    //     if (wholeNum > 0) {
    //         fillArr[wholeNum - 1]("pricing-bar-filled");
    //     }
    // }, [score]);

    return (
        <div className='pricingVisualizer-container'>
            <div className={fill1}>
                <div id='price-one-bar'></div>
            </div>
            <div className={fill2}>
                <div id='price-two-bar'></div>
            </div>
            <div className={fill3}>
                <div id='price-three-bar'></div>
            </div>
            <div className={fill4}>
                <div id='price-four-bar'></div>
            </div>
            <div className={fill5}>
                <div id='price-five-bar' ></div>
            </div>

        </div>
    )
}

export default PricingVisualizer;