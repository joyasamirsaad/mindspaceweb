"use client"
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from '../components/Card';
import { useParams } from 'next/navigation';

interface News {
  title: string;
  id?: number;
  image?: string | null;
  ctaText?: string | null;
  text?: string | null;
}

interface NewsListProps {
    news: News[];
}

function NewsList({ news }: NewsListProps) {
    const params = useParams();
    const lang = params.lang as string;
    const isRTL = lang === 'ar';


    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const [atEnd, setAtEnd] = useState(false);
    const [atStart, setAtStart] = useState(true);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

    const slideNext = () => {
        swiper?.slideNext();
        swiper?.slideNext();
    };

    const slidePrev = () => {
        swiper?.slidePrev();
        swiper?.slidePrev();
    };

    // Animate the visible slides (2 at a time) on mount and on slide change
    useEffect(() => {
        if (swiper && slidesRef.current.length > 0) {
            const start = swiper.activeIndex;
            const end = swiper.activeIndex + 2; // Show 2 slides at a time
            for (let i = start; i < end; i++) {
                const slide = slidesRef.current[i];
                if (slide) {
                    gsap.fromTo(
                        slide,
                        { opacity: 0, scale: 0.8, zIndex: 1 },
                        {
                            opacity: 1,
                            scale: 1,
                            zIndex: 10,
                            duration: 0.7,
                            ease: "power3.out",
                        }
                    );
                }
            }
        }
    }, [swiper, swiper?.activeIndex]);

    return (
        <>
        <Swiper
            simulateTouch={true}
            onSwiper={setSwiper}
            spaceBetween={20}
            slidesPerView={1}
            /*breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}*/
           breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },    
                768: { slidesPerView: 2, spaceBetween: 24 },
           }}
            onSlideChange={(swiper) => {
                setAtStart(swiper.isBeginning);
                setAtEnd(swiper.isEnd);
                // Animate the new active slide
                if (slidesRef.current[swiper.activeIndex]) {
                    gsap.fromTo(
                        slidesRef.current[swiper.activeIndex],
                        { opacity: 0, scale: 0.8, zIndex: 1 },
                        {
                            opacity: 1,
                            scale: 1,
                            zIndex: 10,
                            duration: 0.7,
                            ease: "power3.out",
                        }
                    );
                }
            }}
        >
            {news.map((news, index) => (
                <SwiperSlide key={index}>
                    <div ref={el => { slidesRef.current[index] = el; }}>
                        <Card
                            key={news.id}
                            imageUrl={news.image || "grayimg.jpg"}
                            imageAlt={news.title}
                            title={news.title}
                            desc={news.ctaText || "No description available"}
                            text={news.text || "No details available"}
                            isNews={true}
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
        <div className="flex gap-4 justify-center">
            <button
                onClick={slidePrev}
                aria-label="Previous slide"
                disabled={atStart}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ease-in-out
                    ${atStart
                        ? 'bg-gray-300 opacity-50 pointer-events-none cursor-not-allowed'
                        : 'bg-[#d3d3d3] hover:bg-[#E74C3C]'
                    }`}
            >
                <i className={`fas ${isRTL ? 'fa-arrow-right' : 'fa-arrow-left'} text-white text-sm`} />
            </button>

            <button
                onClick={slideNext}
                aria-label="Next slide"
                disabled={atEnd}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ease-in-out
                    ${atEnd
                        ? 'bg-gray-300 opacity-50 pointer-events-none cursor-not-allowed'
                        : 'bg-[#d3d3d3] hover:bg-[#3498DB]'
                    }`}
            >
                <i className={`fas ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'} text-white text-sm`} />
            </button>
        </div>
        </>
    );

}

export default NewsList;