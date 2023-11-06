import axios from "axios";
import {create} from 'zustand'
import moment from "moment/moment";

export class Store{
    constructor(place, directory, cacheMinutes = 60) {
        this.place = place;
        this.directory = directory;
        this.cacheMinutes = cacheMinutes;

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

                loadAll: async (params) => {
                    if(get().lastDownloadTime === null || moment().diff(moment(get().lastDownloadTime), "minutes") > this.cacheMinutes)
                    {
                        const response = await get().request.sendPostForm(this.urlLoadAll, params);

                        if(response != null && response.params){
                            set(() => ({items: response.params, lastDownloadTime: moment()}));
                        }
                        else {
                            set(() => ({items: []}));
                        }
                    }
                },
                loadAllMain: async (params) => {
                    if(get().lastAllMainDownloadTime === null || moment().diff(moment(get().lastAllMainDownloadTime), "minutes") > this.cacheMinutes)
                    {
                        const response = await get().request.sendPostForm(this.urlLoadAllMain, params);

                        if(response != null){
                            set(() => ({itemsMain: response.params, lastAllMainDownloadTime: moment()}));
                        }
                        else {
                            set(() => ({itemsMain: []}));
                        }
                    }
                },
                loadByID: async (params) => {
                    const response = await get().request.sendPostForm(this.urlLoadByID, params);

                    if(response != null && response.params){
                        set(() => ({item: response.params}));
                    }
                    else {
                        set(() => ({item: {}}));
                    }
                },
            };

            if(this.place === "admin"){
                config['add'] = async (params) => {
                    await get().request.sendPostForm(this.urlAdd, params, "sending");
                }
                config['edit'] = async (params) => {
                    await get().request.sendPostForm(this.urlEdit, params, "sending");
                }
                config['remove'] = async (params) => {
                    await get().request.sendPostForm(this.urlRemove, params, "sending");
                }
                config['removeFile'] = async (params) => {
                    await get().request.sendPostForm(this.urlRemoveFile, params, "sending");
                }
            }

            return config;
        };

        return create(
            (set, get) => (getConfig(set, get))
        );
    }
}

export class Request{
    constructor(set, get, ) {
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

        if(response.data)
            return response.data;

        return null;
    }
}