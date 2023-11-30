import Api from "./Api";
import {menuStore} from "../store/public/menuStore";
import {signal} from "@preact/signals-react";

export const sortingToSave = signal([]);

export const getMenuList = async () => {
    try {
        const response = await Api.post('public/menu/load.php');
        menuStore.value = {
            sorted: response.params.sorted,
            all: response.params.all
        };
    } catch (error) {
        console.error(error)
    }
}