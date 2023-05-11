import { useEffect, useState } from 'react';
import './RatingVisualizer.css';

const PricingVisualizer = ({ score }) => {
    const [fill1, setFill1] = useState('pricing-bar')
    const [fill2, setFill2] = useState('pricing-bar')
    const [fill3, setFill3] = useState('pricing-bar')
    const [fill4, setFill4] = useState('pricing-bar')
    const [fill5, setFill5] = useState('pricing-bar')

    useEffect(() => {
        const wholeNum = score / 20
        const leftOver = score % 20;
        const width = leftOver / 60;
        if (wholeNum === 5) {
            setFill1('pricing-bar-filled')
            setFill2('pricing-bar-filled')
            setFill3('pricing-bar-filled')
            setFill4('pricing-bar-filled')
            setFill5('pricing-bar-filled')
        } else if (wholeNum >= 4) {
            document.getElementById("five-bar").style.width = `${width}px`;
            setFill1('pricing-bar-filled')
            setFill2('pricing-bar-filled')
            setFill3('pricing-bar-filled')
            setFill4('pricing-bar-filled')
        } else if (wholeNum >= 3) {
            document.getElementById("four-bar").style.width = `${width}px`;
            setFill1('pricing-bar-filled')
            setFill2('pricing-bar-filled')
            setFill3('pricing-bar-filled')
        } else if (wholeNum >= 2) {
            document.getElementById("three-bar").style.width = `${width}px`;
            setFill1('pricing-bar-filled')
            setFill2('pricing-bar-filled')
        } else if (wholeNum >= 1) {
            document.getElementById("two-bar").style.width = `${width}px`;
            setFill1('pricing-bar-filled')
        } else {
            document.getElementById("one-bar").style.width = `${width}px`;
        }
    }, [score]);




    return (
        <div className='pricingVisualizer-container'>
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

export default PricingVisualizer;