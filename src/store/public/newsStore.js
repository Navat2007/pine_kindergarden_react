import axios from "axios";
import create from 'zustand'

const directory = 'news';

const urlLoadAll = process.env.REACT_APP_BASE_URL + `php/models/public/${directory}/load.php`;
const urlLoadByID = process.env.REACT_APP_BASE_URL + `php/models/public/${directory}/load_by_id.php`;

const useNewsStore = create(
    (set, get) => ({
        items: [],
        item: {},

        loading: false,
        sending: false,

        error: false,
        errorText: "",
        setErrorText: (text) => {
            set({error: true, errorText: text});
        },
        clearErrorText: () => {
            set({error: false, errorText: ""});
        },

        loadAll: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadAll, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({items: response.data.params}));

            }

        },
        loadByID: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadByID, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({item: response.data.params}));

            }

        },
    })
);

export default useNewsStore;