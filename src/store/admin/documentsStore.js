import {Store} from "../baseStore";

const useDocumentsStore = new Store("admin", "documents").createStore();

export default useDocumentsStore;