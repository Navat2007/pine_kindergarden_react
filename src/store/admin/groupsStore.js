import {Store} from "../baseStore";

const useGroupsStore = new Store("admin", "groups").createStore();

export default useGroupsStore;