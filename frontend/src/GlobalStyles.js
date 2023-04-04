import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }

  th, td {
    padding: 0.5rem;
    text-align: left;
    vertical-align: top;
    border: 1px solid #ccc;
  }

  th {
    background-color: #eee;
  }

  input[type="text"] {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button[type="submit"] {
    padding: 0.5rem;
    border-radius: 4px;
    border: none;
    background-color: #0077cc;
    color: #fff;
    cursor: pointer;
  }
`;

export default GlobalStyles;
