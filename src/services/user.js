import Api from "./Api";
import axios from "axios";
import moment from "moment/moment";
import {userStore} from "../store/userStore";
import {signal} from "@preact/signals-react";

export const Loading = signal(false);
export const Error = signal("");

export const SetUser = (user, save) => {
    userStore.value = user;
    const authorization = `${user.token}&${user.ID}`;

    axios.defaults.headers.post['Authorization'] = authorization;
    axios.defaults.headers.common["Authorization"] = authorization;

    if (save) {
        window.localStorage.setItem('user', JSON.stringify(user));
    }
}

export const Login = async (params) => {
    try {
        Loading.value = true;

        window.localStorage.removeItem('login');
        window.localStorage.removeItem('pwd');
        window.localStorage.removeItem('remember');

        if (params.remember) {

            window.localStorage.setItem('login', params.login);
            window.localStorage.setItem('pwd', params.password);
            window.localStorage.setItem('remember', 1);

        }

        let form = new FormData();
        window.global.buildFormData(form, params);

        const response = await Api.post('login/check.php', form);

        if (response.params && 'token' in response.params) {
            let tmpObject = {...response.params};
            tmpObject['tokenDate'] = moment(Date.now()).format('DD.MM.YYYY');

            SetUser(tmpObject, true);
        }
        else {
            Error.value = response.error_text;
        }
    } catch (error) {
        console.error(error)
    }
    finally {
        Loading.value = false;
    }
}

export const Logout = () => {
    window.localStorage.removeItem('user');

    axios.defaults.headers.post['Authorization'] = '';
    axios.defaults.headers.common['Authorization'] = '';

    SetUser(false);
}