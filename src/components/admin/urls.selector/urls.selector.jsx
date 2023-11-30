import React from "react";

import Button from "../button/button.component";
import FieldUrl from "../field/field.url.component";

import { AdminIcons } from "../../svgs";
import "./urls-selector.scss";

const UrlsSelector = ({ items, withFiles, accept = "*.*" }) => {
    const handleVideoLink = () => {
        items.value = [...items.value, { id: window.global.makeid(12), url: "" }];
    };

    return (
        <>
            {items.value.map((item) => (
                <div className='urls-selector' key={item.id}>
                    <FieldUrl
                        label='Ссылка на видео'
                        visuallyLabel={false}
                        extraClass={"urls-selector__input"}
                        defaultValue={item.url}
                        withFileSelect={withFiles}
                        accept={accept}
                        onFileSelected={(file) => {
                            items.value = items.value.map((link) => {
                                if (link.id === item.id) {
                                    link.url = process.env.REACT_APP_BASE_URL + file.url;
                                    link.title = file.file_name;
                                }

                                return link;
                            });
                        }}
                        onBlur={(event) => {
                            items.value = items.value.map((link) => {
                                if (link.id === item.id) {
                                    link.url = event.target.value;
                                }

                                return link;
                            });
                        }}
                    />
                    {item.url && (
                        <a
                            className='urls-selector__share-link'
                            href={item.url.includes("http") ? item.url : "https://" + item.url}
                            aria-label='Открыть в новой вкладке'
                            title='Открыть в новой вкладке'
                            target={"_blank"}
                            rel='nofollow noreferrer noopener'
                        >
                            {AdminIcons.open_in_new}
                        </a>
                    )}
                    <Button
                        type='button'
                        theme={"text-error"}
                        extraClass={"urls-selector__delete-button"}
                        isIconBtn={true}
                        iconName={AdminIcons.close}
                        aria-label='Удалить поле'
                        title='Удалить поле'
                        onClick={() => {
                            items.value = items.value.filter((link) => link.id !== item.id);
                        }}
                    />
                </div>
            ))}
            <Button type='button' extraClass={"admin-form__button"} onClick={handleVideoLink}>
                Добавить
            </Button>
        </>
    );
};

export default UrlsSelector;