import { h, Component } from 'preact'
import styled, { css, keyframes } from 'styled-components'

import { toRem } from '../helpers/styleHelpers'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const StyledSpinner = styled.div`
  position: relative;
  margin: 5px auto;
  border: 4px solid #367db7;
  border-top-color: rgba(0, 0, 0, 0);
  border-left-color: rgba(0, 0, 0, 0);
  width: 40px;
  height: 40px;
  opacity: 0.8;
  border-radius: 50%;
  animation: ${rotate360} 0.7s infinite linear;
  ${p =>
    p.small &&
    css`
      width: 20px;
      height: 20px;
    `};
  ${p =>
    p.whiteSpinner &&
    css`
      border-color: #fff;
      border-top-color: rgba(0, 0, 0, 0);
      border-left-color: rgba(0, 0, 0, 0);
    `};
  ${p =>
    p.marginTop &&
    css`
      margin-top: ${toRem(`${p.marginTop}px`)};
    `};
`

const AbsoluteSpinner = styled(StyledSpinner)`
  position: absolute;
  top: 25%;
  left: 50%;
  margin: -20px 0 0 -20px;
`

class Spinner extends Component {
  state = { show: false }

  componentDidMount() {
    this.delay = setTimeout(() => this.setState({ show: true }), 800)
  }

  componentWillUnmount() {
    clearTimeout(this.delay)
  }

  render({ small, whiteSpinner, marginTop, absolute }) {
    if (!this.state.show) return null
    const SpinnerComponent = absolute ? AbsoluteSpinner : Spinner
    return (
      <SpinnerComponent
        className="spinner"
        small={small}
        whiteSpinner={whiteSpinner}
        marginTop={marginTop}
      />
    )
  }
}

export default Spinner
