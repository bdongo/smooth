import { useEffect, useState } from 'react';
import './RatingVisualizer.css';

const PricingVisualizer = ({ score }) => {
    const [fill1, setFill1] = useState('pricing-bar')
    const [fill2, setFill2] = useState('pricing-bar')
    const [fill3, setFill3] = useState('pricing-bar')
    const [fill4, setFill4] = useState('pricing-bar')
    const [fill5, setFill5] = useState('pricing-bar')

    useEffect(() => {
        const wholeNum = score % 20;
        const leftOver = score / 20;
        const width = leftOver * 60;
        if (wholeNum === 100) {
            setFill1('pricing-bar-filled')
            setFill2('pricing-bar-filled')
            setFill3('pricing-bar-filled')
            setFill4('pricing-bar-filled')
            setFill5('pricing-bar-filled')
        } else if (wholeNum >= 80) {
            document.getElementById("price-five-bar").style.width = `${width}px`;
            setFill1('pricing-bar-filled')
            setFill2('pricing-bar-filled')
            setFill3('pricing-bar-filled')
            setFill4('pricing-bar-filled')
        } else if (wholeNum >= 60) {
            document.getElementById("price-four-bar").style.width = `${width}px`;
            setFill1('pricing-bar-filled')
            setFill2('pricing-bar-filled')
            setFill3('pricing-bar-filled')
        } else if (wholeNum >= 40) {
            document.getElementById("price-three-bar").style.width = `${width}px`;
            setFill1('pricing-bar-filled')
            setFill2('pricing-bar-filled')
        } else if (wholeNum >= 20) {
            document.getElementById("price-two-bar").style.width = `${width}px`;
            setFill1('pricing-bar-filled')
        } else {
            console.log("in last bar")
            document.getElementById("price-one-bar").style.width = `${width}px`;
        }
    }, [score]);




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