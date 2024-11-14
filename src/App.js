import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { AnimatePresence } from 'framer-motion';
import MainSection from './components/MainSection';
import InvitationSection from './components/InvitationSection';
import DateSection from './components/DateSection';
import GallerySection from './components/GallerySection';
import LocationSection from './components/LocationSection';
import ContactSection from './components/ContactSection';
import Loading from './components/Loading';
import FooterSection from './components/FooterSection';

const Container = styled.div`
  width: 100%;
  max-width: 425px;
  margin: 0 auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: inherit;
  
  & > section {
    // margin-bottom: -120px;
    background-color: rgba(255, 255, 255, 0.7);
  }

  & > section:last-child {
    margin-bottom: 0;
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);

    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    const minLoadingTime = new Promise(resolve => 
      setTimeout(resolve, 3000)
    );

    const resourcesLoaded = new Promise(resolve => {
      window.onload = resolve;
    });

    Promise.all([minLoadingTime, resourcesLoaded])
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <GlobalStyle />
      <AnimatePresence mode="wait">
        <Container key="content">
          <MainSection />
          <InvitationSection />
          <DateSection />
          <GallerySection />
          <LocationSection />
          <ContactSection />
          <FooterSection />
        </Container>
      </AnimatePresence>
    </>
  );
}

export default App;
