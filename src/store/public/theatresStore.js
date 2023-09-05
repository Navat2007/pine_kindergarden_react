import axios from "axios";
import create from 'zustand'

const urlLoadTheatres = process.env.REACT_APP_BASE_URL + 'php/models/public/theatres/load.php';
const urlLoadTheatre = process.env.REACT_APP_BASE_URL + 'php/models/public/theatres/load_by_id.php';
const urlLoadTheatreActivity = process.env.REACT_APP_BASE_URL + 'php/models/public/theatres/load_activity.php';

const useTheatresStore = create(
    (set, get) => ({
        theatres: [],
        theatre: null,
        theatreActivity: null,

        loading: false,
        sending: false,
        error: false,
        errorText: "",

        setErrorText: (text) => {
            set({ error: true, errorText: text });
        },
        clearErrorText: () => {
            set({ error: false, errorText: "" });
        },

        loadTheatres: async (params) => {

            set({ loading: true });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadTheatres, form).catch(error => {
                set({ loading: false, sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ loading: false });

            if (response?.data?.params) {

                set((state) => ({ theatres: response.data.params }));

            }

        },
        loadTheatre: async (params) => {

            set({ loading: true, theatre: null });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadTheatre, form).catch(error => {
                set({ loading: false, sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ loading: false });

            if (response?.data?.params) {

                set((state) => ({ theatre: response.data.params }));
                return response.data.params;

            }

        },

        loadTheatreActivity: async (params) => {

            set({ loading: true, theatreActivity: null });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadTheatreActivity, form).catch(error => {
                set({ loading: false, sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ loading: false });

            if (response?.data?.params) {

                set((state) => ({ theatreActivity: response.data.params }));
                return response.data.params;

            }

        },
    })
);

export default useTheatresStore;