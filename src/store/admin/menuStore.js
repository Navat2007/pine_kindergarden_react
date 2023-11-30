import {SignalRequest, Store} from "../baseStore";
import {signal} from "@preact/signals-react";
import moment from "moment";

const loading = signal(false);
const sending = signal(false);
const error = signal(null);
const items = signal([]);
const item = signal(false);

const baseStore = new Store("admin", "menu");
const request = new SignalRequest({loading: loading, sending: sending, error: error});

let lastDownloadTime = null;

const loadAll = async (params, debug, force = true) => {
    if (force || lastDownloadTime === null || moment().diff(moment(lastDownloadTime), "minutes") > baseStore.cacheMinutes) {
        const response = await request.sendPostForm(baseStore.urlLoadAll, params);

        if (debug)
            console.log(response);

        if (response != null && response.params) {
            items.value = response.params;
            lastDownloadTime = moment();
        } else {
            items.value = [];
            lastDownloadTime = null;
        }
    }
}

const loadByID = async (params, debug) => {
    item.value = false;
    const response = await request.sendPostForm(baseStore.urlLoadByID, params);

    if (debug)
        console.log(response);

    if (response != null && response.params) {
        item.value = response.params;
        return response.params;
    }
}

const add = async (params, debug) => {
    const response = await request.sendPostForm(baseStore.urlAdd, params, true);

    if (debug)
        console.log(response);
}

const edit = async (params, debug) => {
    const response = await request.sendPostForm(baseStore.urlEdit, params, true);

    if (debug)
        console.log(response);
}

const remove = async (params, debug) => {
    const response = await request.sendPostForm(baseStore.urlRemove, params, true);

    if (debug)
        console.log(response);
}

const save = async (params, debug) => {
    const response = await request.sendPostForm(baseStore.baseUrl + "saveSorting.php", params, true);

    if (debug)
        console.log(response);
}

export default {
    items: items,
    item: item,
    loading: loading,
    sending: sending,
    error: error,
    loadAll: loadAll,
    loadByID: loadByID,
    add: add,
    edit: edit,
    save: save,
    remove: remove
};