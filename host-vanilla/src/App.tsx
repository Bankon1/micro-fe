import "./index.css";

import { load, subscribe } from "growlers/store";
import VanillaTaps from "growlers/VanillaTaps";
import VanillaSearch from "growlers/VanillaSearch";
import VanillaCart from "growlers/VanillaCart";

VanillaCart(".cart");
VanillaTaps(".taps");
VanillaSearch(".search");

load("hv-taplist");

subscribe(({ filteredTaps }) => {
  document.querySelector(".beverages").innerHTML = filteredTaps
    .map(({ beverageName }) => beverageName)
    .join(", ");
});
