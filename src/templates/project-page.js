import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import Layout from "../components/layout"
import GlobalStateProvider from "../context/provider"
import ContentWrapper from "../styles/contentWrapper"
import SEO from "../components/seo"
import Hero from "../components/sections/hero"
import SmallButton from "../styles/small-button"
import Icon from "../components/icons"
import Underlining from "../styles/underlining"

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 2rem;
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    min-height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 6rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-bottom: 4rem;
    }
  }
  .screenshot {
    width: 100%;
    margin-top: 5rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    transition: all 0.3s ease-out;
    &:hover {
      transform: translate3d(0px, -0.125rem, 0px);
      box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.32);
    }
  }
  .details {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    margin-left: 2rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: 0;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      margin-top: 1.5rem;
      line-height: 1.2rem;
      span {
        margin-right: 1rem;
        margin-bottom: 1rem;
      }
    }
    .links {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      margin-top: 1rem;
      a {
        display: inline-block;
        margin-right: 1rem;
      }
      svg {
        width: 1.3rem;
        height: 1.3rem;
        transition: all 0.3s ease-out;
      }
      svg:hover {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
`

export default function ProjectPost({ data }) {
  const globalState = {
    isIntroDone: true,
    darkMode: false,
  }

  const post = data.mdx
  const { frontmatter } = post
  const { title, subtitle, color } = frontmatter
  return (
    <GlobalStateProvider initialState={globalState}>
      <Layout>
        <SEO title={title} meta={[{ name: "robots", content: "noindex" }]} />
        <StyledSection>
          <StyledContentWrapper>
            <Hero
              content={[
                {
                  node: {
                    frontmatter: {
                      greetings: "",
                      title: title,
                      subtitle: "",
                      subtitlePrefix: subtitle,
                      color: color,
                    },
                    body: post.body,
                  },
                },
              ]}
            />
            <div className="details">
              <div className="tags">
                {frontmatter.tags.map(tag => (
                  <Underlining key={tag} highlight>
                    {tag}
                  </Underlining>
                ))}
              </div>
              <div className="links">
                {frontmatter.github && (
                  <a
                    href={frontmatter.github}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    aria-label="External Link"
                  >
                    <SmallButton>GitHub</SmallButton>
                  </a>
                )}
                {frontmatter.external && (
                  <a
                    href={frontmatter.external}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    aria-label="External Link"
                  >
                    <SmallButton>Website</SmallButton>
                  </a>
                )}
                {frontmatter.appStore && (
                  <a
                    href={frontmatter.appStore}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    aria-label="External Link"
                  >
                    <SmallButton>App Store</SmallButton>
                  </a>
                )}
              </div>
            </div>
            <Img
              fluid={post.frontmatter.screenshot.childImageSharp.fluid}
              className="screenshot"
            />
            {/*<div dangerouslySetInnerHTML={{ __html: post.html }} />*/}
          </StyledContentWrapper>
        </StyledSection>
      </Layout>
    </GlobalStateProvider>
  )
}

ProjectPost.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string.isRequired,
      frontmatter: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        subtitle
        color
        title
        category
        emoji
        external
        github
        appStore
        screenshot {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags
      }
      body
    }
  }
`
