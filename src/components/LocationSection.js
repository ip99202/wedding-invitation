import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import kakaoMapLogo from '../public/images/kakaomap_basic.png';  // 카카오맵 로고 import
import naverMapLogo from '../public/images/navermap.png';  // 네이버맵 로고 import
import tmapLogo from '../public/images/tmap.png';  // 티맵 로고 import
import trafficControlImage from '../public/images/traffic_control.jpg';  // 교통 통제 이미지 import

const Section = styled.section`
  height: 1850px;
  padding: 150px 20px;
  background-color: #fdfdf5;
  touch-action: pan-y;  // 수직(y축) 스크롤만 허용
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  touch-action: pan-y;  // 수직(y축) 스크롤만 허용
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 0 auto 40px auto;
  border-radius: 10px;
  overflow: hidden;
  touch-action: pan-y;  // 수직(y축) 스크롤만 허용
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
`;

const Address = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
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
`;

const DirectionText = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 10px;
`;

const MapButton = styled.a`
  display: inline-block;
  padding: 8px 10px;
  margin: 5px;
  border-radius: 25px;
  background-color: #f0ede2;
  color: #333;
  text-decoration: none;
  font-size: 12px;
  transition: background-color 0.3s;
  display: flex;  // flexbox 사용
  align-items: center;  // 수직 정렬
`;

const Logo = styled.img`
  width: 20px;  // 로고 크기 조정
  height: 20px;
  margin-right: 8px;  // 텍스트와의 간격
`;

const TrafficControlContainer = styled.div`
  margin: 40px 0;
  padding: 15px;
  background-color: #fff5f5;
  border-radius: 10px;
  border: 1px solid #ffe3e3;
`;

const TrafficControlTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  color: #e03131;
  margin-bottom: 15px;
  text-align: center;
`;

const TrafficControlImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  margin: 20px auto;
  display: block;
  border-radius: 8px;
`;

const TrafficControlText = styled.p`
  font-size: 14px;
  color: #495057;
  line-height: 1.8;
  text-align: center;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
`;

const ModalImage = styled.img`
  min-width: 100%;
  min-height: 90vh;
  object-fit: contain;
  transform-origin: center;
  transform: ${props => `scale(${props.scale}) translate(${props.x}px, ${props.y}px)`};
  transition: none;
  user-select: none;
  touch-action: none;
`;

