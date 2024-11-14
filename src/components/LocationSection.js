import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// import arthall from '../public/images/상록아트홀_약도.jpg';

const Section = styled.section`
  min-height: 100vh;
  padding: 80px 20px;
  background-color: #fff;
`;

const Title = styled.h2`
  font-size: 24px;
  // font-weight: 300;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-family: 'GabiaGothic', sans-serif;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 40px;
  border-radius: 10px;
  overflow: hidden;
`;

const InfoContainer = styled(motion.div)`
  padding: 20px;
  text-align: center;
`;

const VenueName = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #333;
  font-family: 'GabiaGothic', sans-serif;
`;

const Address = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
  font-family: 'GabiaGothic', sans-serif;
`;

const Button = styled.a`
  display: inline-block;
  padding: 12px 24px;
  margin: 10px;
  border-radius: 25px;
  background-color: #f3d4d4;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s;
  font-family: 'GabiaGothic', sans-serif;

  &:hover {
    background-color: #efc4c4;
  }
`;

const DirectionsContainer = styled.div`
  margin-top: 40px;
  text-align: left;
`;

const DirectionSection = styled.div`
  margin-bottom: 30px;
`;

const DirectionTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 15px;
  font-family: 'GabiaGothic', sans-serif;
`;

const DirectionText = styled.p`
  font-size: 15px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 10px;
  font-family: 'GabiaGothic', sans-serif;
`;

const MapButton = styled(Button)`
  background-color: #f8f8f8;
  margin: 5px;
  font-size: 13px;
  padding: 8px 16px;
  
  &:hover {
    background-color: #efefef;
  }
`;

const MapImageButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 30px;
`;

const Modal = styled.div`
  display: ${props => props.show ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
`;

const MapImage = styled.img`
  max-width: 100%;
  height: auto;
`;

function LocationSection() {
  const mapRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadKakaoMap = () => {
      const script = document.createElement('script');
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
      
      script.onload = () => {
        window.kakao.maps.load(() => {
          if (!mapRef.current) return;

          const container = mapRef.current;
          const options = {
            center: new window.kakao.maps.LatLng(37.503962, 127.042825),
            level: 3
          };
          
          const map = new window.kakao.maps.Map(container, options);
          
          const markerPosition = new window.kakao.maps.LatLng(37.503962, 127.042825);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition
          });
          
          marker.setMap(map);
        });
      };

      document.head.appendChild(script);
    };

    loadKakaoMap();

    return () => {
      const script = document.querySelector('script[src*="dapi.kakao.com"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <Section>
      <Title>오시는 길</Title>
      <Container ref={ref}>
        <MapContainer ref={mapRef} />
        <InfoContainer
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <VenueName>상록아트홀</VenueName>
          <Address>
            서울특별시 강남구 언주로 508<br />
            상록회관 상록아트홀 5층 아트홀
          </Address>
          
          {/* <MapImageButton onClick={() => setShowModal(true)}>
            약도 이미지로 보기
          </MapImageButton> */}

          <div>
            <MapButton 
              href="https://map.kakao.com/link/to/상록아트홀,37.503887,127.042953" 
              target="_blank"
              rel="noopener noreferrer"
            >
              카카오맵 길찾기
            </MapButton>
            <MapButton 
              href="https://map.naver.com/v5/search/서울%20강남구%20언주로%20508" 
              target="_blank"
              rel="noopener noreferrer"
            >
              네이버맵 길찾기
            </MapButton>
          </div>

          <DirectionsContainer>
            <DirectionSection>
              <DirectionTitle>지하철 이용 시</DirectionTitle>
              <DirectionText>
                • 2호선 / 분당선 "선릉역" 5번출구 도보 5분<br />
                • 서울버스 운행 (수서운행): 선릉역 5번 출구
              </DirectionText>
            </DirectionSection>

            <DirectionSection>
              <DirectionTitle>버스 이용 시</DirectionTitle>
              <DirectionText>
                • KT 강남지사 하차<br />
                • 간선버스(파랑): 141 (도봉산), 242 (종랑, 신내역), 361 (여의도)<br />
                • 한국기술센터, 상록회관 하차<br />
                • 간선버스(파랑): 146 (상계동), 341 (하남), 360 (송파), 740 (덕은동)<br />
                • 지선버스(초록): 1100 (차산리), 1700 (연대농장입구, 도곡리), 2000 (천변리), 7007 (광릉내)<br />
                • 급행버스(빨강): 8001 (대성리)
              </DirectionText>
            </DirectionSection>

            <DirectionSection>
              <DirectionTitle>자가용 이용 시</DirectionTitle>
              <DirectionText>
                • 네비게이션 이용 시: "서울상록회관" 또는 "서울시 강남구 언주로 508" 입력<br />
                • 경부고속도로: 양재IC진입하시어 양재대로에서 매봉터널,<br />
                  강남세브란스병원 방면으로 진입하여 직진
              </DirectionText>
            </DirectionSection>
          </DirectionsContainer>
        </InfoContainer>
      </Container>

      {/* <Modal show={showModal} onClick={() => setShowModal(false)}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <MapImage src={arthall} alt="상록아트홀 약도" />
        </ModalContent>
      </Modal> */}
    </Section>
  );
}

export default LocationSection;
