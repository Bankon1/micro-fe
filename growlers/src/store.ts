import { proxy, subscribe as valtioSubscribe, snapshot } from "valtio";
import { Beverage } from "./types";

export interface TapStore {
  taps: Beverage[];
  filteredTaps: Beverage[];
  cart: Beverage[];
  searchText: string;
  alkoholLimit: number;
}

const store = proxy<TapStore>({
  taps: [],
  filteredTaps: [],
  cart: [],
  searchText: "",
  alkoholLimit: 10,
});

const filter = () => {
  const serachRE = new RegExp(store.searchText, "i");

  return store.taps
    .filter(({ beverageName, abv }) => {
      return beverageName.match(serachRE) && abv < store.alkoholLimit;
    })
    .slice(0, 15);
};

export const load = (client: string) => {
  fetch(`http://localhost:8080/${client}.json`)
    .then((resp) => resp.json())
    .then((taps: Beverage[]) => {
      store.taps = taps;
      store.filteredTaps = filter();
    });
};

export const setSearchText = (text: string) => {
  store.searchText = text;
  store.filteredTaps = filter();
};

export const setAlcoholLimit = (limit: number) => {
  store.alkoholLimit = limit;
  store.filteredTaps = filter();
};
export const addToCart = (beverage: Beverage) => {
  store.cart.push(beverage);
};
export const subscribe = (
  callback: (state: TapStore) => void
): (() => void) => {
  callback(snapshot(store));
  return valtioSubscribe(store, () => callback(snapshot(store)));
};

export default store;
