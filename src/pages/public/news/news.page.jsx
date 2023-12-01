import React from "react";
import { useParams } from "react-router-dom";
import createDOMPurify from "dompurify";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import moment from "moment";

import useNewsStore from "../../../store/public/newsStore";

import Breadcrumbs from "../../../components/public/breadcrumbs/breadcrumbs";
import BasicPage from "../../../components/public/basic.page/basic.page.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import SingleImageWithPreview from "../../../components/general/single.image.with.preview/single.image.with.preview";

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
                        url: "/новости/",
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
                <h1 className='article__title'>{store?.item?.title}</h1>
                <time dateTime={store?.item?.date} className='article__caption'>
                    {moment(store?.item?.date).format("DD.MM.YYYY")}
                </time>
                {
                    store?.item?.image && (
                        <SingleImageWithPreview image={store.item.image} extraClass={"article__image article__gap"} />
                    )
                }
                <div
                    className='article__main-content'
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(store?.item?.text),
                    }}
                />
                {store?.item?.images?.length > 0 && (
                    <ImageGallery extraClass={"article__gallery"} items={store.item.images} />
                )}
            </motion.section>
        </BasicPage>
    );
};

export default NewsPage;
