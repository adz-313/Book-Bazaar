/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    "@chakra-ui/gatsby-plugin",
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `https://fierce-tor-21242.herokuapp.com`,
        queryLimit: 1000, // Defaults to 100
        collectionTypes: [`books`],
      },
    },
  ],
  siteMetadata: {
    title: 'Book Bazaar',
    description: 'Ecommerce site for books'
  }
}
