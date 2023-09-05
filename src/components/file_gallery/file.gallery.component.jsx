import React from "react";

import ImagePreview from "../image_preview/image.preview.component";
import styles from "./file.selector.module.scss";
import {FileIcons} from "../svgs";

const FileGallery = ({title, items, withDescription}) => {

    const [preview, setPreview] = React.useState(<></>);

    const handleOpenPreview = (slideIndex, file) => {

        if (file.type === "image") {

            const imageItems = items.filter(item => item.type === "image");

            setPreview(<ImagePreview
                open={true}
                index={0}
                items={imageItems}
                onClose={() => setPreview(<></>)}
            />)

        } else {

            const link = document.createElement('a');
            link.href = process.env.REACT_APP_BASE_URL + file.url;
            link.target = "_blank";
            link.setAttribute(
                'download',
                file.title,
            );
            // Append to html link element page
            document.body.appendChild(link);
            // Start download
            link.click();
            // Clean up and remove the link
            link.parentNode.removeChild(link);

        }

    };

    const getThumbsForGallery = (item) => {

        if(item.title.includes(".doc"))
        {
            return (
                <div className={styles.file}>
                    {FileIcons.doc}
                    <p className={styles.fileName}>{item.description ? item.description : (item.file ? item.file.name : item.title)}</p>
                </div>
            );
        }

        if(item.title.includes(".xls"))
        {
            return (
                <div className={styles.file}>
                    {FileIcons.xls}
                    <p className={styles.fileName}>{item.description ? item.description : (item.file ? item.file.name : item.title)}</p>
                </div>
            );
        }

        if(item.title.includes(".pdf"))
        {
            return (
                <div className={styles.file}>
                    {FileIcons.pdf}
                    <p className={styles.fileName}>{item.description ? item.description : (item.file ? item.file.name : item.title)}</p>
                </div>
            );
        }

        if (item.type === "file") {
            return (
                <div className={styles.file}>
                    {FileIcons.default}
                    <p className={styles.fileName}>{item.description ? item.description : item.title}</p>
                </div>

            );
        }

        return (
            <img
                className={styles.image}
                src={
                    item.isFile === 1 && item.isLoaded === 1
                        ? process.env.REACT_APP_BASE_URL + item.url
                        : item.url
                }
                alt={"Изображение " + item.title}
            />
        );
    };

    return (
        <>
            {
                title
                &&
                <h2 className={styles.title}>{title}</h2>
            }
            {items && items.length > 0 ? (
                <ul className="gallery-form">
                    {items.map((item) =>
                        item.order === 1 ? (
                            <li
                                key={item.url}
                                className="gallery-form__item"
                                onClick={() =>
                                    handleOpenPreview(item.order - 1, item)
                                }
                            >
                                {getThumbsForGallery(item)}
                            </li>
                        ) : (
                            <li
                                key={item.url}
                                className="gallery-form__item"
                                onClick={() =>
                                    handleOpenPreview(item.order - 1, item)
                                }
                            >
                                {getThumbsForGallery(item)}
                            </li>
                        )
                    )}
                </ul>
            ) : (
                <p>Нет файлов</p>
            )}
            {preview}
        </>
    );
};

export default FileGallery;
