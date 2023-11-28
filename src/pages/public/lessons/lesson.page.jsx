import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion, Variants } from "framer-motion";
import createDOMPurify from "dompurify";

import useLessonsStore from "../../../store/public/lessonsStore";

import BasicPage from "../../../components/public/basic.page/basic.page.component";

import "./lessons.scss";
import Breadcrumbs from "../../../components/public/breadcrumbs/breadcrumbs";

const LessonPage = () => {
    let { id } = useParams();
    const DOMPurify = createDOMPurify(window);

    const store = useLessonsStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
        };

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
                        title: "Занятия",
                        url: "/платные-услуги/",
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

export default LessonPage;
