import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { GrFormAdd } from "react-icons/gr";
import { GrFormSubtract } from "react-icons/gr";

export default function CartItems({
  img,
  price,
  key,
  item,
  setItems,
  reload,
  qty,
}) {
  const [value, setValue] = useState(qty);
  const [total, setTotal] = useState(price);

  const removeItem = () => {
    const cart_items = JSON.parse(localStorage.getItem("@cart_items")) || [];
    const itemIndex = cart_items.findIndex((cartItem) => cartItem.img === img);
    if (itemIndex !== -1) {
      const currentItem = cart_items[itemIndex];
      if (currentItem.qty > 1) {
        currentItem.qty -= 1;
        setValue(currentItem.qty);
      } else {
        cart_items.splice(itemIndex, 1);
      }
      localStorage.setItem("@cart_items", JSON.stringify(cart_items));
      setItems(cart_items);
      reload();
    }
  };

  const addItem = () => {
    setValue(value + 1);
    const cart_items = JSON.parse(localStorage.getItem("@cart_items")) || [];
    cart_items.push({ img: item.img, price: item.price });
    localStorage.setItem("@cart_items", JSON.stringify(cart_items));
    reload();
  };

  useEffect(() => {
    if (value > 1) {
      setTotal(price * value);
    } else if (value === 1) {
      setTotal(price);
    } else if (value === 0) {
      const cart_items = JSON.parse(localStorage.getItem("@cart_items"));
      const updatedCart = cart_items.filter(
        (cartItem) => cartItem.img !== item.img
      );
      localStorage.setItem("@cart_items", JSON.stringify(updatedCart));
      setItems(updatedCart);
      reload();
    }
  }, [value, price, item, setItems]);

  return (
    <>
      <Center display={{ sm: "none", md: "block", lg: "block", xl: "block" }}>
        <Box w="46rem">
          <Center>
            <VStack>
              <Box w="42.5rem">
                <HStack key={key}>
                  <Image src={img} w="8rem" h="10rem" />
                  <Spacer />
                  <Box>
                    <Flex>
                      <Box
                        bg="gray"
                        w="1rem"
                        h="1rem"
                        mt="0.6rem"
                        onClick={removeItem}
                      >
                        {<GrFormSubtract />}
                      </Box>
                      <Box
                        fontSize="1.4rem"
                        border="1px solid #5E5E5E"
                        w="2.2rem"
                        h="2.2rem"
                        borderRadius="4px"
                        ml="0.6rem"
                        mr="0.6rem"
                        align="center"
                      >
                        {value}
                      </Box>
                      <Box
                        bg="gray"
                        w="1rem"
                        h="1rem"
                        mt="0.6rem"
                        onClick={addItem}
                      >
                        {<GrFormAdd />}
                      </Box>
                    </Flex>
                  </Box>
                  <Spacer />
                  <Box>${price}</Box>
                  <Spacer />
                  <Box>${total}</Box>
                </HStack>
              </Box>
            </VStack>
          </Center>
        </Box>
      </Center>

      <Box display={{ sm: "block", md: "none", lg: "none", xl: "none" }}>
        <Box justifyContent="center">
          <VStack key={key}>
            <Image src={img} w="8rem" h="10rem" />
            <Box>
              <Flex>
                <Box bg="gray" w="0.8rem" h="0.8rem" mt="0.6rem" onClick={removeItem}>
                  {<GrFormSubtract />}
                </Box>
                <Box
                  fontSize="1.4rem"
                  border="1px solid #5E5E5E"
                  w="1.8rem"
                  h="2rem"
                  borderRadius="4px"
                  ml="0.6rem"
                  mr="0.6rem"
                  align="center"
                >
                  {value}
                </Box>
                <Box bg="gray" w="0.8rem" h="0.8rem" mt="0.6rem" onClick={addItem}>
                  {<GrFormAdd />}
                </Box>
              </Flex>
            </Box>
            <Spacer />
            <Box fontSize="1rem">Price:- ${price}</Box>
            <Spacer />
            <Box fontSize="1rem">Total:- ${total}</Box>
          </VStack>
        </Box>
        <Center>
          <Divider w="46rem" color="gray" />
        </Center>
      </Box>
    </>
  );
}
