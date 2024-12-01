import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import kakaoMapLogo from '../public/images/kakaomap_basic.png';  // 카카오맵 로고 import
import naverMapLogo from '../public/images/navermap.png';  // 네이버맵 로고 import

const Section = styled.section`
  height: 1350px;
  padding: 150px 20px;
  background-color: #fdfdf5;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-family: 'Gabia Gosran', serif;
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
  font-family: 'Gabia Gosran', serif;
`;

const Address = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
  font-family: 'Gabia Gosran', serif;
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
  font-family: 'Gabia Gosran', serif;
`;

const DirectionText = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 10px;
  font-family: 'Gabia Gosran', serif;
`;

const MapButton = styled.a`
  display: inline-block;
  padding: 12px 24px;
  margin: 10px;
  border-radius: 25px;
  background-color: #f0ede2;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s;
  font-family: 'Gabia Gosran', serif;
  display: flex;  // flexbox 사용
  align-items: center;  // 수직 정렬
`;

const Logo = styled.img`
  width: 20px;  // 로고 크기 조정
  height: 20px;
  margin-right: 8px;  // 텍스트와의 간격
`;

function LocationSection() {
  const mapRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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
          

          <div style={{ display: 'flex', justifyContent: 'center' }}>
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
          </div>

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
