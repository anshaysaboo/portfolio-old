import React, { useState, useEffect, useRef, useContext } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import VisibilitySensor from "react-visibility-sensor"
import { motion } from "framer-motion"
import { Link } from "gatsby"

import { useOnScreen } from "../../hooks"
import Context from "../../context"
import ContentWrapper from "../../styles/contentWrapper"
import Underlining from "../../styles/underlining"
import Button from "../../styles/button"
import Icon from "../../components/icons"
import { lightTheme, darkTheme } from "../../styles/theme"

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 4rem;
  .cta-btn {
    display: block;
    text-align: center;
    margin: 2rem auto;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin: 0 auto;
    }
  }
`

const StyledContentWrapper = styled(ContentWrapper)`
  .post-feed {
    display: flex;
    align-items: ;
    flex-wrap: wrap;
  }

  .post-card {
    position: relative;
    flex: 1 1 50%;
    display: flex;
    position: relative;
    height: 20vw;
    background: linear-gradient(135deg, #1f1f1f 0%, #111 100%) center center;
    background-size: cover;
    overflow: hidden;
    counter-increment: posts;
  }

  @media (max-width: 700px) {
    .post-card {
      flex: 1 1 100%;
      height: 70vw;
    }
  }

  .post-card-large {
    flex: 1 1 100%;
  }

  .post-card-link {
    flex: 1 1 auto;
    display: block;
  }

  .post-card-content {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    color: #fff;
    background: rgba(0, 0, 0, 0.1);
    opacity: 1;
    transition: opacity 0.5s cubic-bezier(0.33, 0, 0.2, 1);
  }

  .post-card.with-image .post-card-content {
    opacity: 0;
  }
  @media (max-width: 700px) {
    .post-card.with-image .post-card-content {
      opacity: 1;
    }
  }

  .post-card-link:hover .post-card-content {
    opacity: 1;
    transition: opacity 0.3s cubic-bezier(0.33, 0, 0.2, 1);
  }

  .post-card-title {
    margin: 0;
    display: inline-block;
    font-size: 3.4rem;
    max-width: 70%;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.33, 0, 0.2, 1);
  }

  /* Posts without images */
  .post-card.no-image:before {
    display: block;
    content: counter(posts);
    position: absolute;
    bottom: -0.15em;
    right: 5vw;
    font-size: 28vw;
    line-height: 1em;
    font-weight: var(--font-heavy);
    letter-spacing: -0.1em;
    color: rgba(0, 0, 0, 0.2);
  }

  .post-card.no-image .post-card-content {
    justify-content: flex-start;
    align-items: flex-start;
    padding: 4vw;
  }

  .post-card.no-image .post-card-title {
    font-size: 5rem;
    line-height: 1.15em;
    text-align: left;
  }

  .post-card.no-image:hover .post-card-title {
    text-decoration: underline;
  }

  @media (max-width: 1200px) {
    .post-card.no-image .post-card-title {
      font-size: 3.4rem;
    }
  }
  @media (max-width: 700px) {
    .post-card.no-image:before {
      font-size: 50vw;
    }
  }

  /* Post Content
/* ---------------------------------------------------------- */

  .post-content {
    max-width: 720px;
    margin: 0 auto;
    padding: 6vw 0;
  }

  .post-content-header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .post-content-title {
    margin: 0 0 3vw;
    color: var(--color-base);
    text-align: center;
  }

  .post-content-excerpt {
    margin: -2vw 0 3vw;
    font-size: 2.2rem;
    line-height: 1.6em;
    color: var(--color-base);
    text-align: center;
    opacity: 0.5;
  }
  @media (max-width: 500px) {
    .post-content-excerpt {
      font-size: 1.8rem;
    }
  }

  .post-content-image {
    margin: 4vw 0;
    position: relative;
    width: 75vw;
    min-width: 100%;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    transform: translateX(calc(50vw - 50%));
  }

  .post-content-body {
    font-size: 1.9rem;
    line-height: 1.65em;
  }
  @media (max-width: 500px) {
    .post-content-body {
      font-size: 1.7rem;
    }
  }

  .post-content-body h1,
  .post-content-body h2,
  .post-content-body h3,
  .post-content-body h4,
  .post-content-body h5,
  .post-content-body h6 {
    color: var(--color-base);
  }

  .post-content-body li {
    word-break: break-word;
  }

  .post-content-body li p {
    margin: 0;
  }

  .post-content-body iframe {
    margin: 0 auto !important;
  }

  .post-content-body blockquote {
    margin: 0 0 1.5em;
    padding: 0 1.5em;
    border-left: #3eb0ef 3px solid;
  }

  .post-content-body blockquote p {
    margin: 0 0 1em 0;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
    font-style: italic;
  }

  .post-content-body blockquote p:last-child {
    margin-bottom: 0;
  }

  .post-content-body code {
    padding: 0 5px 2px;
    font-size: 0.8em;
    line-height: 1em;
    font-weight: 400 !important;
    background: var(--color-bg);
    border-radius: 3px;
  }

  .post-content-body p code {
    word-break: break-all;
  }

  .post-content-body pre {
    overflow-x: auto;
    margin: 1.5em 0 3em;
    padding: 20px;
    max-width: 100%;
    border: color(var(--color-base) l(-10%)) 1px solid;
    color: var(--color-bg);
    font-size: 1.4rem;
    line-height: 1.5em;
    background: color(var(--color-base) l(-3%));
    border-radius: 5px;
  }

  .post-content-body pre code {
    padding: 0;
    font-size: inherit;
    line-height: inherit;
    background: transparent;
  }

  .post-content-body pre code :not(span) {
    color: inherit;
  }

  .post-content-body .fluid-width-video-wrapper {
    margin: 1.5em 0 3em;
  }

  .post-content-body hr {
    margin: 4vw 0;
  }

  .post-content-body hr:after {
    content: "";
    position: absolute;
    top: -15px;
    left: 50%;
    display: block;
    margin-left: -10px;
    width: 1px;
    height: 30px;
    background: color(var(--color-border) l(+10%));
    box-shadow: #fff 0 0 0 5px;
    transform: rotate(45deg);
  }
