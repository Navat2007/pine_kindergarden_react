import React from 'react';
import {useParams} from "react-router-dom";
import createDOMPurify from "dompurify";

import useNewsStore from "../../../store/public/newsStore";
import {Helmet} from "react-helmet";
import Breadcrumbs from "../../../components/public/breadcrumbs/breadcrumbs";
import {motion} from "framer-motion";
import BasicPage from "../../../components/public/basic.page/basic.page.component";

const NewsPage = () => {
    let { id } = useParams();
    const DOMPurify = createDOMPurify(window);

    const store = useNewsStore();

    const fetchData = async () => {
        await store.loadByID({ id });
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    console.log(store.item);

    return (
        <BasicPage loadings={[store]}>
            <Helmet>
                <title>Занятия - {store.item.title}</title>
            </Helmet>
            <Breadcrumbs
                items={[
                    {
                        title: "Главная",
                        url: "/",
                    },
                    {
                        title: "Новости",
                        url: "/news/",
                    },
                    {
                        title: store.item.title,
                        url: "",
                    },
                ]}
            />
            <motion.section
                className='article'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
            >
                <div className='article__two-columns'>
                    <img
                        className='article__image'
                        src={
                            store?.item?.image?.includes("http")
                                ? store?.item?.image
                                : process.env.REACT_APP_BASE_URL + store?.item?.image
                        }
                        alt='Изображение занятия'
                    />
                    <div>
                        <h1 className='article__title'>{store?.item?.title}</h1>
                        <div
                            className='article__main-content'
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(store?.item?.text),
                            }}
                        />
                    </div>
                </div>
            </motion.section>
        </BasicPage>
    );
};

export default NewsPage;