import React from "react";
import createDOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import useGroupsStore from "../../../store/public/groupsStore";

import Feedback from "../../../components/public/feedback/feedback";
import BasicPage from "../../../components/public/basic.page/basic.page.component";

const GroupPage = () => {
    let { id } = useParams();
    const DOMPurify = createDOMPurify(window);

    const store = useGroupsStore();

    const fetchData = async () => {
        await store.loadByID({ id });
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    //Private component
    const Article = () => {
        return (
            <>
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
                                    <p className='article__subtitle'>{store.item.preview}</p>
                                    <div
                                        className='article__main-content'
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(store.item.text),
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </motion.section>
                <Feedback />
            </>
        );
    };

    return (
        <BasicPage loadings={[store]}>
            <Article />
        </BasicPage>
    );
};

export default GroupPage;
