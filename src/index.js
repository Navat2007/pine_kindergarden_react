import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import moment from "moment";
import localization from 'moment/locale/ru';

import {SocialIcons} from './components/svgs';

import App from './App';

const baseConfig = () => {

    window.global = {
        debug: true,
        debugArea: {
            login: true,
        },
        baseUrl: "https://dssosny.ru/",
    }

    window.global.makeid = (length) => {

        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;

    }

    window.global.buildFormData = (formData, data, parentKey) => {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                window.global.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;

            formData.append(parentKey, value);
        }
    }

    window.global.getSocialIcon = (text) => {

        if (text.includes("t.me/") || text.includes("@"))
            return SocialIcons.t;
        else if (text.includes("vk.com/"))
            return SocialIcons.vk;
        else if (text.includes("ok.ru/"))
            return SocialIcons.ok;
        else if (text.includes("mail.ru/"))
            return SocialIcons.my_mail;
        else if (text.includes("facebook.com/") || text.includes("fb.com/"))
            return SocialIcons.facebook;
        else if (text.includes("plus.google.com/"))
            return SocialIcons.google;
        else if (text.includes("linkedin."))
            return SocialIcons.linkedin;
        else if (text.includes("twitter.com/"))
            return SocialIcons.twitter;
        else if (text.includes("instagram.com/"))
            return SocialIcons.instagram;
        else if (text.includes("youtu"))
            return SocialIcons.youtube;
        else if (text.includes("rutube"))
            return SocialIcons.rutube;
        else if (text.includes("tilda.ws"))
            return SocialIcons.tilda;
        else
            return SocialIcons.default;

    };

    window.global.truncateString = (str, num) => {

        if(!str)
            return "";

        // If the length of str is less than or equal to num
        // just return str--don't truncate it.
        if (str && str.length <= num) {
            return str;
        }
        // Return str truncated with '...' concatenated to the end of str.
        return str.slice(0, num) + "...";
    }

    window.global.getRandomIntNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    window.global.declOfNum = (number, words) => {
        return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
    }

    moment.updateLocale('ru', localization);
    moment().locale("ru");

    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

    if (process.env.DEBUG)
        console.log("App in debug mode!");

}

baseConfig();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
