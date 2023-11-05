import axios from "axios";
import {create} from 'zustand'
import moment from "moment/moment";

const cacheMinutes = 60;
const directory = 'mediaFiles';

const urlLoadAll = process.env.REACT_APP_BASE_URL + `php/models/admin/${directory}/load.php`;
const urlLoadByID = process.env.REACT_APP_BASE_URL + `php/models/admin/${directory}/load_by_id.php`;

const urlAdd = process.env.REACT_APP_BASE_URL + `php/models/admin/${directory}/add.php`;
const urlEdit = process.env.REACT_APP_BASE_URL + `php/models/admin/${directory}/edit.php`;
const urlRemove = process.env.REACT_APP_BASE_URL + `php/models/admin/${directory}/remove.php`;
const urlRemoveFile = process.env.REACT_APP_BASE_URL + `php/models/admin/${directory}/remove_file.php`;

const useMediaFilesStore = create(
    (set, get) => ({
        items: [],
        item: {},

        loading: false,
        sending: false,
        lastDownloadTime: null,
        cancelToken: null,

        error: false,
        errorText: "",
        setErrorText: (text) => {
            set({error: true, errorText: text});
        },
        clearErrorText: () => {
            set({error: false, errorText: ""});
        },

        request: async (url, params, action = "loading") => {
            if(get().cancelToken !== null)
                get().cancelToken.cancel();

            set({[action]: true, error: false, errorText: "", cancelToken: axios.CancelToken.source()});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(url, form, {cancelToken: get().cancelToken.token}).catch((error) => {});

            set({[action]: false, cancelToken: null});

            if(action === "sending"){
                if (response.data.error && response.data.error === 1) {
                    set(() => ({error: true, errorText: response.data.error_text}));
                }
                else
                {
                    set(() => ({lastDownloadTime: null}));
                }
            }

            if(response.data)
                return response.data;
            else
                return null;
        },

        loadAll: async (params) => {
            if(get().lastDownloadTime === null || moment().diff(moment(get().lastDownloadTime), "minutes") > cacheMinutes)
            {
                const response = await get().request(urlLoadAll, params);

                if(response != null && response.params){
                    set(() => ({items: response.params, lastDownloadTime: moment()}));
                }
                else {
                    set(() => ({items: []}));
                }
            }
        },
        loadByID: async (params) => {
            const response = await get().request(urlLoadByID, params);

            if(response != null && response.params){
                set(() => ({item: response.params}));
            }
            else {
                set(() => ({item: {}}));
            }
        },

        add: async (params) => {
            await get().request(urlAdd, params, "sending");
        },
        edit: async (params) => {
            await get().request(urlEdit, params, "sending");
        },
        remove: async (params) => {
            await get().request(urlRemove, params, "sending");
        },
        removeFile: async (params) => {
            await get().request(urlRemoveFile, params, "sending");
        },
    })
);

export default useMediaFilesStore;