import styled from 'styled-components'

export default styled.header`
  z-index: 100;
  flex: 0 1 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  width: 100%;
  border-bottom: black 1px solid;
  background-color: var(--dark);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  > *{
    color: var(--primary)
  }

  > h4:hover{
    filter: brightness(0.97)
  }

  > h4:active{
    filter: brightness(0.85)
  }
`