import axios from "axios";
import create from 'zustand'

const urlLoadTeachers = process.env.REACT_APP_BASE_URL + 'php/models/public/teachers/load.php';
const urlLoadTeacher = process.env.REACT_APP_BASE_URL + 'php/models/public/teachers/load_by_id.php';

const useTeachersStore = create(
    (set, get) => ({
        teachers: [],
        teacher: {},
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
        loadTeachers: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadTeachers, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({teachers: response.data.params}));

            }

        },
        loadTeacher: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadTeacher, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({teacher: response.data.params[0]}));

            }

        },
    })
);

export default useTeachersStore;