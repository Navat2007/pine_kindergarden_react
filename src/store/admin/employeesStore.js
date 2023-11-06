import {Store} from "../baseStore";

const useEmployeesStore = new Store("admin", "employees").createStore();

export default useEmployeesStore;