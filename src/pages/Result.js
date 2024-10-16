import { Box, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { MdAddShoppingCart } from "react-icons/md";
import { useLocation } from "react-router-dom";

export default function Result() {
  const icon = { color: "#5E5E5E", fontSize: "1.4rem" };
  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const location = useLocation();
  const searchResult = location?.state?.data;

  useEffect(() => {
    setData(searchResult);
    setloading(false);
  }, []);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
    >
      {loading ? (
        <Loading />
      ) : Data?.length > 0 ? (
        Data.map((post) => (
          <Link
            to={{
              pathname: "/item",
              hash: "",
              search: `Name=${post.seller}&img=${post.img}&des=${post.description}&name=${post.name}&price=${post.price}&instock=${post.inStock}`,
            }}
            key={post.id}
          >
            <Box
              w="18.5rem"
              alignItems="center"
              style={{ borderRadius: "4px" }}
              float="left"
              m="4rem 1rem"
              boxShadow="rgba(0, 0, 0, 0.15) 0px 3px 3px 0px"
            >
              <Image src={post.img} borderRadius="4px 4px 0 0" alt="image" mx="auto" />
              <Box
                bg="offWhite"
                w="18.5rem"
                h="5rem"
                borderRadius="0 0 4px 4px"
              >
                <Box p="0.8rem">
                  <Text
                    color="lblack"
                    fontSize="1rem"
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: "0.1rem",
                      wordSpacing: "0.1rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {post.name}
                  </Text>
                </Box>
                <HStack pl="0.8rem" pr="0.8rem">
                  <Text color="lblack" fontSize="1.1rem">
                    ${post.price}
                  </Text>
                  <Spacer />
                  <MdAddShoppingCart style={icon} />
                </HStack>
              </Box>
            </Box>
          </Link>
        ))
      ) : (
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
      )}
    </Box>
  );
}
