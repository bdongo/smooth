import { useEffect, useState } from 'react';
import './RatingVisualizer.css';

const PricingVisualizer = ({ score }) => {
    const [width1, setWidth1] = useState('0px')
    const [width2, setWidth2] = useState('0px')
    const [width3, setWidth3] = useState('0px')
    const [width4, setWidth4] = useState('0px')
    const [width5, setWidth5] = useState('0px')

    const widthArr = [
        setWidth1,
        setWidth2,
        setWidth3,
        setWidth4,
        setWidth5
    ]


    useEffect(() => {
        const wholeNum = Math.floor(score / 20) - 1;
        const leftOver = (score % 20) / 20;
        const width = leftOver * 60;
        if (wholeNum <= 0) {
            widthArr[0](`${width}px`);
        }
        for (let i = 0; i <= wholeNum; i++) {
            let currentElement = widthArr[i];
            currentElement(`60px`);
            if (i < 4 ) {
                widthArr[i + 1](`${width}px`)
            }
        }
    }, [score, widthArr]);



    return (
        <div className='pricingVisualizer-container'>
            <div className='pricing-bar'>
                <div id='price-one-bar' style={{ width: width1 }}></div>
            </div>
            <div className='pricing-bar'>
                <div id='price-two-bar' style={{ width: width2 }}></div>
            </div>
            <div className='pricing-bar'>
                <div id='price-three-bar' style={{ width: width3 }}></div>
            </div>
            <div className='pricing-bar'>
                <div id='price-four-bar' style={{ width: width4 }}></div>
            </div>
            <div className='pricing-bar'>
                <div id='price-five-bar' style={{ width: width5 }}></div>
            </div>

        </div>
    )
}

export default PricingVisualizer;