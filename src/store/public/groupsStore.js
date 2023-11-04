import axios from "axios";
import create from 'zustand'
import moment from "moment";

const cacheMinutes = 60;
const directory = 'groups';

const urlLoadAll = process.env.REACT_APP_BASE_URL + `php/models/public/${directory}/load.php`;
const urlLoadByID = process.env.REACT_APP_BASE_URL + `php/models/public/${directory}/load_by_id.php`;

const useGroupsStore = create(
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
        loadByID: async (params) => {
            const response = await get().request(urlLoadByID, params);

            if(response != null){
                set(() => ({item: response}));
            }
            else {
                set(() => ({item: {}}));
            }
        },
    })
);

export default useGroupsStore;