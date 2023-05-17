import './Footer.css';
import { useEffect } from 'react';

const Footer = () => {
    useEffect(() => {
        if (window.location.pathname.includes('event') || window.location.pathname.includes('search')) {
            const footer = document.querySelector('.footer-container');
            footer.style.scrollSnapAlign = 'none';
        } else {
            const footer = document.querySelector('.footer-container');
            footer.style.scrollSnapAlign = 'start';
        }
    }, [window.location.pathname])

    return (
        <>
            <div className='footer-container'>
                <h2 id='footer-header'>Contact Us</h2>
                <div className='footer-links' >
                    <div className='dev'>
                        <h2>Brandon Leung</h2>
                        <a href='https://github.com/bdongo' target='_blank'><i className="fa-brands fa-square-github"></i> Github </a>
                        <a href='https://www.linkedin.com/in/brandon-l/' target='_blank'><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
                    </div>
                    <div className='dev'>
                        <h2>Bilal Choudhry</h2>
                        <a href='https://github.com/bilalashc' target='_blank'><i className="fa-brands fa-square-github"></i> Github </a>
                        <a href='https://www.linkedin.com/in/bilal-c-838805b4/' target='_blank'><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
                    </div>
                    <div className='dev'>
                        <h2>Deric Lee</h2>
                        <a href='https://github.com/dericxlee' target='_blank'><i className="fa-brands fa-square-github"></i> Github </a>
                        <a href='https://www.linkedin.com/in/deric-lee-940923106/' target='_blank'><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
                    </div>
                    <div className='dev'>
                        <h2>Christian Espinosa</h2>
                        <a href='https://github.com/CE954' target='_blank'><i className="fa-brands fa-square-github"></i> Github </a>
                        <a href='https://www.linkedin.com/in/christian-espinosa-bb0b47187' target='_blank'><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
                    </div>
                    <div className='dev'>
                        <h2>Vamshi Renduchintala</h2>
                        <a href='https://github.com/Vrendu' target='_blank'><i className="fa-brands fa-square-github"></i> Github </a>
                        <a href='https://www.linkedin.com/in/vamshi-renduchintala-216571271/' target='_blank'><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;