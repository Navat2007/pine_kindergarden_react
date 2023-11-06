import {Store} from "../baseStore";

const useFoodMenuStore = new Store("admin", "food/menu").createStore();

export default useFoodMenuStore;