import axios from "axios";
import create from 'zustand'

const urlLoadAllNews = process.env.REACT_APP_BASE_URL + 'php/models/public/news/load.php';
const urlLoadNews = process.env.REACT_APP_BASE_URL + 'php/models/public/news/load_by_id.php';
const urlLoadLastNewsForMainPage = process.env.REACT_APP_BASE_URL + 'php/models/public/news/load_last_for_main_page.php';

const useNewsStore = create(
    (set, get) => ({
        allNews: [],
        news: {},
        lastNewsForMainPage: {},

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
        loadLastNewsForMainPage: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadLastNewsForMainPage, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({lastNewsForMainPage: response.data.params}));

            }

        },
    })
);

export default useNewsStore;