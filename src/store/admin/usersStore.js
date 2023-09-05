import axios from "axios";

import create from 'zustand'

const urlLoadAdmins = process.env.REACT_APP_BASE_URL + 'php/models/admin/users/load_admins.php';
const urlLoadAdmin = process.env.REACT_APP_BASE_URL + 'php/models/admin/users/load_admin.php';
const urlAddAdmin = process.env.REACT_APP_BASE_URL + 'php/models/admin/users/add_admin.php';
const urlEditAdmin = process.env.REACT_APP_BASE_URL + 'php/models/admin/users/edit_admin.php';
const urlRemoveAdmin = process.env.REACT_APP_BASE_URL + 'php/models/admin/users/remove_admin.php';

const urlLoadUsers = process.env.REACT_APP_BASE_URL + 'php/models/admin/users/load_users.php';
const urlLoadUser = process.env.REACT_APP_BASE_URL + 'php/models/admin/users/load_user.php';
const urlAddUser = process.env.REACT_APP_BASE_URL + 'php/models/admin/users/add_user.php';
const urlEditUser = process.env.REACT_APP_BASE_URL + 'php/models/admin/users/edit_user.php';
const urlRemoveUser = process.env.REACT_APP_BASE_URL + 'php/models/admin/users/remove_user.php';

const useUsersStore = create(
    (set, get) => ({
        admins: [],
        admin: {},
        users: [],
        user: {},
        loading: {
            admins: false,
            users: false
        },
        sending: {
            admins: false,
            users: false
        },
        error: {
            admins: false,
            users: false
        },
        errorText: {
            admins: "",
            users: ""
        },
        setErrorText: (text) => {
            set({error: true, errorText: text});
        },
        clearErrorText: () => {
            set({
                error: {
                    admins: false,
                    users: false
                },
                errorText: {
                    admins: "",
                    users: ""
                }
            });
        },

        loadAdmins: async () => {

            set((state) => ({loading: {...state.loading, admins: true}}));

            const response = await axios.post(urlLoadAdmins);

            set((state) => ({loading: {...state.loading, admins: false}}));

            if (response.data.params) {

                set({admins: response.data.params});

            }

        },
        loadAdmin: async (params) => {

            set((state) => ({loading: {...state.loading, admins: true}}));

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadAdmin, form);

            set((state) => ({loading: {...state.loading, admins: false}}));

            if (response.data.params) {

                set({admin: response.data.params});

            }

        },
        addAdmin: async (params) => {

            set((state) => ({sending: {...state.sending, admins: true}}));

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlAddAdmin, form);

            set((state) => ({sending: {...state.sending, admins: false}}));

            if (response.data) {

                if (response.data.error === 1) {

                    set((state) => ({
                        error: {...state.error, admins: true},
                        errorText: {...state.errorText, admins: response.data.error_text}
                    }));

                    return {error: true};

                }

            }

            return {error: false};

        },
        editAdmin: async (params) => {

            set((state) => ({sending: {...state.sending, admins: true}}));

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlEditAdmin, form);

            set((state) => ({sending: {...state.sending, admins: false}}));

            if (response.data) {

                if (response.data.error === 1) {

                    set((state) => ({
                        error: {...state.error, admins: true},
                        errorText: {...state.errorText, admins: response.data.error_text}
                    }));

                    return {error: true};

                }

            }

            return {error: false};

        },
        removeAdmin: async (params) => {

            set((state) => ({sending: {...state.sending, admins: true}}));

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlRemoveAdmin, form);

            set((state) => ({sending: {...state.sending, admins: false}}));

            if (response.data) {

                if (response.data.error === 1) {

                    set((state) => ({
                        error: {...state.error, admins: true},
                        errorText: {...state.errorText, admins: response.data.error_text}
                    }));

                    return {error: true};

                }

            }

            return {error: false};

        },

        loadUsers: async () => {

            set((state) => ({loading: {...state.loading, users: true}}));

            const response = await axios.post(urlLoadUsers);

            set((state) => ({loading: {...state.loading, users: false}}));

            if (response.data.params) {

                set({users: response.data.params});

            }

        },
        loadUser: async (params) => {

            set((state) => ({loading: {...state.loading, users: true}}));

            let form = new FormData();

            for (let key in params) {
                form.append(key, params[key]);
            }

            const response = await axios.postForm(urlLoadUser, form);

            set((state) => ({loading: {...state.loading, users: false}}));

            if (response.data.params) {

                set({user: response.data.params});

            }

        },
        addUser: async (params) => {

            set((state) => ({sending: {...state.sending, users: true}}));

            let form = new FormData();

            for (let key in params) {
                form.append(key, params[key]);
            }

            const response = await axios.postForm(urlAddUser, form);

            set((state) => ({sending: {...state.sending, users: false}}));

            if (response.data) {

                if (response.data.error === 1) {

                    set((state) => ({
                        error: {...state.error, admins: true},
                        errorText: {...state.errorText, admins: response.data.error_text}
                    }));

                    return {error: true};

                }

            }

            return {error: false};

        },
        editUser: async (params) => {

            set((state) => ({sending: {...state.sending, users: true}}));

            let form = new FormData();

            for (let key in params) {
                form.append(key, params[key]);
            }

            const response = await axios.postForm(urlEditUser, form);

            set((state) => ({sending: {...state.sending, users: false}}));

            if (response.data) {

                if (response.data.error === 1) {

                    set((state) => ({
                        error: {...state.error, admins: true},
                        errorText: {...state.errorText, admins: response.data.error_text}
                    }));

                    return {error: true};

                }

            }

            return {error: false};

        },
        removeUser: async (params) => {

            set((state) => ({sending: {...state.sending, users: true}}));

            let form = new FormData();

            for (let key in params) {
                form.append(key, params[key]);
            }

            const response = await axios.postForm(urlRemoveUser, form);

            set((state) => ({sending: {...state.sending, users: false}}));

            if (response.data) {

                if (response.data.error === 1) {

                    set((state) => ({
                        error: {...state.error, admins: true},
                        errorText: {...state.errorText, admins: response.data.error_text}
                    }));

                    return {error: true};

                }

            }

            return {error: false};

        },
    })
);

export default useUsersStore;