import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const bounce = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0); }
`;

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Heart = styled.div`
  width: 50px;
  height: 50px;
  background: url('/heart.png') no-repeat center center;
  background-size: contain;
  margin-bottom: 20px;
  animation: ${bounce} 1s infinite;
`;

const TextWrapper = styled.div`
  display: flex;
  gap: 5px;
  color: white;
  font-size: 18px;
`;

const Letter = styled.span`
  animation: ${bounce} 0.5s ease-in-out;
  animation-delay: ${props => props.$delay}s;
`;

function Loading() {
  const [text] = useState('장희, 유라 결혼합니다');

  return (
    <LoadingWrapper>
      <Heart />
      <TextWrapper>
        {text.split('').map((letter, index) => (
          <Letter 
            key={index} 
            $delay={index * 0.1}
          >
            {letter}
          </Letter>
        ))}
      </TextWrapper>
    </LoadingWrapper>
  );
}

export default Loading; 