import axios from "axios";
import create from 'zustand'

const directory = 'about';

const urlLoad = process.env.REACT_APP_BASE_URL + `php/models/admin/${directory}/load.php`;

const useAboutStore = create(
    (set, get) => ({
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

        load: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoad, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({item: response.data.params}));

            }

        },
    })
);

export default useAboutStore;