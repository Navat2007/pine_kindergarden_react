import {Store} from "../baseStore";

const useTeachersStore = new Store("public", "teachers").createStore();

export default useTeachersStore;