import create from 'zustand'
import moment from "moment";
import axios from "axios";

const cacheMinutes = 60;
const directory = 'about';

const urlLoad = process.env.REACT_APP_BASE_URL + `php/models/public/${directory}/load.php`;

const useAboutStore = create(
    (set, get) => ({
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

        load: async (params) => {
            if(get().lastDownloadTime === null || moment().diff(moment(get().lastDownloadTime), "minutes") > cacheMinutes)
            {
                const response = await get().request(urlLoad, params);

                if(response != null){
                    set(() => ({item: response, lastDownloadTime: moment()}));
                }
                else {
                    set(() => ({item: {}}));
                }
            }
        },
    })
);

export default useAboutStore;