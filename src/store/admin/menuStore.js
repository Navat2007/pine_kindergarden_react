import {SignalRequest, Store} from "../baseStore";
import {signal} from "@preact/signals-react";
import moment from "moment";

const loading = signal(false);
const sending = signal(false);
const error = signal(null);
const items = signal([]);
const item = signal(false);

const baseStore = new Store("admin", "menu");
const request = new SignalRequest({loading: loading, error: error});

let lastDownloadTime = null;

const loadAll = async (params, debug) => {
    if (lastDownloadTime === null || moment().diff(moment(lastDownloadTime), "minutes") > baseStore.cacheMinutes) {
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

const save = async (params, debug) => {

}

export default {
    items: items,
    item: item,
    loading: loading,
    sending: sending,
    error: error,
    loadAll: loadAll,
    loadByID: loadByID,
    save: save
};