import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react";
import { useProxy } from "valtio";

import { MFE_BORDER } from "../constants";
import store, { setAlcoholLimit, setSearchText } from "../store";

const Search = () => {
  const { searchText, alkoholLimit } = useProxy(store);
  return (
    <Box border={MFE_BORDER}>
      <FormControl id="search">
        <FormLabel>Search</FormLabel>
        <Input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </FormControl>

      <FormControl id="alcohol">
        <FormLabel>Alcohol</FormLabel>
        <Slider
          colorScheme="pink"
          defaultValue={alkoholLimit}
          value={alkoholLimit}
          onChange={(v) => setAlcoholLimit(v)}
          min={0}
          max={17}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
    </Box>
  );
};

export default Search;
