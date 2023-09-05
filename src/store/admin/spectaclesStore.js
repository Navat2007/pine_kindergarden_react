import axios from "axios";
import create from 'zustand'

const urlLoadSpectacles = process.env.REACT_APP_BASE_URL + 'php/models/admin/spectacles/load.php';
const urlLoadSpectacle = process.env.REACT_APP_BASE_URL + 'php/models/admin/spectacles/load_by_id.php';
const urlLoadSpectacleSchedules = process.env.REACT_APP_BASE_URL + 'php/models/admin/spectacles/load_schedules.php';
const urlLoadSpectacleSchedule = process.env.REACT_APP_BASE_URL + 'php/models/admin/spectacles/load_schedule_by_id.php';

const urlAddSpectacle = process.env.REACT_APP_BASE_URL + 'php/models/admin/spectacles/add.php';
const urlEditSpectacle = process.env.REACT_APP_BASE_URL + 'php/models/admin/spectacles/edit.php';
const urlRemoveSpectacle = process.env.REACT_APP_BASE_URL + 'php/models/admin/spectacles/remove.php';
const urlRemoveFile = process.env.REACT_APP_BASE_URL + 'php/models/admin/spectacles/remove_file.php';

const urlEditSpectacleSchedule = process.env.REACT_APP_BASE_URL + 'php/models/admin/spectacles/edit_schedule.php';

const useSpectaclesStore = create(
    (set, get) => ({
        spectacles: [],
        spectacle: {},

        spectacleSchedules: [],
        spectacleSchedule: {},

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

        loadSpectacles: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadSpectacles, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({spectacles: response.data.params}));

            }

        },
        loadSpectacle: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadSpectacle, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({spectacle: response.data.params}));

            }

        },

        loadSpectacleSchedules: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadSpectacleSchedules, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({spectacleSchedules: response.data.params}));
                return response.data.params;

            }

        },
        loadSpectacleSchedule: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadSpectacleSchedule, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({spectacleSchedule: response.data.params}));
                return response.data.params;

            }

        },

        addSpectacle: async (params) => {

            set({sending: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlAddSpectacle, form);

            set({sending: false});

            if (response.data) {

                if (response.data.error === 1) {

                    set((state) => ({
                        error: true,
                        errorText: response.data.error_text
                    }));

                    return {error: true};

                }

            }

            return {error: false};

        },
        editSpectacle: async (params) => {

            set({sending: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlEditSpectacle, form);

            set({sending: false});

            if (response.data) {

                if (response.data.error === 1) {

                    set((state) => ({
                        error: true,
                        errorText: response.data.error_text
                    }));

                    return {error: true};

                }

            }

            return {error: false};

        },
        removeSpectacle: async (params) => {

            set({sending: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlRemoveSpectacle, form);

            set({sending: false});

            if (response.data) {

                if (response.data.error === 1) {

                    set({
                        error: true,
                        errorText: response.data.error_text
                    });

                    return {error: true};

                }

            }

            return {error: false};

        },
        removeFile: async (params) => {

            set({sending: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlRemoveFile, form);

            set({sending: false});

            if (response.data) {

                if (response.data.error === 1) {

                    set({
                        error: true,
                        errorText: response.data.error_text
                    });

                    return {error: true};

                }

            }

            return {error: false};

        },

        editSpectacleSchedule: async (params) => {

            set({sending: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlEditSpectacleSchedule, form);

            set({sending: false});

            if (response.data) {

                if (response.data.error === 1) {

                    set((state) => ({
                        error: true,
                        errorText: response.data.error_text
                    }));

                    return {error: true};

                }

            }

            return {error: false};

        },
    })
);

export default useSpectaclesStore;