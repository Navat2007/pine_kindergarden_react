import {Store} from "../baseStore";

const useNewsStore = new Store("public", "news").createStore();

export default useNewsStore;