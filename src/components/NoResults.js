import { Box, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import React from "react";

function NoResults() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      w="100%"
      textAlign="center"
      flexDir="column"
    >
      <Text fontSize="4xl" fontWeight="700" color="lblack">
        No result found
      </Text>
      <Text fontSize={"xl"} color="gray">
        We can't find any item matching your search.
      </Text>
      <Link
        to={{
          pathname: "/",
        }}
      >
        <Box
          mt="1.5rem"
          h="1.8rem"
          as="button"
          color="white"
          bg="red"
          p="0 10px"
          transition="all 0.2s"
          _active={{ transform: "scale(0.96)" }}
          style={{ borderRadius: "0.2rem" }}
        >
          Continue Shopping
        </Box>
      </Link>
    </Box>
  );
}

export default NoResults;
