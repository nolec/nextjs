import {createGlobalStyle} from "styled-components";
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset};
  * {
    box-sizing: border-box;
  }
  body{
    background-color: #ffffff;
        margin : 0;
    padding : 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  h1, h2, h3, h4, h5, h6{
  }
  ol, ul, li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;