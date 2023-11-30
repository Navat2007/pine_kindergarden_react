import React from "react";

import FieldText from "../field/field.text.component";
import Button from "../button/button.component";

import { AdminIcons } from "../../svgs";
import FieldUrl from "../field/field.url.component";
import "./urls-selector.scss";

const UrlsSelector = ({ items, withFiles }) => {
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
                        placeholder='Введите url-адрес...'
                        extraClass={"urls-selector__input"}
                        defaultValue={item.url}
                        withFileSelect={withFiles}
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
                        extraClass={"urls-selector__remove-button"}
                        isIconBtn={true}
                        iconName={AdminIcons.close}
                        aria-label='Удалить поле'
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
