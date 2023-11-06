import {Store} from "../baseStore";

const useFoodStore = new Store("public", "food").createStore();

export default useFoodStore;