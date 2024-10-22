import { Box, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { FaLongArrowAltUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";

function ItemList({ data }) {
  const icon = { color: "#5E5E5E", fontSize: "1.4rem" };
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
    >
      {data?.map((item) => (
        <Link
          to={{
            pathname: "/item",
            hash: "",
            search: `Name=${item.seller}&img=${item.img}&des=${item.description}&name=${item.name}&price=${item.price}&instock=${item.inStock}`,
          }}
        >
          <Box
            key={item.id}
            w="18.5rem"
            alignItems="center"
            style={{ borderRadius: "4px" }}
            float="left"
            m="4rem 1rem"
            boxShadow="rgba(0, 0, 0, 0.15) 0px 3px 3px 0px"
          >
            <Image
              src={item.img}
              borderRadius="4px 4px 0 0"
              alt="image"
              mx="auto"
            />
            <Box bg="offWhite" w="18.5rem" h="5rem" borderRadius="0 0 4px 4px">
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
                  {item.name}
                </Text>
              </Box>
              <HStack pl="0.8rem" pr="0.8rem">
                <Text color="lblack" fontSize="1.1rem">
                  ${item.price}
                </Text>
                <Spacer />
                <MdAddShoppingCart style={icon} />
              </HStack>
            </Box>
          </Box>
        </Link>
      ))}
      {showButton && (
        <Box
          as="button"
          onClick={scrollToTop}
          position="fixed"
          bottom="20px"
          right="20px"
          bg="red"
          borderRadius="50%"
          p={4}
        >
          <FaLongArrowAltUp style={{ color: "#fff", fontSize: "1.8rem" }} />
        </Box>
      )}
    </Box>
  );
}

export default ItemList;
