import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 이미지 import
// import img1 from '../public/images/KakaoTalk_Photo_2024-12-01-17-18-07 001.jpeg';
// import img2 from '../public/images/KakaoTalk_Photo_2024-12-01-17-18-08 002.jpeg';
import img1 from '../public/images/KakaoTalk_Photo_2024-12-01-17-18-08 007.jpeg';
import img2 from '../public/images/KakaoTalk_Photo_2024-12-01-17-18-08 008.jpeg';
import img3 from '../public/images/KakaoTalk_Photo_2024-12-01-17-18-08 003.jpeg';
import img4 from '../public/images/KakaoTalk_Photo_2024-12-01-17-18-08 004.jpeg';
import img5 from '../public/images/KakaoTalk_Photo_2024-12-01-17-18-08 005.jpeg';
import img6 from '../public/images/KakaoTalk_Photo_2024-12-01-17-18-08 006.jpeg';
import img9 from '../public/images/KakaoTalk_Photo_2024-12-01-17-18-08 009.jpeg';
import img10 from '../public/images/KakaoTalk_Photo_2024-12-01-17-18-08 010.jpeg';
import img12 from '../public/images/KakaoTalk_Photo_2024-12-01-17-18-08 011.jpeg';
import img11 from '../public/images/KakaoTalk_Photo_2024-12-01-17-18-08 012.jpeg';
import img13 from '../public/images/KakaoTalk_Photo_2024-12-01-17-18-08 013.jpeg';

const Section = styled.section`
  height: 800px;
  padding: 150px 10px;
  background-color: #fdfdf5;
  overscroll-behavior: none;
  touch-action: pan-y;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
`;

const SliderWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  
  .slick-slide {
    padding: 0 10px;
  }

  .slick-dots {
    bottom: -40px;
  }

  .slick-prev, .slick-next {
    width: 40px;
    height: 40px;
    z-index: 1;
    &:before {
      display: none;
    }
  }

  .slick-prev {
    left: -50px;
  }

  .slick-next {
    right: -50px;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 24px;
  
  &:hover {
    color: #333;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  aspect-ratio: 3/4;
  touch-action: pan-y;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  touch-action: pan-y;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  touch-action: none;
  -webkit-touch-callout: none;
  user-select: none;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100vh;
  object-fit: contain;
  object-position: center;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
  touch-action: none;
`;

const ModalArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 24px;
  transition: background-color 0.3s;
  z-index: 1002;
  outline: none;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  &:active {
    background: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.3);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
`;

function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const { ref } = useInView({
    threshold: 0.1,
  });

  const images = [img1, img2, img3, img4, img5, img6, img9, img10, img11, img12, img13];

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <ArrowButton onClick={onClick} style={{ right: '-50px' }}>
        →
      </ArrowButton>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <ArrowButton onClick={onClick} style={{ left: '-50px' }}>
        ←
      </ArrowButton>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  const handleImageClick = (index) => {
    setSelectedImage(images[index]);
    setSelectedImageIndex(index);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    const newIndex = (selectedImageIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
    setSelectedImageIndex(newIndex);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    const newIndex = (selectedImageIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
    setSelectedImageIndex(newIndex);
  };

  return (
    <Section>
      <Title>우리의 순간</Title>
      <SliderWrapper ref={ref}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <ImageWrapper
              key={index}
              onClick={() => handleImageClick(index)}
            >
              <Image 
                src={image} 
                alt={`Gallery image ${index + 1}`} 
                loading="lazy"
                draggable="false"
              />
            </ImageWrapper>
          ))}
        </Slider>
      </SliderWrapper>

      <AnimatePresence>
        {selectedImage && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedImage(null);
              setSelectedImageIndex(null);
            }}
          >
            <ModalArrowButton className="prev" onClick={handlePrevImage}>
              ←
            </ModalArrowButton>
            <ModalImage 
              src={selectedImage} 
              alt="Selected gallery image"
              draggable="false"
            />
            <ModalArrowButton className="next" onClick={handleNextImage}>
              →
            </ModalArrowButton>
          </Modal>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default GallerySection;
