import { h } from 'preact'
import styled, { css } from 'styled-components'

import Mailto from './Mailto'

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content; center;
  ${({ theme, color }) =>
    css`
      background: ${theme[color]};
    `};
  min-height: 20vh;
  width: 100%;
`

const Footer = ({ color = 'primaryBlue' }) => (
  <StyledFooter color={color}>
    <Mailto email="richard.vancamp@gmail.com" />
  </StyledFooter>
)

export default Footer
