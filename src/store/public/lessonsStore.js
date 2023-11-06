import {Store} from "../baseStore";

const useLessonsStore = new Store("public", "lessons").createStore();

export default useLessonsStore;