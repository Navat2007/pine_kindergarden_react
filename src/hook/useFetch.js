import {useEffect, useState} from "react";

export function useFetch(url, initialParams = {}) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [params, setParams] = useState(initialParams)
    const [error, setError] = useState();
    const user = window.localStorage.getItem('user');

    useEffect(() => {

        const controller = new AbortController();
        setLoading(true);

        let form = new FormData();
        window.global.buildFormData(form, params);

        fetch(url, {
            signal: controller.signal,
            headers: {
                Authorization: `${JSON.parse(user).token}&${JSON.parse(user).ID}`
            },
            method: 'POST',
            body: form
        })
            .then(response => response.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));

        return () => {
            controller.abort();
        }

    }, [url, params]);

    return {loading, data, error, setParams}

}