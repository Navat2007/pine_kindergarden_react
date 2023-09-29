import axios from "axios";
import moment from "moment";

import create from 'zustand'
import {persist} from "zustand/middleware";

const urlCheck = process.env.REACT_APP_BASE_URL + 'php/models/login/check.php';
const urlEditPhoto = process.env.REACT_APP_BASE_URL + 'php/models/profile/change_photo.php';
const urlEditUser = process.env.REACT_APP_BASE_URL + 'php/models/profile/change_user.php';

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: {},
            loading: false,

            error: false,
            errorText: "",
            setErrorText: (text) => {
                set({error: true, errorText: text});
            },
            clearErrorText: () => {
                set({error: false, errorText: ""});
            },

            setUser: (user) => {
                set({user: user, loading: false, error: false, errorText: ""});
            },

            fetchEditPhoto: async (params) => {

                let form = new FormData();

                for (let key in params) {

                    if(key === "photo"){
                        form.append("files[]", params[key]);
                    }
                    else {
                        form.append(key, params[key]);
                    }

                }

                const response = await axios.postForm(urlEditPhoto, form);

                let photo = "";

                if(response.data.params){
                    photo = response.data.params;
                }

                set((state) => ({user: {...state.user, photo: photo}, loading: false, error: true, errorText: response.data.error_text}));

                const tmpUser = JSON.parse(window.localStorage.getItem('user'));
                tmpUser.photo = photo;
                window.localStorage.setItem('user', JSON.stringify(tmpUser));

            },
            fetchEditUser: async (params) => {

                let form = new FormData();
                window.global.buildFormData(form, params);

                const response = await axios.postForm(urlEditUser, form);

                //console.log(response);

                set((state) => ({user: {...state.user, fio: params.fio, phone: params.phone, position: params.position}, loading: false, error: true, errorText: response.data.error_text}));

                const tmpUser = JSON.parse(window.localStorage.getItem('user'));
                tmpUser.fio = params.fio;
                tmpUser.phone = params.phone;
                tmpUser.position = params.position;
                window.localStorage.setItem('user', JSON.stringify(tmpUser));

            },

            login: async (params) => {

                window.localStorage.removeItem('login');
                window.localStorage.removeItem('pwd');
                window.localStorage.removeItem('remember');

                if (params.remember) {

                    window.localStorage.setItem('login', params.login);
                    window.localStorage.setItem('pwd', params.password);
                    window.localStorage.setItem('remember', 1);

                }

                set({ loading: true,error: false, errorText: "" });

                let form = new FormData();
                window.global.buildFormData(form, params);

                const response = await axios.postForm(urlCheck, form);

                //console.log(response);

                if (response.data.params && 'token' in response.data.params) {
                    let tmpObject = {...response.data.params};
                    tmpObject['tokenDate'] = moment(Date.now()).format('DD.MM.YYYY');
                    window.localStorage.setItem('user', JSON.stringify(tmpObject));
                    axios.defaults.headers.post['Authorization'] = `${tmpObject.token}&${tmpObject.ID}`;

                    get().setUser(tmpObject);
                } else {
                    set({user: null, loading: false, error: true, errorText: response.data.error_text});
                }

                set({ loading: false });
            },
            logout: () => {

                window.localStorage.removeItem('user');
                axios.defaults.headers.post['Authorization'] = '';

                set({user: null, error: false, errorText: ""});

            }
        }),
        {
            name: "auth",
            getStorage: () => sessionStorage,
        }
    )
);

export default useAuthStore;