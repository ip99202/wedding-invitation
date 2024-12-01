import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import mainImage from '../public/images/IMG_00688-2.jpeg'; // 메인 이미지 import

const Section = styled.section`
  height: 900px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 425px;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 75%;
  position: relative;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${mainImage});
  background-size: cover;
  background-position: center;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, transparent 100%);
`;

const DateWrapper = styled(motion.div)`
  position: absolute;
  top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const MainDate = styled.h1`
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 4px;
  color: #006F46;
`;

const SubDate = styled.p`
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  opacity: 0.9;
  color: #006F46;
`;

const InfoContainer = styled(motion.div)`
  width: 100%;
  padding: 40px 20px;
  text-align: center;
  background-color: white;
  margin-top: -20px;
`;

const Names = styled.h2`
  font-size: 22px;
  font-weight: 500;
  color: #333;
  margin-bottom: 15px;
`;

const DateTime = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #333;
  line-height: 1.6;
`;

const Location = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-top: 5px;
`;

function MainSection() {
  return (
    <Section>
      <ImageContainer>
        <BackgroundImage />
        <DateWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <MainDate>2025 / 03 / 16</MainDate>
          <SubDate>SUNDAY</SubDate>
        </DateWrapper>
      </ImageContainer>
      <InfoContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Names>한장희  ·  복유라</Names>
        <DateTime>2025년 3월 16일 일요일 오후 12시 20분</DateTime>
        <Location>상록아트홀 5F, 아트홀</Location>
      </InfoContainer>
    </Section>
  );
}

export default MainSection;
