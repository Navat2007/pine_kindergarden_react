import {Store} from "../baseStore";

const useTeachersCategoriesStore = new Store("admin", "teachers/categories").createStore();

export default useTeachersCategoriesStore;