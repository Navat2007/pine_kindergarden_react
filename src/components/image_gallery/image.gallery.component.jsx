import React from "react";

import ImagePreview from "../image_preview/image.preview.component";

import styles from "./image.gallery.module.scss";

const ImageGallery = ({extraClass, title, items, front = true}) => {

    const [preview, setPreview] = React.useState(<></>);

    const handleOpenPreview = (slideIndex) => {
        setPreview(
            <ImagePreview
                open={true}
                index={slideIndex}
                items={items}
                onClose={() => setPreview(<></>)}
            />
        );
    };

    if (items && items.length === 1 && items[0].url === "")
        return <><p>Нет фото</p></>;

    if (front)
        return (
            <>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={[styles.item, extraClass].join(" ")}
                        onClick={() => handleOpenPreview(index)}
                    >
                        <div className={styles.imageBlock}>
                            <img
                                src={
                                    item.isFile === 1 && item.isLoaded === 1
                                        ? process.env.REACT_APP_BASE_URL +
                                        item.url
                                        : item.url
                                }
                                alt={"Не удалось загрузить изображение"}
                            />
                        </div>
                        {title && <p className={styles.title}>{title}</p>}
                    </li>
                ))}
                {preview}
            </>
        );

    return (
        <>
            {items && items.length > 0 ? (
                <ul className="gallery-form">
                    {items.map((item) =>
                        item.order === 1 ? (
                            <li
                                key={item.url}
                                className="gallery-form__item"
                                onClick={() =>
                                    handleOpenPreview(item.order - 1, items)
                                }
                            >
                                <img
                                    className="gallery-form__img"
                                    src={
                                        item.url.includes("http")
                                            ? item.url
                                            : process.env.REACT_APP_BASE_URL +
                                            item.url
                                    }
                                    alt="Изображение "
                                />
                                <div className="gallery-form__title">
                                    1. Главная
                                </div>
                            </li>
                        ) : (
                            <li
                                key={item.url}
                                className="gallery-form__item"
                                onClick={() =>
                                    handleOpenPreview(item.order - 1, items)
                                }
                            >
                                <img
                                    className="gallery-form__img"
                                    src={
                                        item.url.includes("http")
                                            ? item.url
                                            : process.env.REACT_APP_BASE_URL +
                                            item.url
                                    }
                                    alt="Изображение "
                                />
                                {
                                    item.order
                                    &&
                                    <span className="gallery-form__current-position">
                                        {item.order}
                                    </span>
                                }
                            </li>
                        )
                    )}
                </ul>
            ) : (
                <p>Нет фото</p>
            )}
            {preview}
        </>
    );
};

export default ImageGallery;
