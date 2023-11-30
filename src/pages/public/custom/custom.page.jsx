import React from 'react';
import {Helmet} from "react-helmet";
import {motion} from "framer-motion";
import {useLocation} from "react-router-dom";
import {isObject} from "lodash";
import {computed} from "@preact/signals-react";
import createDOMPurify from "dompurify";

import useCustomPagesStore from "../../../store/public/customPagesStore";

import Construction from "../../../components/public/cunstruction/construction";
import BasicPage from "../../../components/public/basic.page/basic.page.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import VideoGallery from "../../../components/general/video.gallery/video.gallery";
import Button from "../../../components/general/button/button.component";

const CustomPage = ({id}) => {
    const location = useLocation();
    const DOMPurify = createDOMPurify(window);

    const store = useCustomPagesStore();

    const photo = computed(() => {
        return store.item?.page?.files?.filter(item => item.type === "photo") || [];
    })
    const video = computed(() => {
        return store.item?.page?.files?.filter(item => item.type === "video") || [];
    })
    const files = computed(() => {
        return store.item?.page?.files?.filter(item => item.type === "file") || [];
    })

    console.log(store.item);

    React.useEffect(() => {
        if (id) {
            store.loadByID({id});
        }
    }, [location]);

    return (
        <BasicPage>
            <Helmet>
                <title>{store.item?.menu?.title}</title>
            </Helmet>
            {
                (store.item?.page && isObject(store.item?.page) && (store.item?.page?.content || store.item?.page?.files?.length > 0))
                    ?
                    <motion.section
                        className='article'
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{delay: 0.2, duration: 1}}
                    >
                        <h1 className='article__title'>{store?.item?.page?.title}</h1>
                        <div
                            className='article__main-content'
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(store?.item?.page?.content),
                            }}
                        />
                        {
                            photo.value.length > 0
                            &&
                            <ImageGallery extraClass={"article__gallery"} items={photo.value}/>
                        }
                        {
                            video.value.length > 0
                            &&
                            <VideoGallery items={video.value} />
                        }
                        {
                            files.value.length > 0
                            &&
                            <>
                                <ul>
                                    {
                                        files.value.map(file => (
                                            <li key={window.global.makeid(6)}>
                                                <a
                                                   href={file.url.includes("http") ? file.url : process.env.REACT_APP_BASE_URL + file.url}
                                                   target={"_blank"} rel='noreferrer noopener nofollow'>
                                                    {file.title ? file.title : file.url}
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <Button
                                    type='button'
                                    theme={"info_outline"}
                                    style={{alignSelf: "flex-start", marginTop: "1em"}}
                                    text={"Скачать все файлы"}
                                    onClick={() => {

                                    }}
                                />
                            </>
                        }
                    </motion.section>
                    :
                    <Construction/>
            }
        </BasicPage>
    );
};

export default CustomPage;