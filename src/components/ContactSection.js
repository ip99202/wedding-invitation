import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = styled.section`
  min-height: auto;
  padding: 80px 20px;
  background-color: #fdfdf5;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
`;

const Container = styled(motion.div)`
  max-width: 500px;
  margin: 0 auto;
`;

const AccordionHeader = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: ${props => props.$isOpen ? '10px' : '0'};
`;

const AccordionContent = styled(motion.div)`
  background-color: #fff;
  overflow: hidden;
`;

const AccountCard = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const AccountName = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const AccountNumber = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: #f3d4d4;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #efc4c4;
  }
`;

const CopyMessage = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 1000;
`;

const Arrow = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 8px solid #333; /* 화살표 색상 */
  transition: transform 0.3s;

  &.down {
    transform: rotate(180deg); /* 아래로 회전 */
  }
`;

function ContactSection() {
  const [openSection, setOpenSection] = useState(null);
  const [copyMessage, setCopyMessage] = useState('');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleCopy = async (text, name) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage(`${name}님의 계좌번호가 복사되었습니다`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const accounts = {
    groom: [
      { name: '신랑 한장희', account: '신한은행 110-000-000000' },
      { name: '신랑측 아버지 한상표', account: '국민은행 110-000-000000' },
      { name: '신랑측 어머니 이혜영', account: '농협은행 110-000-000000' },
    ],
    bride: [
      { name: '신부 복유라', account: '신한은행 110-000-000000' },
      { name: '신부측 아버지 복진규', account: 'SC은행 110-000-000000' },
      { name: '신부측 어머니 염연숙', account: '하나은행 110-000-000000' },
    ],
  };

  return (
    <Section>
      <Title>마음 전하실 곳</Title>
      <Container
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        {['groom', 'bride'].map((side) => (
          <div key={side} style={{ marginBottom: '15px' }}>
            <AccordionHeader 
              $isOpen={openSection === side}
              onClick={() => setOpenSection(openSection === side ? null : side)}
            >
              <span>{side === 'groom' ? '신랑측 계좌번호' : '신부측 계좌번호'}</span>
              <Arrow className={openSection === side ? '' : 'down'}></Arrow>
            </AccordionHeader>
            <AnimatePresence>
              {openSection === side && (
                <AccordionContent
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {accounts[side].map((item, index) => (
                    <AccountCard key={index}>
                      <AccountName>{item.name}</AccountName>
                      <AccountNumber>{item.account}</AccountNumber>
                      <Button onClick={() => handleCopy(item.account, item.name)}>
                        계좌번호 복사
                      </Button>
                    </AccountCard>
                  ))}
                </AccordionContent>
              )}
            </AnimatePresence>
          </div>
        ))}
      </Container>

      {copyMessage && (
        <CopyMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {copyMessage}
        </CopyMessage>
      )}
    </Section>
  );
}

export default ContactSection;
