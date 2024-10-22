import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./layout/Layout";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routes from "./routes/Routes";
import theme from "./helpers/theme";

const App = () => {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <ToastContainer style={{ width: "fit-content" }} />
        <Layout>{routes}</Layout>
      </ChakraProvider>
    </Router>
  );
};
export default App;
