import Api from "./Api";
import {menuStore} from "../store/public/menuStore";

export const getMenuList = async () => {
    try {
        menuStore.value = await Api.post('public/menu/load.php')
    } catch (error) {
        console.error(error)
    }
}