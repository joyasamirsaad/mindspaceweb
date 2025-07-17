"use client"
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Card from '../components/Card';

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
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const [atEnd, setAtEnd] = useState(false);
    const [atStart, setAtStart] = useState(true);

    const slideNext = () => {
        swiper?.slideNext();
        swiper?.slideNext();
    };

    const slidePrev = () => {
        swiper?.slidePrev();
        swiper?.slidePrev();
    };

    return (
        <>
        <Swiper
        simulateTouch={true}
        onSwiper={setSwiper}
        spaceBetween={20} 
        slidesPerView={2}
        /*breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}*/           
        onSlideChange={(swiper) => {
                setAtStart(swiper.isBeginning);
                setAtEnd(swiper.isEnd);
            }}

        >
            {news.map((news, index) => (
            <SwiperSlide key={index}>
                <Card
                    key={news.id}
                    imageUrl={news.image || "grayimg.jpg"}
                    imageAlt={news.title}
                    title={news.title}
                    desc={news.ctaText || "No description available"}
                    text={news.text || "No details available"}
                    isNews={true}
                /> 
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
                <i className="fas fa-arrow-left text-white text-sm"></i>
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
                <i className="fas fa-arrow-right text-white text-sm"></i>
            </button>
          </div>
        </>
    );

}

export default NewsList;