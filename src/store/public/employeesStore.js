import {Store} from "../baseStore";

const useEmployeesStore = new Store("public", "employees").createStore();

export default useEmployeesStore;