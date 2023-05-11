import './SplashPage.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import Scroll2 from './Scroll2';
import Scroll3 from './Scroll3';
import 'swiper/css';
import 'swiper/css/autoplay'
import { FiChevronsDown } from 'react-icons/fi';
import { useEffect } from 'react';
import beach from '../../assets/beach.mp4';


function SplashPage() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <>
        <div id='all-scrolls'>
            <div className='video-container'>
                <video autoPlay loop muted id='video'>
                    <source src={beach} type='video/mp4'/>
                </video>
            </div>
            <div className="splash-page">
                <div className='splash-1-overlay'></div>
                <div className='splash-1-text-wrapper'> 
                    <div className='splash-1-text'>
                        Find your next 
                    </div>
                    <Swiper
                        id='splash-1-text-swiper'
                        modules={[Autoplay]}
                        spaceBetween={100}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ 
                            delay: 3300, 
                            disableOnInteraction: false
                        }}
                        allowTouchMove={false}
                    >
                        <SwiperSlide>experience</SwiperSlide>
                        <SwiperSlide>getaway</SwiperSlide>
                        <SwiperSlide>destination</SwiperSlide>
                        <SwiperSlide>vacation</SwiperSlide>
                    </Swiper>
                </div>
                <FiChevronsDown id='down-arrow'/>
            </div>
            <Scroll2 />
            <Scroll3 />
        </div>
        </>

    )
}

export default SplashPage;

