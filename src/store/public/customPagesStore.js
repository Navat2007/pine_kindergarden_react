import {Store} from "../baseStore";

const baseStore = new Store("public", "customPages");

export const loadAllFiles = async (params) => {

    let form = new FormData();
    window.global.buildFormData(form, params);

    fetch(baseStore.baseUrl + "loadAllFiles.php", {
        method: 'POST',
        body: form
    })
        .then(response => {
            if(response.ok){
                return response.blob();
            }
        })
        .then( blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');

            a.href = url;
            a.download = "Файлы со страницы " + params.title + ".zip";
            document.body.appendChild(a);
            a.click();
            a.remove();
        });

};

const useCustomPagesStore = baseStore.createStore();

export default useCustomPagesStore;