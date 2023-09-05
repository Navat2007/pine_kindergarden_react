import axios from "axios";
import create from 'zustand'

const urlLoadAll = process.env.REACT_APP_BASE_URL + 'php/models/public/scenarioBank/load_all.php';
const urlLoad = process.env.REACT_APP_BASE_URL + 'php/models/public/scenarioBank/load_by_id.php';
const urlLoadAllFiles = process.env.REACT_APP_BASE_URL + 'php/models/public/scenarioBank/load_all_files_by_id.php';

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

                return response.data.params;

            }

        },
        loadAllFiles: async (params) => {

            let form = new FormData();
            window.global.buildFormData(form, params);

            fetch(urlLoadAllFiles, {
                method: 'POST',
                body: form
            })
                .then(response => {
                    if(response.ok){
                        return response.blob();
                    }
                })
                .then( blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');

                    a.href = url;
                    a.download = "Файлы к сценарию " + params.title + ".zip";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                });

        },
    })
);

export default useScenarioBankStore;