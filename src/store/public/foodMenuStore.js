import {Store} from "../baseStore";

const useFoodMenuStore = new Store("public", "food/menu").createStore();

export default useFoodMenuStore;