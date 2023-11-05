import axios from "axios";
import {create} from 'zustand'
import moment from "moment/moment";

const cacheMinutes = 60;
const directory = 'news';

const urlLoadAll = process.env.REACT_APP_BASE_URL + `php/models/public/${directory}/load.php`;
const urlLoadByID = process.env.REACT_APP_BASE_URL + `php/models/public/${directory}/load_by_id.php`;
const urlLoadAllMain = process.env.REACT_APP_BASE_URL + `php/models/public/${directory}/load_last_for_main_page.php`;

const useNewsStore = create(
    (set, get) => ({
        itemsMain: [],
        items: [],
        item: {},

        loading: false,
        sending: false,
        lastDownloadTime: null,
        lastAllMainDownloadTime: null,
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
                console.log("load all");
                const response = await get().request(urlLoadAll, params);

                if(response != null){
                    set(() => ({items: response, lastDownloadTime: moment()}));
                }
                else {
                    set(() => ({items: []}));
                }
            }
        },
        loadAllMain: async (params) => {
            if(get().lastAllMainDownloadTime === null || moment().diff(moment(get().lastAllMainDownloadTime), "minutes") > cacheMinutes)
            {
                const response = await get().request(urlLoadAllMain, params);

                if(response != null){
                    set(() => ({itemsMain: response.params, lastAllMainDownloadTime: moment()}));
                }
                else {
                    set(() => ({itemsMain: []}));
                }
            }
        },
        loadByID: async (params) => {
            const response = await get().request(urlLoadByID, params);

            if(response != null){
                set(() => ({item: response.params}));
            }
            else {
                set(() => ({item: {}}));
            }
        },
    })
);

export default useNewsStore;