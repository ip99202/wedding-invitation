import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = styled.section`
  min-height: 300px;
  height: auto;
  padding: 150px 20px;
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
  background-color: #f0ede2;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccountDetails = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
`;

const AccountName = styled.p`
  font-size: 13px;
  color: #333;
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #f0ede2;
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
  const [copyMessage] = useState('');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleCopy = async (text, name) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const accounts = {
    groom: [
      { name: '신랑 한장희', account: '신한은행 110-332-962892' },
      { name: '신랑측 아버지 한상표', account: '국민은행 110-508-466893' },
      { name: '신랑측 어머니 이혜영', account: '신한은행 521-04-161097' },
    ],
    bride: [
      { name: '신부 복유라', account: '우리은행 1002-352-758098' },
      { name: '신부측 아버지 복진규', account: '기업은행 078-047093-02-012' },
      { name: '신부측 어머니 염연숙', account: '기업은행 460-047692-01-013' },
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
                      <AccountInfo>
                        <AccountDetails>
                          {item.account.split(' ')[0]} | {item.account.split(' ')[1]}
                        </AccountDetails>
                        <AccountName>{item.name}</AccountName>
                      </AccountInfo>
                      <Button onClick={() => handleCopy(item.account, item.name)}>
                        복사
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
