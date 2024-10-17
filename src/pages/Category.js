import { Box, Button, Center, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import ItemList from "../components/ItemList";
import Loading from "../components/Loading";
import { RiArrowUpDownFill } from "react-icons/ri";
import SearchHandler from "../components/search";
import { getData } from "../services/essentials";
import { useLocation } from "react-router-dom";

export default function Category() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [isFirst, setisFirst] = useState(true);

  const onSortHandler = () => {
    const temp = [...data];
    const asc = temp.sort((a, b) => {
      return a.price - b.price;
    });

    if (isFirst === true) {
      setisFirst(false);
      setData(asc);
    } else {
      setData(data.reverse());
    }
  };

  useEffect(() => {
    const currentLocation = location.pathname;
    if (
      currentLocation === "/categories/men" ||
      "/categories/women" ||
      "/categories/unisex" ||
      "/categories/all"
    ) {
      getData(currentLocation.substring(12, currentLocation.length))
        .then((res) => {
          setData(res.result);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("wrong page");
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      <Center>
        <HStack bg="gray" w="100%" h="5rem" justifyContent="space-around">
          <Box>
            <SearchHandler />
          </Box>
          <Box display="flex">
            <Button
              onClick={onSortHandler}
              fontSize="1.2rem"
              color="lblack"
              p="0 1rem"
              h="2.4rem"
              bg="white"
              borderRadius="4px"
            >
              sort
              {
                <RiArrowUpDownFill
                  style={{ marginTop: "0.2rem", marginLeft: "0.1rem" }}
                />
              }
            </Button>
          </Box>
        </HStack>
      </Center>
      <ItemList data={data} />
    </Box>
  );
}
