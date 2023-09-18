import axios from "axios";
import create from 'zustand'

const directory = 'about';

const urlLoad = process.env.REACT_APP_BASE_URL + `php/models/admin/${directory}/load.php`;
const urlEdit = process.env.REACT_APP_BASE_URL + `php/models/admin/${directory}/edit.php`;

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
        edit: async (params) => {

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlEdit, form);

            if (response.data) {

                console.log(response.data);

                if (response.data.error === 1) {

                    return {
                        error: true,
                        errorText: response.data.error_text
                    };

                }

            }

            return {error: false};

        },
    })
);

export default useAboutStore;