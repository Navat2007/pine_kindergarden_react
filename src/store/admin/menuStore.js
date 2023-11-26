import {SignalRequest, Store} from "../baseStore";
import {signal} from "@preact/signals-react";
import moment from "moment";

const loading = signal(false);
const error = signal(null);
const items = signal([]);

const baseStore = new Store("admin", "menu");
const request = new SignalRequest({loading: loading, error: error});

let lastDownloadTime = null;

const loadAll = async (params, debug) => {
    if(lastDownloadTime === null || moment().diff(moment(lastDownloadTime), "minutes") > baseStore.cacheMinutes)
    {
        const response = await request.sendPostForm(baseStore.urlLoadAll, params);

        if(debug)
            console.log(response);

        if(response != null && response.params){
            items.value = response.params;
            lastDownloadTime = moment();
        }
        else {
            items.value = [];
            lastDownloadTime = null;
        }
    }
}

export default {items: items, loading: loading, error: error, loadAll: loadAll};