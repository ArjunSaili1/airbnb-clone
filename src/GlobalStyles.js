import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    :root{
        --dark: #4C5454;
        --primary: #FF715B;
        --background: #1EA896;
        --secondary: #FCDFA6;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, button, input{
        font-family: "DM Sans", sans-serif;
        font-size: min(50% + 1.5vw, 20px);
    }

    a{
        text-decoration: none;
        color: black;
    }

    button{
        cursor: pointer;
        background-color: unset;
        border:none;
    }

    input{
        font-size: 1em;
        padding: 12px;
        border-radius: 5px;
        border-width: 1px;
    }

    input:focus::-webkit-input-placeholder{
        color: transparent
    }

    img{
        width: 100%;
        height: 100%;
    }
`

export default GlobalStyles