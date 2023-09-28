import React from "react";
import { Helmet } from "react-helmet";
import {motion} from "framer-motion";

import useDocumentsStore from "../../../store/public/documentsStore";

import BasicPage from "../../../components/public/basic.page/basic.page.component";

import "./documents.scss";
import Image_samo from "../../../images/documents/samo_preview.jpg";
import Docs_samo from "../../../documents/samo.pdf";
import Image_d41 from "../../../images/documents/d41_preview.jpg";
import Docs_d41 from "../../../documents/d41.pdf";
import ImagePreview from "../../../components/general/image.preview/image.preview.component";
import SingleImageWithPreview from "../../../components/general/single_image_with_preview/single.image.with.preview";

const DocumentsPage = () => {
    const store = useDocumentsStore();

    const fetchData = async () => {
        await store.loadAll();
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <BasicPage loadings={[store]}>
            <Helmet>
                <title>Документы</title>
            </Helmet>
            <motion.section
                className='documents'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
            >
                <h2 className='documents__title'>Документы</h2>
                <ul className='documents__list'>
                    {
                        store.items.map((item) => {
                            return (
                                <li key={item.ID} className='documents__item'>
                                    <SingleImageWithPreview image={item.image} extraClass={'documents__item-image'} />
                                    <div className='documents__item-section'>
                                        <h3 className='documents__item-title'>{item.titleShort}</h3>
                                        <div className='documents__item-text'>
                                            <p>{item.title}</p>
                                        </div>
                                        <a className='documents__item-link' href={item.url.includes("http") ? item.url : process.env.REACT_APP_BASE_URL + item.url} target={"_blank"} rel='noopener nofollow noreferer'>
                                            Скачать
                                        </a>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </motion.section>
        </BasicPage>
    );
};

export default DocumentsPage;
