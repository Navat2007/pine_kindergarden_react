import {Store} from "../baseStore";

const useDocumentsStore = new Store("public", "documents").createStore();

export default useDocumentsStore;