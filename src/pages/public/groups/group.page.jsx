import React from "react";
import createDOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {Helmet} from "react-helmet";

import useGroupsStore from "../../../store/public/groupsStore";

import BasicPage from "../../../components/public/basic.page/basic.page.component";
import Breadcrumbs from "../../../components/public/breadcrumbs/breadcrumbs";
import TeachersSlider from "../../../components/general/teachers.slider/teachers.slider";

const GroupPage = () => {
    let { id } = useParams();
    const DOMPurify = createDOMPurify(window);

    const store = useGroupsStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
        };

        fetchData();
    }, []);

    return (
        <BasicPage loadings={[store]}>
            <Helmet>
                <title>{store.item.title}</title>
            </Helmet>
            <Breadcrumbs
                items={[
                    {
                        title: "Главная",
                        url: "/",
                    },
                    {
                        title: "Группы",
                        url: "/группы",
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
                {!store.loading && Object.keys(store.item).length > 0 && (
                    <>
                        <div className='article__two-columns'>
                            <img
                                className='article__image'
                                src={
                                    store.item.image.includes("http")
                                        ? store.item.image
                                        : process.env.REACT_APP_BASE_URL + store.item.image
                                }
                                alt='Изображение группы'
                            />
                            <div>
                                <h1 className='article__title'>{store.item.title}</h1>
                                <p className='article__caption'>{store.item.preview}</p>
                                <div
                                    className='article__main-content'
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(store.item.text),
                                    }}
                                />
                            </div>
                        </div>
                        {store.item?.employees?.length > 0 && (
                            <>
                                <h2 className='article__title'>Воспитатели</h2>
                                <TeachersSlider
                                    isBorderGradient={false}
                                    type={"slide"}
                                    items={store.item?.employees}
                                />
                            </>
                        )}
                    </>
                )}
            </motion.section>
        </BasicPage>
    );
};

export default GroupPage;
