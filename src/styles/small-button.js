import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const StyledButtonDark = styled.button`
  width: 100%;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0 ${({ center }) => (center ? "auto" : "0")};
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  text-decoration: none;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "center")};
  &:hover,
  &:focus,
  &:active {
    cursor: pointer;
    outline: none;
  }
  svg {
    height: 1rem;
    width: 1rem;
    margin-right: 0.3rem;
    margin-bottom: -0.175rem;
  }
`

const StyledButtonLight = styled(StyledButtonDark)`
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background};
  border: 0.125rem solid ${({ theme }) => theme.colors.primary};
`

const SmallButton = ({
  onClick,
  textAlign,
  center,
  children,
  type = "dark",
}) => {
  return type === "light" ? (
    <StyledButtonLight onClick={onClick} textAlign={textAlign} center={center}>
      {children}
    </StyledButtonLight>
  ) : (
    <StyledButtonDark onClick={onClick} textAlign={textAlign} center={center}>
      {children}
    </StyledButtonDark>
  )
}

SmallButton.propTypes = {
  onClick: PropTypes.func,
  textAlign: PropTypes.string,
  center: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  type: PropTypes.string,
}

export default SmallButton
