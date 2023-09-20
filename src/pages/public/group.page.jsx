import React from "react";
import createDOMPurify from "dompurify";
import { useParams } from "react-router-dom";

import useGroupsStore from "../../store/public/groupsStore";

import Feedback from "../../components/public/feedback/feedback";

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
    const Loading = () => {
        return (
            <>
                {store.loading && (
                    <section className='article'>
                        <h2 className='main-title'>Загрузка...</h2>
                    </section>
                )}
            </>
        );
    };

    const NotFound = () => {
        return (
            <>
                {!store.loading && Object.keys(store.item).length === 0 && (
                    <section className='article'>
                        <h2 className='main-title'>Группа не найдена...</h2>
                    </section>
                )}
            </>
        );
    };

    const MainBlock = () => {
        return (
            <>
                <section className='article'>
                    {!store.loading && Object.keys(store.item).length > 0 && (
                        <>
                            <div className='article__columns'>
                                <div className='article__column'>
                                    <img
                                        className='article__image'
                                        src={
                                            store.item.image.includes("http")
                                                ? store.item.image
                                                : process.env.REACT_APP_BASE_URL + store.item.image
                                        }
                                        alt='Изображение группы'
                                    />
                                </div>
                                <div className='article__column'>
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
                </section>
                <Feedback />
            </>
        );
    };

    return (
        <>
            <Loading />
            <MainBlock />
            <NotFound />
        </>
    );
};

export default GroupPage;
