const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    // Remove /index from slug
    const slug = createFilePath({
      node,
      getNode,
      basePath: `projects`,
    }).replace("/index", "")
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      projects: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/index/projects/" }
          frontmatter: { visible: { eq: true } }
          id: { ne: "2d2e2014-1f78-5b11-ba48-57eac5e393d4" }
        }
        sort: { fields: [frontmatter___position], order: ASC }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.projects.edges.forEach(({ node }) => {
    console.log("NEW PAGE: " + node.fields.slug)
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/project-page.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}