function LocationSection() {
  const mapRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [showModal, setShowModal] = useState(false);
  const [scale, setScale] = useState(1);
  const [isPinching, setIsPinching] = useState(false);
  const lastDistance = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.min(Math.max(1, newScale), 10));
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      setIsPinching(true);
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      lastDistance.current = distance;
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - (position.x * scale),
        y: e.touches[0].clientY - (position.y * scale)
      });
    }
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (isPinching && e.touches.length === 2) {
      e.preventDefault();
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = distance - lastDistance.current;
      const newScale = scale + delta * 0.01;
      setScale(Math.min(Math.max(1, newScale), 10));
      lastDistance.current = distance;
    } else if (isDragging && e.touches.length === 1 && scale > 1) {
      const newX = (e.touches[0].clientX - dragStart.x) / scale;
      const newY = (e.touches[0].clientY - dragStart.y) / scale;
      
      const maxX = (scale - 1) * window.innerWidth / (2 * scale);
      const maxY = (scale - 1) * window.innerHeight / (2 * scale);
      
      setPosition({
        x: Math.min(Math.max(newX, -maxX), maxX),
        y: Math.min(Math.max(newY, -maxY), maxY)
      });
    }
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsPinching(false);
    lastDistance.current = null;
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - (position.x * scale),
        y: e.clientY - (position.y * scale)
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      const newX = (e.clientX - dragStart.x) / scale;
      const newY = (e.clientY - dragStart.y) / scale;
      
      const maxX = (scale - 1) * window.innerWidth / (2 * scale);
      const maxY = (scale - 1) * window.innerHeight / (2 * scale);
      
      setPosition({
        x: Math.min(Math.max(newX, -maxX), maxX),
        y: Math.min(Math.max(newY, -maxY), maxY)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleModalOpen = () => {
    setScrollY(window.scrollY);
    setShowModal(true);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
    window.scrollTo(0, scrollY);
    setScale(1);
  };

  const handleModalClick = (e) => {
    if (!isDragging) {
      handleModalClose();
    }
  };

  useEffect(() => {
    const loadKakaoMap = () => {
      const script = document.createElement('script');
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
      
      script.onload = () => {
        window.kakao.maps.load(() => {
          if (!mapRef.current) return;

          const container = mapRef.current;
          const options = {
            center: new window.kakao.maps.LatLng(37.503962, 127.042825),
            level: 2,
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
          

          <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '-20px', marginRight: '-20px' }}>
            <MapButton 
              href="https://map.kakao.com/link/to/상록아트홀,37.503887,127.042953" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Logo src={kakaoMapLogo} alt="Kakao Map" />
              카카오맵
            </MapButton>
            <MapButton 
              href="https://map.naver.com/v5/search/서울%20강남구%20언주로%20508" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Logo src={naverMapLogo} alt="Naver Map" />
              네이버맵
            </MapButton>
            <MapButton 
              href="tmap://route?goalname=상록아트홀&goalx=127.042953&goaly=37.503887" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Logo src={tmapLogo} alt="T Map" />
              티맵
            </MapButton>
          </div>

          <div style={{ marginTop: '20px' }}>
            <TrafficControlContainer>
              <TrafficControlTitle>⚠️ 마라톤 교통 통제 안내</TrafficControlTitle>
              <TrafficControlImage 
                src={trafficControlImage} 
                alt="교통 통제 안내" 
                onClick={handleModalOpen}
                style={{ cursor: 'pointer' }}
              />
              <TrafficControlText>
                3월 16일 서울마라톤으로 인해 <br />서울시내 교통 통제가 진행됩니다.<br />
                우회도로를 이용해 주시기 바라며,<br /> 가급적 대중교통 이용을 부탁드립니다.
              </TrafficControlText>
            </TrafficControlContainer>
          </div>

          {showModal && (
            <Modal onClick={handleModalClick}>
              <ModalImage 
                src={trafficControlImage} 
                alt="교통 통제 안내" 
                scale={scale}
                x={position.x}
                y={position.y}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ cursor: scale > 1 ? 'grab' : 'default' }}
              />
            </Modal>
          )}

          <DirectionsContainer>
            <DirectionSection>
              <DirectionTitle>지하철 이용 시</DirectionTitle>
              <DirectionText>
                • 선릉역 5번출구 (2호선, 수인분당선)<br />
                • 선릉역 5번 출구 앞 셔틀버스 운행
              </DirectionText>
            </DirectionSection>

            <DirectionSection>
              <DirectionTitle>버스 이용 시</DirectionTitle>
              <DirectionText>
                • KT 강남지사 정류장<br />
                • 간선버스(파랑): 141, 242, 361<br /><br />
                • 한국기술센터, 상록회관 정류장<br />
                • 간선버스(파랑): 146, 341, 360, 740<br />
                • 지선버스(초록): 1100, 1700, 2000, 7007<br />
                • 급행버스(빨강): 8001
              </DirectionText>
            </DirectionSection>

            {/* <DirectionSection>
              <DirectionTitle>자가용 이용 시</DirectionTitle>
              <DirectionText>
                • 네비게이션 이용 시: "서울상록회관" 또는 "서울시 강남구 언주로 508" 입력<br />
                • 경부고속도로: 양재IC진입하시어 양재대로에서 매봉터널,<br />
                  강남세브란스병원 방면으로 진입하여 직진
              </DirectionText>
            </DirectionSection> */}
          </DirectionsContainer>
        </InfoContainer>
      </Container>

    </Section>
  );
}

export default LocationSection;
