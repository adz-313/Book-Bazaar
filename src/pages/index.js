import { graphql } from "gatsby";
import React, {useState} from "react";
import Navbar from "../components/Navbar";
import { useColorMode, Box, Text, SimpleGrid } from '@chakra-ui/react';

import BookCard from '../components/BookCard';

export default function Home({ data }) {
  const books = data.allStrapiBooks.nodes;

  const [cart, setCart] = useState([]);

  const {colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Navbar toggleColorMode={toggleColorMode} colorMode={colorMode} cart={cart} setCart={setCart}/>
      <Box minH="77vh" p="7">
        <Text fontSize="3xl">Featured</Text>
        <SimpleGrid mt="5" columns={[1, 2, 3, 4]} spacing={10}>
          {
            books.map(book => <BookCard book={book} key={book.id} cart={cart} setCart={setCart}/>)
          }
        </SimpleGrid>
      </Box>
      <footer>
          <Text textAlign="center" m="2rem auto">Copyright © 2021 Book Bazaar</Text>
      </footer>
    </>
  )
}

export const query = graphql`
  query MyQuery {
    allStrapiBooks {
      nodes {
        title
        price
        id
        category
        author
        description
        ISBN
      }
    }
  }
`
