import React from 'react'
import { Overlay } from '../SharedStyles'
import { StyledMobileMenu, MobileMenuContainer } from './Header.styled'

export default function MobileMenu({hide}) {
  return (
    <MobileMenuContainer>
      <Overlay onClick={hide} style={{zIndex: "300"}}></Overlay>
      <StyledMobileMenu>
          <h5>placeholder</h5>
      </StyledMobileMenu>
    </MobileMenuContainer>
  )
}
