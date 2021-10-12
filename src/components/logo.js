import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"

import { siteShortTitle } from "../../config"

const StyledLogo = styled.div`
  position: relative;
  z-index: 13;

  font-size: ${({ size }) => (size ? size : "1.75rem")};
  font-weight: 900;
  color: ${({ theme, color }) => theme.colors[color] || color};

  /* Disable effects when sidebar is open */
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
`

const Logo = ({ data, color, size }) => (
  <StaticQuery
    query={graphql`
      {
        image: allFile(filter: { relativePath: { eq: "favicon.png" } }) {
          nodes {
            childImageSharp {
              fixed(width: 50, height: 50, quality: 90) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    `}
    render={data => {
      console.log(data)
      return <Img fixed={data.image.nodes[0].childImageSharp.fixed} />
    }}
  />
)

Logo.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  data: PropTypes.object.isRequired,
}

export default Logo
