import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 이미지 import
import img1 from '../public/images/7E0A0725.jpeg';
import img2 from '../public/images/7E0A1012.jpeg';
import img3 from '../public/images/7E0A1150.jpeg';
import img4 from '../public/images/7E0A1211.jpeg';
import img5 from '../public/images/7E0A1468.jpeg';
import img6 from '../public/images/7E0A1477.jpeg';
import img7 from '../public/images/7E0A1675.jpeg';
import img8 from '../public/images/7E0A1681.jpeg';
import img9 from '../public/images/7E0A1710.jpeg';

const Section = styled.section`
  min-height: 100vh;
  padding: 60px 1px;
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
  touch-action: none;
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
  touch-action: none;
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

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
`;

function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { ref } = useInView({
    threshold: 0.1,
  });

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

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

  return (
    <Section>
      <Title>우리의 순간</Title>
      <SliderWrapper ref={ref}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <ImageWrapper
              key={index}
              onClick={() => setSelectedImage(image)}
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
            onClick={() => setSelectedImage(null)}
          >
            <CloseButton onClick={() => setSelectedImage(null)}>×</CloseButton>
            <ModalImage 
              src={selectedImage} 
              alt="Selected gallery image"
              draggable="false"
            />
          </Modal>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default GallerySection;
