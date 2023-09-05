import axios from "axios";

import create from 'zustand'

const urlLoadFestivals = process.env.REACT_APP_BASE_URL + 'php/models/admin/festivals/load.php';
const urlLoadFestival = process.env.REACT_APP_BASE_URL + 'php/models/admin/festivals/load_by_id.php';
const urlLoadFestivalRequests = process.env.REACT_APP_BASE_URL + 'php/models/admin/festivals/load_requests.php';
const urlLoadFestivalRequest = process.env.REACT_APP_BASE_URL + 'php/models/admin/festivals/load_request_by_id.php';
const urlAddFestival = process.env.REACT_APP_BASE_URL + 'php/models/admin/festivals/add.php';
const urlEditFestival = process.env.REACT_APP_BASE_URL + 'php/models/admin/festivals/edit_request.php';
const urlRemoveFestival = process.env.REACT_APP_BASE_URL + 'php/models/admin/festivals/remove_festival.php';
const urlFestivalRequestChangeNew = process.env.REACT_APP_BASE_URL + 'php/models/admin/festivals/change_new.php';
const urlFestivalRequestAccept = process.env.REACT_APP_BASE_URL + 'php/models/admin/festivals/accept_request.php';
const urlFestivalRequestDecline = process.env.REACT_APP_BASE_URL + 'php/models/admin/festivals/decline_request.php';

const useFestivalsStore = create(
    (set, get) => ({
        festivals: [],
        festival: null,
        festivalRequests: [],
        festivalRequest: null,

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

        loadFestivals: async (params) => {

            set({ loading: true });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadFestivals, form).catch(error => {
                set({ sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ loading: false });

            if (response?.data?.params) {

                set((state) => ({ festivals: response.data.params }));

            }

        },
        loadFestival: async (params) => {

            set({ loading: true, theatre: null });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadFestival, form).catch(error => {
                set({ sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ loading: false });

            if (response?.data?.params) {

                set((state) => ({ festival: response.data.params }));
                return response.data.params;

            }

        },
        addFestival: async (params) => {

            set({ sending: true });

            let form = new FormData();

            for (let key in params) {

                if (key === "photo") {
                    form.append("files[]", params[key][0]);
                }
                else {
                    form.append(key, params[key]);
                }

            }

            const response = await axios.postForm(urlAddFestival, form);

            set({ sending: false });

            if (response.data) {

                if (response.data.error === 1) {

                    set((state) => ({
                        error: true,
                        errorText: response.data.error_text
                    }));

                    return { error: true };

                }

            }

            return { error: false };

        },
        editFestival: async (params) => {

            set({ sending: true });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlEditFestival, form);

            set({ sending: false });

            if (response.data) {

                if (response.data.error === 1) {

                    set((state) => ({
                        error: true,
                        errorText: response.data.error_text
                    }));

                    return { error: true };

                }

            }

            return { error: false };

        },
        removeFestival: async (params) => {

            set({ sending: true });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlRemoveFestival, form);

            set({ sending: false });

            if (response.data) {

                console.log(response.data);

                if (response.data.error === 1) {

                    set({
                        error: true,
                        errorText: response.data.error_text
                    });

                    return { error: true };

                }

            }

            return { error: false };

        },

        loadFestivalRequests: async (params) => {

            set({ loading: true });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadFestivalRequests, form).catch(error => {
                set({ loading: false, sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ loading: false });

            if (response?.data?.params) {

                set((state) => ({ festivalRequests: response.data.params }));

            }

        },
        loadFestivalRequest: async (params) => {

            set({ loading: true, theatreRequest: null });

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadFestivalRequest, form).catch(error => {
                set({ loading: false, sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ loading: false });

            if (response?.data?.params) {

                set({ festivalRequest: response.data.params });
                return response.data.params;

            }

        },
        festivalRequestChangeNew: async (params) => {

            console.log("new");

            set({ sending: true });

            let form = new FormData();
            window.global.buildFormData(form, params);

            await axios.postForm(urlFestivalRequestChangeNew, form).catch(error => {
                set({ sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ sending: false });

            return { error: false };

        },
        acceptRequest: async (params) => {

            set({ sending: true });

            let form = new FormData();
            window.global.buildFormData(form, params);

            await axios.postForm(urlFestivalRequestAccept, form).catch(error => {
                set({ sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ sending: false });

            return { error: false };

        },
        declineRequest: async (params) => {

            set({ sending: true });

            let form = new FormData();
            window.global.buildFormData(form, params);

            await axios.postForm(urlFestivalRequestDecline, form).catch(error => {
                set({ sending: false, error: true, errorText: error });
                return { error: true };
            });

            set({ sending: false });

            return { error: false };

        },
    })
);

export default useFestivalsStore;