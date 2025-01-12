import React from 'react';
import styled from 'styled-components';
import footerImage from '../public/images/7E0A1150-2.jpeg'; // footer에 사용할 이미지 경로

const FooterContainer = styled.section`
  width: 100%;
  height: 400px; // 원하는 높이로 조정
  margin-top: 120px;
  background-image: url(${footerImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  font-family: 'Gabia Gosran', sans-serif;
  mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.5) 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0.5) 90%, transparent 100%);
  position: relative;
`;


const CopyrightText = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
`;

function FooterSection() {
  return (
    <FooterContainer>
      <CopyrightText>© 2025 HAN JANG HEE.</CopyrightText>
    </FooterContainer>
  );
}

export default FooterSection; 