import './Footer.css';
import { useEffect } from 'react';
import  {useHistory} from 'react-router-dom';

const Footer = () => {
    const history = useHistory();

        useEffect(() => {
            const handleLocationChange = (location) => {
                const footer = document.querySelector('.footer-container');
                if (
                    location.pathname.includes('event') ||
                    location.pathname.includes('search') ||
                    location.pathname.includes('profile') || 
                    location.pathname.includes('query=') || 
                    location.pathname.includes('newReview') || 
                    location.pathname.includes('updateReview')
                ) {
                    footer.style.scrollSnapAlign = 'none';
                    localStorage.setItem('scrollSnapAlign', 'none');
                } else {
                    footer.style.scrollSnapAlign = 'start';
                    localStorage.setItem('scrollSnapAlign', 'start');
                }
            };

            const storedScrollSnapAlign = localStorage.getItem('scrollSnapAlign');
            if (storedScrollSnapAlign) {
                const footer = document.querySelector('.footer-container');
                footer.style.scrollSnapAlign = storedScrollSnapAlign;
            }

            const unlisten = history.listen(handleLocationChange);

            return () => {
                unlisten();
            };
        }, [history]);

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