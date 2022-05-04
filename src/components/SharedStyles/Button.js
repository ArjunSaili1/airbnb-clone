import styled from "styled-components"

export default styled.button`
  background-color: ${props => 
  props.submit ?  "#77dd77" : 
  props.cancel ? "#dc3545" : "#FFFFFF"};
  border: 1px solid #222222;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.8em;
  font-weight: 600;
  padding: 10px 15px;
  text-align: center;

  &:focus-visible {
  box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
  transition: box-shadow .2s;
  }

  &:active {
  background-color: #F7F7F7;
  border-color: #000000;
  transform: scale(.95);
  }

  &:disabled {
  border-color: #DDDDDD;
  color: #DDDDDD;
  cursor: not-allowed;
  }
`