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


  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Gabia Gosran', sans-serif;
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
    overscroll-behavior: none;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-y;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
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

  * {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }
`;

export default GlobalStyle;
