import './SplashPage.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import Scroll2 from './Scroll2';
import Scroll3 from './Scroll3';
import 'swiper/css';
import 'swiper/css/autoplay'
import { BsChevronDoubleDown } from 'react-icons/bs';
import { FiChevronsDown } from 'react-icons/fi';

function SplashPage() {

    return (
        <>
        <div id='all-scrolls'>
            <div className="splash-page">
                <div className='splash-1-text-wrapper'> 
                    <div className='splash-1-text'>
                        Find your next 
                    </div>
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={0}
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
                <div className='splash-1-image'>
                    
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

