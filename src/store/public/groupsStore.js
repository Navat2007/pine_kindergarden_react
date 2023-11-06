import {Store} from "../baseStore";

const useGroupsStore = new Store("public", "groups").createStore();

export default useGroupsStore;