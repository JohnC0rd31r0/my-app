import narutoImg from '../../images/naruto.png';
import styled from 'styled-components';
import { Quotes } from '../../components';
import { GlobalStyle } from '../../components';
import { getQuote } from '../../services';
import { useState, useEffect, useRef } from 'react';
import jutsoSound from '../../sounds/jutso.mp3';

const audio = new Audio(jutsoSound);

export default function App() {
  let isMounted = useRef(true);

  const [quoteState, setQuoteState] = useState({
    quote: 'ok',
    speaker: 'Speaker',
  });

  const onUpdate = async () => {
    const quote = await getQuote();

    audio.play();
    setQuoteState(quote);
    isMounted.current = false;
  };

  useEffect(() => {
    onUpdate();
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <Content>
      <GlobalStyle></GlobalStyle>
      <Quotes
        quote={quoteState.value}
        speaker={'Chuck Norris'}
        onUpdate={onUpdate}
      />
      <NarutoImg src={narutoImg} alt="Naruto with a kunai" />
    </Content>
  );
}

const Content = styled.div`
  height: 100vh;
  padding: 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NarutoImg = styled.img`
  max-width: 50vw;
  align-self: flex-end;
`;
