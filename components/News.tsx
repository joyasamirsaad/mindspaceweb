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

    );

}

export default NewsList;