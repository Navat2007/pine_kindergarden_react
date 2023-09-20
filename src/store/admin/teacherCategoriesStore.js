import axios from "axios";
import create from 'zustand'

const directory = 'teachers/categories';

const urlLoadAll = process.env.REACT_APP_BASE_URL + `php/models/admin/${directory}/load.php`;
const urlLoadByID = process.env.REACT_APP_BASE_URL + `php/models/admin/${directory}/load_by_id.php`;

const urlAdd = process.env.REACT_APP_BASE_URL + `php/models/admin/${directory}/add.php`;
const urlEdit = process.env.REACT_APP_BASE_URL + `php/models/admin/${directory}/edit.php`;
const urlRemove = process.env.REACT_APP_BASE_URL + `php/models/admin/${directory}/remove.php`;

const useTeachersCategoriesStore = create(
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

        add: async (params) => {

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlAdd, form);

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
        remove: async (params) => {

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlRemove, form);

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

export default useTeachersCategoriesStore;