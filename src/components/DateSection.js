import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = styled.section`
  min-height: 100vh;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
`;

const DateContainer = styled(motion.div)`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
`;

const WeddingDate = styled.div`
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 300;
`;

const WeddingTime = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
  font-weight: 300;
`;

const Calendar = styled.div`
  background: white;
  padding: 20px 0;
  margin: 30px 0;
  width: 100%;
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 15px;
  font-size: 14px;
  text-align: center;
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px 0;
  font-size: 15px;
  text-align: center;
`;

const CalendarDay = styled.div`
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$isWeekend ? '#FF8A98' : '#333'};
  font-weight: ${props => props.$isWeddingDay ? '500' : '300'};
  position: relative;
  margin: 0 auto;

  ${props => props.$isWeddingDay && `
    background-color: #FFD7DD;
    border-radius: 50%;
  `}
`;

const CountdownContainer = styled.div`
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 40px;
`;

const CountdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  margin-bottom: 15px;
  max-width: 300px;
  margin: 0 auto;
`;

const CountdownItem = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column-reverse;
  
  .number {
    font-size: 20px;
    font-weight: 500;
    color: #333;
  }
  
  .label {
    font-size: 11px;
    color: #666;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Message = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 20px;
`;

function DateSection() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const weddingDate = useMemo(() => new Date(2025, 2, 16, 11, 30), []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      setCountdown({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const generateCalendarDays = () => {
    const year = weddingDate.getFullYear();
    const month = weddingDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const startPadding = firstDay.getDay();
    
    for (let i = 0; i < startPadding; i++) {
      days.push({ 
        day: '', 
        isCurrentMonth: false,
        isWeekend: false,
        isWeddingDay: false 
      });
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      const dayOfWeek = currentDate.getDay();
      
      days.push({
        day: i,
        isCurrentMonth: true,
        isWeddingDay: month === 2 && i === 16,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6
      });
    }
    
    return days;
  };

  return (
    <Section>
      <DateContainer
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
      >
        <WeddingDate>2025.03.16</WeddingDate>
        <WeddingTime>일요일 오전 12시 20분</WeddingTime>
        
        <Calendar>
          <WeekDays>
            {weekDays.map((day, index) => (
              <div 
                key={day} 
                style={{ 
                  color: index === 0 || index === 6 ? '#FF8A98' : '#666'
                }}
              >
                {day}
              </div>
            ))}
          </WeekDays>
          <Days>
            {generateCalendarDays().map((day, index) => (
              <CalendarDay 
                key={index}
                $isWeekend={day.isWeekend}
                $isWeddingDay={day.isWeddingDay}
                style={{
                  color: day.isWeekend ? '#FF8A98' : '#333'
                }}
              >
                {day.day}
              </CalendarDay>
            ))}
          </Days>
        </Calendar>

        <CountdownContainer>
          <CountdownGrid>
            <CountdownItem>
              <div className="number">{countdown.days}</div>
              <div className="label">DAYS</div>
            </CountdownItem>
            <CountdownItem>
              <div className="number">{countdown.hours}</div>
              <div className="label">HOUR</div>
            </CountdownItem>
            <CountdownItem>
              <div className="number">{countdown.minutes}</div>
              <div className="label">MIN</div>
            </CountdownItem>
            <CountdownItem>
              <div className="number">{countdown.seconds}</div>
              <div className="label">SEC</div>
            </CountdownItem>
          </CountdownGrid>
          <Message>장희, 유라의 결혼식이 {countdown.days}일 남았습니다.</Message>
        </CountdownContainer>
      </DateContainer>
    </Section>
  );
}

export default DateSection;
