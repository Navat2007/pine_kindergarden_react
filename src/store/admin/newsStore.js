import {Store} from "../baseStore";

const useNewsStore = new Store("admin", "news").createStore();

export default useNewsStore;