import {Store} from "../baseStore";

const useUsersStore = new Store("admin", "users").createStore();

export default useUsersStore;