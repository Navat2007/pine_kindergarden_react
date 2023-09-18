import React from 'react';
import createDOMPurify from "dompurify";
import {useParams} from "react-router-dom";

import useGroupsStore from "../../store/public/groupsStore";

const GroupPage = () => {
    let {id} = useParams();
    const DOMPurify = createDOMPurify(window);
    const store = useGroupsStore();

    const fetchData = async () => {
        await store.loadByID({id});
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <img
                className='about__card-image'
                src={store.item.image.includes("http") ? store.item.image : process.env.REACT_APP_BASE_URL + store.item.image}
                alt='Изображение группы'
            />
            <h1>{store.item.title}</h1>
            <div
                 dangerouslySetInnerHTML={{
                     __html: DOMPurify.sanitize(store.item.text),
                 }}
            />
        </div>
    );
};

export default GroupPage;