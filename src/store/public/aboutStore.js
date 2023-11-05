import {create} from 'zustand'
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

        request: async (url, params, action = "loading") => {
            if (get().cancelToken !== null)
                get().cancelToken.cancel();

            set({[action]: true, error: false, errorText: "", cancelToken: axios.CancelToken.source()});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(url, form, {cancelToken: get().cancelToken.token}).catch((error) => {
            });

            set({[action]: false, cancelToken: null});

            if (action === "sending") {
                if (response.data.error && response.data.error === 1) {
                    set(() => ({error: true, errorText: response.data.error_text}));
                } else {
                    set(() => ({lastDownloadTime: null}));
                }
            }

            if (response.data)
                return response.data;
            else
                return null;
        },

        load: async (params) => {
            if (get().lastDownloadTime === null || moment().diff(moment(get().lastDownloadTime), "minutes") > cacheMinutes) {
                const response = await get().request(urlLoad, params);

                if (response != null) {
                    set(() => ({item: response.params, lastDownloadTime: moment()}));
                } else {
                    set(() => ({item: {}}));
                }
            }
        },
    })
);

export default useAboutStore;