import {Store} from "../baseStore";

const useMediaFilesStore = new Store("admin", "mediaFiles").createStore();

export default useMediaFilesStore;