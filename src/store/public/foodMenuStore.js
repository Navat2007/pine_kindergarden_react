import axios from "axios";
import create from 'zustand'

const directory = 'food/menu';

const urlLoadAll = process.env.REACT_APP_BASE_URL + `php/models/public/${directory}/load.php`;

const useFoodMenuStore = create(
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
    })
);

export default useFoodMenuStore;