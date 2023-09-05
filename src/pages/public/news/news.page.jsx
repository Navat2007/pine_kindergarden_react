import React from "react";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import {motion} from "framer-motion";
import {useParams} from "react-router-dom";
import moment from "moment";
import createDOMPurify from "dompurify";

import useNewsStore from "../../../store/public/newsStore";

import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs.component";
import ImagePreview from "../../../components/image_preview/image.preview.component";

import styles from "./news.module.scss";
import previewStyle from "./../../../components/image_preview/image.preview.module.scss";
import commonStyles from "../common.module.scss";
import Utils from "../../../components/utils.component";

const NewsPage = () => {
    const {id} = useParams();
    const DOMPurify = createDOMPurify(window);

    const newsStore = useNewsStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await newsStore.loadNews({id});
        };

        fetchData();
    }, [id]);

    //Private component
    const Loading = () => {
        return (
            <>
                {newsStore.loading && (
                    <section className={`${commonStyles.wrap} ${commonStyles.wrap_shadow}`}>
                        <h2 className={commonStyles.title}>загрузка...</h2>
                    </section>
                )}
            </>
        );
    };

    const NotFound = () => {
        return (
            <>
                {!newsStore.loading && Object.keys(newsStore.news).length === 0 && (
                    <section className={`${commonStyles.wrap} ${commonStyles.wrap_shadow}`}>
                        <h2 className={commonStyles.title}>Новость не найдена...</h2>
                    </section>
                )}
            </>
        );
    };

    const MainBlock = () => {

        const [preview, setPreview] = React.useState(<></>);

        const handleImagePreview = (images, index) => {
            setPreview(<ImagePreview open={true} index={index} items={images} onClose={() => setPreview(<></>)}/>);
        };

        return (
            <>
                {!newsStore.loading && Object.keys(newsStore.news).length > 0 && (
                    <section className={`${commonStyles.wrap} ${commonStyles.wrap_shadow}`}>
                        <p className={styles.date}>{moment(newsStore.news.date).format("DD MMMM YYYY HH:mm")}</p>
                        <h3 className={styles.title}>{newsStore.news.title}</h3>
                        {newsStore.news.image && (
                            <img
                                className={styles.image}
                                src={Utils.getUrl(newsStore.news.image)}
                                alt={newsStore.news.image}
                                onClick={() => {
                                    console.log("click");
                                    const config = [previewStyle.container, previewStyle.container_opened];

                                    const finalClassName = config.filter(Boolean).join(" ");
                                    setPreview(<div className={finalClassName}>
                                        <span
                                            className={`${previewStyle.close} mdi mdi-close`}
                                            aria-label="Закрыть"
                                            title="Закрыть"
                                            onClick={() => setPreview(<></>)}
                                        />
                                        <div className={previewStyle.wrap}>
                                            <img
                                                className={previewStyle.image}
                                                src={Utils.getUrl(newsStore.news.image)}
                                                alt={newsStore.news.image}
                                            />
                                        </div>
                                    </div>);
                                }}
                            />
                        )}
                        <div
                            className={styles.description}
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(newsStore.news.text),
                            }}
                        />
                        {/*<h4 className={styles.subtitle}>Смотрите как это было в нашем фотоотчете!</h4>*/}
                        {newsStore.news.images.length > 0 && (
                            <Splide
                                className='my-splide my-splide_border-radius-sm'
                                options={{
                                    type: "loop",
                                    // cover: true,
                                    arrows: false,
                                    perPage: 1,
                                    perMove: 1,
                                    gap: "1.5em",
                                    rewind: true,
                                    autoplay: true,
                                    pauseOnHover: true,
                                    // heightRatio: 0.5625,
                                }}
                            >
                                {newsStore.news.images.map((item, index) => (
                                    <SplideSlide data-splide-interval='3000' key={index}>
                                        <img
                                            onClick={() => handleImagePreview(newsStore.news.images, index)}
                                            className={styles.sliderImage}
                                            src={
                                                item.url.includes("http")
                                                    ? item.url
                                                    : process.env.REACT_APP_BASE_URL + item.url
                                            }
                                            alt={item.url}
                                        />
                                    </SplideSlide>
                                ))}
                            </Splide>
                        )}
                    </section>
                )}
                {preview}
            </>
        );
    };

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <Breadcrumbs
                items={[
                    {
                        title: "Главная",
                        url: "/",
                    },
                    {
                        title: "Новости",
                        url: "/news",
                    },
                    {
                        title: newsStore?.news?.preview_title ? newsStore?.news?.preview_title : "Новость №" + id,
                        url: "",
                    },
                ]}
            />
            <Loading/>
            <MainBlock/>
            <NotFound/>
        </motion.div>
    );
};

export default NewsPage;
