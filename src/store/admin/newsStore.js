import axios from "axios";
import create from 'zustand'

const urlLoadAllNews = process.env.REACT_APP_BASE_URL + 'php/models/admin/news/load.php';
const urlLoadNews = process.env.REACT_APP_BASE_URL + 'php/models/admin/news/load_by_id.php';

const urlAddNews = process.env.REACT_APP_BASE_URL + 'php/models/admin/news/add.php';
const urlEditNews = process.env.REACT_APP_BASE_URL + 'php/models/admin/news/edit.php';
const urlRemoveNews = process.env.REACT_APP_BASE_URL + 'php/models/admin/news/remove.php';
const urlRemoveFile = process.env.REACT_APP_BASE_URL + 'php/models/admin/news/remove_file.php';

const useNewsStore = create(
    (set, get) => ({
        allNews: [],
        news: {},

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

        loadAllNews: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadAllNews, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({allNews: response.data.params}));

            }

        },
        loadNews: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadNews, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({news: response.data.params}));

            }

        },

        addNews: async (params) => {

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlAddNews, form);

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
        editNews: async (params) => {

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlEditNews, form);

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
        removeNews: async (params) => {

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlRemoveNews, form);

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

export default useNewsStore;