import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";

import { load } from "growlers/store";
import Taps from "growlers/Taps";
import Search from "growlers/Search";
import Cart from "growlers/Cart";
import DataComponent from "growlers/DataComponent";

load("hv-taplist");

const App = () => (
  <ChakraProvider>
    <div
      style={{
        maxWidth: "960px",
        margin: "auto",
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        gridColumnGap: "1rem",
      }}
    >
      <div>
        <Search></Search>
        <Cart></Cart>
        <DataComponent>
          {({ filteredTaps }) =>
            filteredTaps.map(({ beverageName }) => (
              <div key={beverageName}>{beverageName}</div>
            ))
          }
        </DataComponent>
      </div>
      <Taps></Taps>
    </div>
  </ChakraProvider>
);

ReactDOM.render(<App />, document.getElementById("app"));
