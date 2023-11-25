import Api from "./Api";
import {menuStore} from "../store/public/menuStore";

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