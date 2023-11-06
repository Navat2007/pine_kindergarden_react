import {Store} from "../baseStore";

const useTeachersStore = new Store("admin", "teachers").createStore();

export default useTeachersStore;