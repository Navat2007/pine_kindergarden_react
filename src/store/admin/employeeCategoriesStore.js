import {Store} from "../baseStore";

const useEmployeesCategoriesStore = new Store("admin", "employees/categories").createStore();

export default useEmployeesCategoriesStore;