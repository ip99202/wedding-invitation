import { createGlobalStyle } from 'styled-components';
import GabiaGosranOTF from '../assets/fonts/GabiaGosran.otf';
import GabiaGosranTTF from '../assets/fonts/GabiaGosran.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Gabia Gosran';
    src: url(${GabiaGosranOTF}) format('opentype'),
         url(${GabiaGosranTTF}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Gabia Gosran', sans-serif;
  }

  *:lang(en) {
    font-family: 'Cinzel', serif;
    font-weight: 600;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fdfdf5;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  #root {
    min-height: 100vh;
    position: relative;
  }
`;

export default GlobalStyle;
