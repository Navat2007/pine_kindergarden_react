import {Store} from "../baseStore";

const useLessonsStore = new Store("admin", "lessons").createStore();

export default useLessonsStore;