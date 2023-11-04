import axios from "axios";
import create from 'zustand'
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

        request: async (url, params) => {
            if(get().cancelToken !== null)
                get().cancelToken.cancel();

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            get().cancelToken = axios.CancelToken.source();

            const response = await axios.postForm(url, form, {cancelToken: get().cancelToken.token}).catch((error) => {});

            set({loading: false});

            get().cancelToken = null;

            if(response?.data?.params)
                return response.data.params;
            else
                return null;
        },

        loadAll: async (params) => {
            if(get().lastDownloadTime === null || moment().diff(moment(get().lastDownloadTime), "minutes") > cacheMinutes)
            {
                const response = await get().request(urlLoadAll, params);

                if(response != null){
                    set(() => ({items: response, lastDownloadTime: moment()}));
                }
                else {
                    set(() => ({items: []}));
                }
            }
        },
    })
);

export default useFoodMenuStore;