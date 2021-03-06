import { h } from 'preact'
import styled, { css } from 'styled-components'
import { Link } from 'preact-router/match'
import { toRem } from '../../helpers/styleHelpers'
import darken from 'polished/lib/color/darken'
import transparentize from 'polished/lib/color/transparentize'

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-left: 40px;
`

const NavLink = styled(Link)`
  flex: 0 0 auto;
  display: inline-block;
  ${({ theme }) =>
    css`
      line-height: ${toRem(theme.navHeight)};
    `};
  align-text: center;
  font-weight: 400;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.95);
    opacity: 0.6;
  }
  color: ${p => darken(0.1, p.theme.iconsColor)};
  ${({ disabled }) =>
    disabled &&
    css`
      color: ${p => transparentize(0.5, p.theme.iconsColor)};
      cursor: not-allowed;
      &:hover,
      &:focus {
        opacity: 1;
      }
      &:active {
        transform: none;
        opacity: 1;
      }
    `};
`

export const NavSeparator = styled.span`
  flex: 0 0 auto;
  width: ${toRem(5)};
  height: ${toRem(5)};
  margin: 0 ${toRem(15)};
  border-radius: 50%;
  background: black;
  opacity: 0.35;
`

const NavLinks = ({
  showMobileNav,
  disableRegistration,
  isFeedbackLinkVisible
}) => (
  <Wrapper>
    <NavLink id="home" activeClassName="active" href="/" showMobileNav>
      HOME
    </NavLink>
    <NavSeparator />
    <NavLink id="about" activeClassName="active" href="/about" showMobileNav>
      ABOUT
    </NavLink>
    <NavSeparator />
    <NavLink
      id="registration"
      activeClassName={!disableRegistration && 'active'}
      href={`/${disableRegistration ? '' : 'registration'}`}
      showMobileNav
      disabled={disableRegistration}
    >
      REGISTRATION
    </NavLink>
    {isFeedbackLinkVisible && <NavSeparator />}
    {isFeedbackLinkVisible && (
      <NavLink
        id="feedback"
        activeClassName="active"
        href="/feedback"
        showMobileNav
      >
        FEEDBACK
      </NavLink>
    )}
  </Wrapper>
)

export default NavLinks
