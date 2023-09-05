import {FileIcons} from "./svgs";

class Utils  {
    static getFileIcon = (text) => {
        if(text.includes(".doc"))
            return FileIcons.doc;
        else if(text.includes(".xls"))
            return FileIcons.xls;
        else if(text.includes(".pdf"))
            return FileIcons.pdf;
        else
            return FileIcons.default;
    };

    static makeid = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    };

    static getUrl = (url) => {
        return url.includes("http") ? url : process.env.REACT_APP_BASE_URL + url
    }
}

export default Utils;