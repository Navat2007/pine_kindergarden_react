import {lazy} from "react";

export function lazyLoad(path, namedExport) {
    console.log(path);
    return lazy(() => {
        const promise = import(path);

        console.log(promise);

        if(namedExport)
            return promise.then(module => ({default: module[namedExport]}));
        else
            return promise;
    });
}