`

const PostCard = props => (
  <article
    className={`post-card ${props.postClass} ${
      props.node.frontmatter.screenshot.childImageSharp
        ? `with-image`
        : `no-image`
    }`}
    style={
      props.node.frontmatter.screenshot && {
        backgroundImage: `url(${props.node.frontmatter.screenshot.childImageSharp.fluid.src})`,
      }
    }
  >
    <Link
      to={/*props.node.fields.slug*/ "/projects"}
      className="post-card-link"
    >
      {/*<Img fluid={props.node.frontmatter.screenshot.childImageSharp.fluid} />*/}
      <div className="post-card-content">
        <h2 className="post-card-title">
          {props.node.frontmatter.title /* || props.node.fields.slug*/}
        </h2>
      </div>
    </Link>
  </article>
)

PostCard.propTypes = {
  node: PropTypes.shape({
    body: PropTypes.string.isRequired,
    frontmatter: PropTypes.object.isRequired,
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  }).isRequired,
  postClass: PropTypes.isRequired,
  count: PropTypes.is,
}

const Gallery = ({ content }) => {
  const { darkMode } = useContext(Context).state
  const sectionDetails = content[0].node
  const projects = content.slice(1, content.length)

  // visibleProject is needed to show which project is currently
  // being viewed in the horizontal slider on mobile and tablet
  const [visibleProject, setVisibleProject] = useState(1)

  // projects don't track the visibility by using the onScreen hook
  // instead they use react-visibility-sensor, therefore their visibility
  // is also stored differently
  const [onScreen, setOnScreen] = useState({})
  const handleOnScreen = el => {
    if (!onScreen[el]) {
      const updatedOnScreen = { ...onScreen }
      updatedOnScreen[el] = true
      setOnScreen(updatedOnScreen)
    }
  }
  const pVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  useEffect(() => {
    // mobile and tablet only: set first project as visible in the
    // horizontal slider
    setVisibleProject(1)
    // required for animations: set visibility for all projects to
    // "false" initially
    let initial = {}
    projects.forEach(project => {
      initial[project.node.frontmatter.position] = false
    })
    setOnScreen(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Required for animating the title
  const tRef = useRef()
  const tOnScreen = useOnScreen(tRef)
  const tVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  // Required for animating the button
  const bRef = useRef()
  const bOnScreen = useOnScreen(bRef)
  const bVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  let postCounter = 0

  return (
    <StyledSection id="projects">
      <StyledContentWrapper>
        <motion.div
          ref={tRef}
          variants={tVariants}
          animate={tOnScreen ? "visible" : "hidden"}
        >
          <h3 className="section-title">{sectionDetails.frontmatter.title}</h3>
          <div className="counter">
            {visibleProject} / {projects.length}
          </div>
        </motion.div>
        <div className="post-feed">
          {projects.map(({ node }, key) => {
            postCounter++
            return (
              <VisibilitySensor
                key={key}
                onChange={() => handleOnScreen(key + 1)}
                partialVisibility={true}
                minTopValue={100}
              >
                <PostCard
                  key={/*node.fields.slug*/ node.frontmatter.title}
                  count={postCounter}
                  node={node}
                  postClass={`post`}
                />
              </VisibilitySensor>
            )
          })}
        </div>
      </StyledContentWrapper>
      <motion.a
        ref={bRef}
        variants={bVariants}
        animate={bOnScreen ? "visible" : "hidden"}
        className="cta-btn"
        href={sectionDetails.frontmatter.buttonUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
        aria-label="External Link"
      >
        <Link to="/projects">
          <Button type="button" textAlign="center" center>
            View All Projects
          </Button>
        </Link>
      </motion.a>
    </StyledSection>
  )
}

Gallery.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Gallery
