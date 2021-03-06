import { h } from 'preact'
import styled, { css } from 'styled-components'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  text-align: center;
  color: white;
  box-sizing: border-box;
  height: 100%;
  ${({ background }) =>
    css`
      background: ${background};
    `};
`

export default PageWrapper
