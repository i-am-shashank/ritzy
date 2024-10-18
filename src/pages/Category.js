import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { BsSortUp } from "react-icons/bs";
import { BsSortUpAlt } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { MdAddShoppingCart } from "react-icons/md";
import SearchHandler from "../components/search";
import { getData } from "../services/essentials";
import { useLocation } from "react-router-dom";

export default function Category() {
  const icon = { color: "#5E5E5E", fontSize: "1.4rem" };
  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const location = useLocation();
  const [isAscending, setIsAscending] = useState(true);

  const onSortHandler = () => {
    const temp = [...Data];
    if (isAscending) {
      const asc = temp.sort((a, b) => a.price - b.price);
      setData(asc);
    } else {
      const desc = temp.sort((a, b) => b.price - a.price);
      setData(desc);
    }

    setIsAscending(!isAscending);
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
          setloading(true);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("wrong page");
    }
  }, []);
  return (
    <>
      <Box>
        <Center>
          <HStack bg="gray" w="100%" h="5rem" justifyContent="space-around">
            <Box>
              <SearchHandler />
            </Box>
            <Box display="flex">
              {/* <Center mr="1rem" fontSize="1.2rem" color="lblack" p="0 1rem" h="2.4rem" bg="white" borderRadius="4px"><Flex>filters{<FiFilter style={{ marginTop: "0.2rem" }} />}</Flex></Center> */}
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
                {isAscending ? (
                  <BsSortUpAlt
                    style={{ marginTop: "0.2rem", marginLeft: "0.3rem" }}
                  />
                ) : (
                  <BsSortUp
                    style={{ marginTop: "0.2rem", marginLeft: "0.3rem" }}
                  />
                )}
              </Button>
            </Box>
          </HStack>
        </Center>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
        >
          {loading ? (
            Data.map((post) => (
              <Link
                to={{
                  pathname: "/item",
                  hash: "",
                  search: `Name=${post.seller}&img=${post.img}&des=${post.description}&name=${post.name}&price=${post.price}&instock=${post.inStock}`,
                }}
              >
                <Box
                  key={post.id}
                  w="18.5rem"
                  alignItems="center"
                  style={{ borderRadius: "4px" }}
                  float="left"
                  m="4rem 1rem"
                  boxShadow="rgba(0, 0, 0, 0.15) 0px 3px 3px 0px"
                >
                  <Image
                    src={post.img}
                    borderRadius="4px 4px 0 0"
                    alt="image"
                  />
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
            <Loading />
          )}
        </Box>
      </Box>
      {/* <Box display={{ sm: "block", md: "block", lg: "none", xl: "none" }}>
				<Center>
					<HStack spacing={14} bg="gray" w="100%" h="5rem" pl={{ md: "3rem", sm: "1rem" }} pr={{ md: "3rem", sm: "1rem" }} justifyContent="space-evenly">
						<Box>
							<SearchHandler />
						</Box>
						<Box display={{ sm: "none", md: "block", lg: "block", xl: "block" }}>
							<Center fontSize="1.2rem" color="lblack" w="8.4rem" h="2.4rem" bg="white" borderRadius="4px"><Flex>filters{<FiFilter style={{ marginTop: "0.2rem" }} />}</Flex></Center>
						</Box>
						<Box display={{ sm: "none", md: "block", lg: "block", xl: "block" }}>
							<Center fontSize="1.2rem" color="lblack" w="8.4rem" h="2.4rem" bg="white" borderRadius="4px"><Flex>sort by{<RiArrowUpDownFill style={{ marginTop: "0.2rem", marginLeft: "0.1rem" }} />}</Flex></Center>
						</Box>
						<Box  display={{ sm: "block", md: "none", lg: "none", xl: "none" }}>
							<Menu>
								<MenuButton
									as={IconButton}
									aria-label="Options"
									icon={<BsFilter fontSize="1.5rem"/>}
									variant="outline"
								/>
								<MenuList>
									<MenuItem pl="4.8rem">
										<Center fontSize="1.2rem" color="lblack" w={{ md: "8.4rem", }} h="2.4rem" bg="white" borderRadius="4px"><Flex>filters{<FiFilter style={{ marginTop: "0.2rem" }} />}</Flex></Center>
									</MenuItem>
									<MenuItem pl="4.4rem">
										<Center fontSize="1.2rem" color="lblack" w={{ md: "8.4rem", }} h="2.4rem" bg="white" borderRadius="4px"><Flex>sort by{<RiArrowUpDownFill style={{ marginTop: "0.2rem", marginLeft: "0.1rem" }} />}</Flex></Center>
									</MenuItem>
								</MenuList>
							</Menu>
						</Box>
					</HStack>
				</Center>
				<Box p={{ md: "2rem", sm: "1rem" }}>
					{loading ? Data.map(post => (
						<Link to={{ pathname: '/item', hash: '', search: `Name=${post.seller}&img=${post.img}&des=${post.description}&name=${post.name}&price=${post.price}&instock=${post.inStock}` }}>
							<Box key={post.id} alignItems="center" w="15.8rem" h={{ md: "19.5rem", sm: "20.5rem" }} position="relative" style={{ borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }} float="left" m={{ md: "1.6rem", sm: "1.4rem" }}>
								<Image src={post.img} borderRadius="4px" />
								<Box bg="offWhite" w="15.8rem" position="absolute" h="5rem">
									<Box p={{ md: "0.6rem", sm: "0.4rem" }}>
										<Text color="lblack" fontSize={{ md: "0.9rem" }} style={{ textTransform: "uppercase", letterSpacing: "0.1rem", wordSpacing: "0.1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{post.name}</Text>
									</Box>
									<HStack pl={{ md: "0.6rem", sm: "0.4rem" }} pr={{ md: "0.6rem", sm: "0.4rem" }}>
										<Text color="lblack" fontSize="1.1rem">${post.price}</Text>
										<Spacer />
										<MdAddShoppingCart style={icon} />
									</HStack>
								</Box>
							</Box>
						</Link>
					)) : <Loading />}
				</Box>
			</Box> */}
    </>
  );
}
