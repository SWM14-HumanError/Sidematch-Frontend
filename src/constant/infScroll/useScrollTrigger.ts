import React, {useCallback, useEffect, useRef, useState} from 'react';

export interface IScrollTriggerReturn {
  triggered: boolean;
}

export function useMainScrollTrigger(infScrollLayout: React.RefObject<HTMLDivElement>): IScrollTriggerReturn {
  const page = useRef<number>(0);
  const [triggered, setTriggered] = useState(false);
  const timer = useRef(0);


  // throttle을 사용하여 너무 자주 호출되지 않도록 합니다.
  const changeTrigger = useCallback(() => {
    const now = Date.now();
    if (now - timer.current >= 1000) {
      setTriggered((prev) => !prev);
      timer.current = now;
    }
  }, []);

  const handleScroll = useCallback(() => {
    const scrolledHeight = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const componentHeight = infScrollLayout?.current?.clientHeight;
    const scrollThreshold = 32;

    if (scrolledHeight + windowHeight + scrollThreshold >= documentHeight ||
      componentHeight && componentHeight < windowHeight) {
      changeTrigger();
    }
  }, [changeTrigger, infScrollLayout]);
  
  // Todo: 초기 렌더링 시에 여러번 호출되는 문제 해결하기
  // 화면 크기가 클 때, 무한스크롤 생기도록 설정
  useEffect(() => {
    if (infScrollLayout.current)
      handleScroll();
    else if (page.current === 0)
      changeTrigger();
  }, [changeTrigger, handleScroll, infScrollLayout, infScrollLayout.current?.clientHeight]);

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { triggered };
}