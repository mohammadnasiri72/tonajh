"use client";
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import Link from 'next/link'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

function SliderHome() {
  // Sample images for the slider
  const sliderImages = [
    '/images/slider1.jpg',
    '/images/slider1.jpg', 
    '/images/slider1.jpg',
    '/images/slider1.jpg',
    '/images/slider1.jpg'
  ]

  // Links for each slide
  const sliderLinks = [
    '/products/category1',
    '/products/category2',
    '/products/category3',
    '/products/category4',
    '/products/category5'
  ]

  return (
    <div className="relative w-full h-[60vh]">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet custom-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
        style={{
          '--swiper-pagination-color': '#ffffff',
          '--swiper-pagination-bullet-size': '12px',
          '--swiper-pagination-bullet-horizontal-gap': '8px',
        }}
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Link href={sliderLinks[index]} className="block w-full h-full">
              <div className="relative w-full h-full cursor-pointer group">
                {/* Real image background */}
                <div 
                  className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${image})`
                  }}
                >
                  {/* Optional overlay for better text readability if needed */}
                  {/* <div className="absolute inset-0 bg-red-600 bg-opacity-10"></div> */}
                </div>
                
                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-[#0002] bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS for bullets */}
      <style jsx>{`
        .custom-bullet {
          background: rgba(255, 255, 255, 0.5) !important;
          border: 2px solid rgba(255, 255, 255, 0.8) !important;
          transition: all 0.3s ease !important;
          transform: scale(1) !important;
          opacity: 0.7 !important;
        }
        
        .custom-bullet:hover {
          background: rgba(255, 255, 255, 0.8) !important;
          transform: scale(1.2) !important;
          opacity: 1 !important;
        }
        
        .custom-bullet-active {
          background: #ffffff !important;
          border-color: #ffffff !important;
          transform: scale(1.3) !important;
          opacity: 1 !important;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5) !important;
        }
        
        .swiper-pagination {
          bottom: 30px !important;
        }
        
        .swiper-pagination-bullet {
          margin: 0 6px !important;
        }
      `}</style>
    </div>
  )
}

export default SliderHome
