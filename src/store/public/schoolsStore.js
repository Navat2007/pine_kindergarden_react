import axios from "axios";

import create from 'zustand'

const urlLoadSchools = process.env.REACT_APP_BASE_URL + 'php/models/public/schools/load.php';
const urlLoadSchool = process.env.REACT_APP_BASE_URL + 'php/models/public/schools/load_school.php';

const useSchoolsStore = create(
    (set, get) => ({
        schools: [],
        school: {},
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
        loadSchools: async () => {

            set({loading: true});

            const response = await axios.post(urlLoadSchools);

            set({loading: false});

            if(response.data.params){

                set((state) => ({schools: response.data.params}));

            }

        },
        loadSchool: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadSchool, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({school: response.data.params}));

            }

        },
    })
);

export default useSchoolsStore;