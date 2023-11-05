import axios from "axios";
import {create} from 'zustand'
import moment from "moment";

const cacheMinutes = 60;
const directory = 'food/menu';

const urlLoadAll = process.env.REACT_APP_BASE_URL + `php/models/public/${directory}/load.php`;

const useFoodMenuStore = create(
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

                if(response != null){
                    set(() => ({items: response.params, lastDownloadTime: moment()}));
                }
                else {
                    set(() => ({items: []}));
                }
            }
        },
    })
);

export default useFoodMenuStore;