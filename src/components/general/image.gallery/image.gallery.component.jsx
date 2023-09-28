import React from "react";

import ImagePreview from "../image.preview/image.preview.component";

import "./image.gallery.scss";

const ImageGallery = ({ extraClass, title, orientation = "landsape", items, front = true }) => {
    const [preview, setPreview] = React.useState(<></>);

    const handleOpenPreview = (slideIndex) => {
        setPreview(<ImagePreview open={true} index={slideIndex} items={items} onClose={() => setPreview(<></>)} />);
    };

    if (items && items.length === 1 && (items[0].url === "" || items[0].url === undefined))
        return (
            <>
                <p>Нет фото</p>
            </>
        );

    if (front)
        return (
            <ul className={`image-gallery${extraClass ? ` ${extraClass}` : ``}`}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`image-gallery__item${extraClass ? ` ${extraClass}-item` : ``}`}
                        onClick={() => handleOpenPreview(index)}
                    >
                        <img
                            className={`image-gallery__img${extraClass ? ` ${extraClass}-img` : ``}`}
                            src={
                                item.isFile === 1 && item.isLoaded === 1
                                    ? process.env.REACT_APP_BASE_URL + item.url
                                    : item.url
                            }
                            alt={"Не удалось загрузить изображение"}
                        />
                    </li>
                ))}
                {preview}
            </ul>
        );

    return (
        <>
            {items && items.length > 0 ? (
                <ul className={`admin-image-gallery${extraClass ? ` ${extraClass}` : ``}`}>
                    {items.map((item) =>
                        item.order === 1 ? (
                            <li
                                key={item.url}
                                className={`admin-image-gallery__item${
                                    orientation === "portrait" ? ` admin-image-gallery__item_portrait` : ``
                                }${extraClass ? ` ${extraClass}-item` : ``}`}
                                onClick={() => handleOpenPreview(item.order - 1, items)}
                            >
                                <img
                                    className={`admin-image-gallery__img${extraClass ? ` ${extraClass}-img` : ``}`}
                                    src={
                                        item.url.includes("http") ? item.url : process.env.REACT_APP_BASE_URL + item.url
                                    }
                                    alt='Изображение '
                                />
                                <div
                                    className={`admin-image-gallery__title${extraClass ? ` ${extraClass}-title` : ``}`}
                                >
                                    1. Главная
                                </div>
                            </li>
                        ) : (
                            <li
                                key={item.url}
                                className={`admin-image-gallery__item${
                                    orientation === "portrait" ? ` admin-image-gallery__item_portrait` : ``
                                }${extraClass ? ` ${extraClass}-item` : ``}`}
                                onClick={() => handleOpenPreview(item.order - 1, items)}
                            >
                                <img
                                    className={`admin-image-gallery__img${extraClass ? ` ${extraClass}-img` : ``}`}
                                    src={
                                        item.url.includes("http") ? item.url : process.env.REACT_APP_BASE_URL + item.url
                                    }
                                    alt='Изображение '
                                />
                                {item.order && (
                                    <span
                                        className={`admin-image-gallery__current-position${
                                            extraClass ? ` ${extraClass}-current-position` : ``
                                        }`}
                                    >
                                        {item.order}
                                    </span>
                                )}
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
