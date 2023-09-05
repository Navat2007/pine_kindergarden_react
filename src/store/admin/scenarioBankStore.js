import axios from "axios";
import create from 'zustand'

const urlLoadAll = process.env.REACT_APP_BASE_URL + 'php/models/admin/scenarioBank/load_all.php';
const urlLoad = process.env.REACT_APP_BASE_URL + 'php/models/admin/scenarioBank/load_by_id.php';

const urlAdd = process.env.REACT_APP_BASE_URL + 'php/models/admin/scenarioBank/add.php';
const urlEdit = process.env.REACT_APP_BASE_URL + 'php/models/admin/scenarioBank/edit.php';
const urlRemove = process.env.REACT_APP_BASE_URL + 'php/models/admin/scenarioBank/remove.php';
const urlRemoveFile = process.env.REACT_APP_BASE_URL + 'php/models/admin/scenarioBank/remove_file.php';

const useScenarioBankStore = create(
    (set, get) => ({
        scenarios: [],
        scenario: {},

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

                set((state) => ({scenarios: response.data.params}));

            }

        },
        load: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoad, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({scenario: response.data.params}));

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
        removeFile: async (params) => {

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlRemoveFile, form);

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

export default useScenarioBankStore;