import axios from "axios";
import {create} from 'zustand'
import moment from "moment/moment";
import {isFunction} from "lodash";

export class Store{
    constructor(place, directory, config = {}, cacheMinutes = 60) {
        this.place = place;
        this.directory = directory;
        this.config = config;
        this.cacheMinutes = cacheMinutes;

        this.baseUrl = process.env.REACT_APP_BASE_URL + `php/models/${this.place}/${this.directory}/`;
        this.urlLoadAll = process.env.REACT_APP_BASE_URL + `php/models/${this.place}/${this.directory}/load.php`;
        this.urlLoadByID = process.env.REACT_APP_BASE_URL + `php/models/${this.place}/${this.directory}/load_by_id.php`;
        this.urlLoadAllMain = process.env.REACT_APP_BASE_URL + `php/models/${this.place}/${this.directory}/load_last_for_main_page.php`;
        this.urlAdd = process.env.REACT_APP_BASE_URL + `php/models/${this.place}/${this.directory}/add.php`;
        this.urlEdit = process.env.REACT_APP_BASE_URL + `php/models/${this.place}/${this.directory}/edit.php`;
        this.urlRemove = process.env.REACT_APP_BASE_URL + `php/models/${this.place}/${this.directory}/remove.php`;
        this.urlRemoveFile = process.env.REACT_APP_BASE_URL + `php/models/${this.place}/${this.directory}/remove_file.php`;
    }

    createStore (){

        const getConfig = (set, get) => {
            let config = {
                items: [],
                itemsMain: [],
                item: {},

                loading: false,
                sending: false,
                lastDownloadTime: null,
                lastAllMainDownloadTime: null,
                cancelToken: null,

                error: false,
                errorText: "",
                setErrorText: (text) => {
                    set({error: true, errorText: text});
                },
                clearErrorText: () => {
                    set({error: false, errorText: ""});
                },

                request: new Request(set, get),

                loadAll: async (params, debug) => {
                    if(this.place === "admin" || get().lastDownloadTime === null || moment().diff(moment(get().lastDownloadTime), "minutes") > this.cacheMinutes)
                    {
                        const response = await get().request.sendPostForm(this.urlLoadAll, params);

                        if(debug)
                            console.log(response);

                        if(response != null && response.params){
                            set(() => ({items: response.params, lastDownloadTime: moment()}));
                            return response.params;
                        }
                        else {
                            set(() => ({items: []}));
                            return [];
                        }
                    }

                    return get().items;
                },
                loadAllMain: async (params, debug) => {
                    if(get().lastAllMainDownloadTime === null || moment().diff(moment(get().lastAllMainDownloadTime), "minutes") > this.cacheMinutes)
                    {
                        const response = await get().request.sendPostForm(this.urlLoadAllMain, params);

                        if(debug)
                            console.log(response);

                        if(response != null){
                            set(() => ({itemsMain: response.params, lastAllMainDownloadTime: moment()}));
                            return response.params;
                        }
                        else {
                            set(() => ({itemsMain: []}));
                            return [];
                        }
                    }

                    return get().itemsMain;
                },
                loadByID: async (params, debug) => {
                    const response = await get().request.sendPostForm(this.urlLoadByID, params);

                    if(debug)
                        console.log(response);

                    if(response != null && response.params){
                        set(() => ({item: response.params}));
                        return response.params;
                    }
                    else {
                        set(() => ({item: {}}));
                        return {};
                    }
                },

                add: async () => {},
                edit: async () => {},
                remove: async () => {},
                removeFile: async () => {},

                setItems: (items) => {
                    set(() => ({items: items}));
                },
                setItem: (item) => {
                    set(() => ({item: item}));
                }
            };

            if(this.place === "admin"){
                config['add'] = async (params) => {
                    return await get().request.sendPostForm(this.urlAdd, params, "sending");
                }
                config['edit'] = async (params) => {
                    return await get().request.sendPostForm(this.urlEdit, params, "sending");
                }
                config['remove'] = async (params) => {
                    return await get().request.sendPostForm(this.urlRemove, params, "sending");
                }
                config['removeFile'] = async (params) => {
                    return await get().request.sendPostForm(this.urlRemoveFile, params, "sending");
                }
            }

            if(this.config && Object.keys(this.config).length > 0){
                Object.keys(this.config).forEach(key => {
                    if(isFunction(this.config[key]))
                        config[key] = (...args) => this.config[key]({set, get, ...args});
                    else
                        config[key] = this.config[key];
                });
            }

            return config;
        };

        return create(
            (set, get) => (getConfig(set, get))
        );
    }
}

export class Request{
    constructor(set, get) {
        this.set = set;
        this.get = get;
    }

    async sendPostForm (url, params, action = "loading")  {
        if(this.get().cancelToken !== null)
            this.get().cancelToken.cancel();

        this.set({[action]: true, error: false, errorText: "", cancelToken: axios.CancelToken.source()});

        let form = new FormData();
        window.global.buildFormData(form, params);

        const response = await axios.postForm(url, form, {cancelToken: this.get().cancelToken.token}).catch((error) => {});

        this.set({[action]: false, cancelToken: null});

        if(action === "sending"){
            if (response.data.error && response.data.error === 1) {
                this.set(() => ({error: true, errorText: response.data.error_text}));
            }
            else
            {
                this.set(() => ({lastDownloadTime: null}));
            }
        }

        if(response && response.data)
            return response.data;

        return null;
    }
}

export class SignalRequest{
    constructor(signal) {
        this.signal = signal;
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async sendPostForm (url, params, sending, sleepTime = 500)  {
        this.signal.error.value = null;

        if(sending)
            this.signal.sending.value = true;
        else
            this.signal.loading.value = true;

        let form = new FormData();
        window.global.buildFormData(form, params);

        const response = await axios.postForm(url, form).catch(() => {
            this.signal.error.value = {error: true, errorText: "Ошибка загрузки."};
        });

        await this.sleep(sleepTime);

        if (response && response.data.error && response.data.error > 0) {
            this.signal.error.value = response.data.error_text;
        }

        if(sending)
            this.signal.sending.value = false;
        else
            this.signal.loading.value = false;

        if(response && response.data)
            return response.data;

        return null;
    }
}