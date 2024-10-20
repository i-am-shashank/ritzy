import "react-toastify/dist/ReactToastify.css";

import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { GoSearch } from "react-icons/go";
import { searchAll } from "../services/essentials";
import { useHistory } from "react-router-dom";

export default function Search() {
  const [value, setValue] = useState("");
  const history = useHistory();

  const searchCollection = () => {
    const payload = {
      searchTxt: value,
    };
    if (value.trim() !== "") {
      searchAll(payload)
        .then((res) => {
          history.push(`/result/${value}`, { data: res.result });
        })
        .catch(() => {
          toast.error("Something went wrong, please try again");
        });
    }
  };

  return (
    <>
      <ToastContainer  style={{ width: "fit-content" }} position="top-center" />
      <InputGroup size="md">
        <Input
          w={{ xl: "14rem", lg: "13rem", sm: "10rem", md: "11rem" }}
          bg="offWhite"
          placeholder="search collection..."
          onChange={(event) => setValue(event.target.value.toLowerCase())}
          value={value}
        />
        <InputRightAddon
          bg="black"
          transition="all 0.2s"
          _active={{ transform: value.trim() !== "" && "scale(0.96)" }}
          children={<GoSearch color="red" />}
          onClick={searchCollection}
        />
      </InputGroup>
    </>
  );
}
