import {Store} from "../baseStore";

const useCustomPagesStore = new Store("public", "customPages").createStore();

export default useCustomPagesStore;