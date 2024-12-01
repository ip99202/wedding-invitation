import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import floralImage from '../public/images/floral.png';

const Section = styled.section`
  height: 800px;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fdfdf5;
  font-family: 'Gabia Gosran', serif;
`;

const InvitationText = styled(motion.div)`
  max-width: 500px;
  margin: 0 auto;
  line-height: 2;
  word-break: keep-all;
  font-family: 'Gabia Gosran', serif;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 40px;
  color: #333;
  font-family: 'Gabia Gosran', serif;
`;

const Message = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: #666;
  margin-bottom: 30px;
`;

const Names = styled.p`
  font-size: 15px;
  margin-top: 40px;
  color: #333;
  letter-spacing: 4px;
`;

const FlowerImage = styled.div`
  width: 50px;
  height: 50px;
  background: url(${floralImage}) no-repeat center center;
  background-size: contain;
  margin: 60px auto;
`;

const fadeInUpVariants = {
  hidden: { 
    opacity: 0,
    y: 20 
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
};

function InvitationSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <Section>
      <InvitationText
        ref={ref}
        variants={fadeInUpVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Title>초대합니다</Title>
        <Message>
          서로 다른 길을 걸어온 두 사람이<br/>
          이제 같은 길을 걸어가고자 합니다.<br/>
          새로운 시작을 함께 하는 자리에<br/>
          소중한 분들을 모시고자 합니다.<br/>
          귀한 걸음 하시어<br/>
          축복해 주시면 감사하겠습니다.
        </Message>
        <FlowerImage />
        <Names>
          <b>한상표 · 이혜영</b> <span style={{ fontSize: '13px', fontWeight: 'normal' }}>의 장남</span> <b>장희</b><br/>
          <b>복진규 · 염연숙</b> <span style={{ fontSize: '13px', fontWeight: 'normal' }}>의 장녀</span> <b>유라</b>
        </Names>
      </InvitationText>
    </Section>
  );
}

export default InvitationSection;
