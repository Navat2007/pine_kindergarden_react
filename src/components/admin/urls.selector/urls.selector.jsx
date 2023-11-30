import React from 'react';

import FieldText from "../field/field.text.component";
import Button from "../button/button.component";

import {AdminIcons} from "../../svgs";
import FieldUrl from "../field/field.url.component";

const UrlsSelector = ({items}) => {
    const handleVideoLink = () => {
        items.value = [...items.value, { id: window.global.makeid(12), url: "" }];
    };

    return (
        <>
            {items.value.map((item) => (
                <div className='form__group-block' key={item.id}>
                    <FieldUrl
                        placeholder='Введите url-адрес...'
                        defaultValue={item.url}
                        onBlur={(event) => {
                            items.value =
                                items.value.map((link) => {
                                    if (link.id === item.id) {
                                        link.url = event.target.value;
                                    }

                                    return link;
                                });
                        }}
                    />
                    {item.url && (
                        <a
                            href={item.url.includes("http") ? item.url : "https://" + item.url}
                            aria-label='Открыть в новой вкладке'
                            title='Открыть в новой вкладке'
                            target={"_blank"}
                            rel='nofollow noreferrer noopener'
                        >
                            <Button
                                type='button'
                                iconName={AdminIcons.expand}
                            />
                        </a>
                    )}
                    <Button
                        type='button'
                        iconName={AdminIcons.minus}
                        aria-label='Удалить поле'
                        onClick={() => {
                            items.value = items.value.filter((link) => link.id !== item.id);
                        }}
                    />
                </div>
            ))}
            <Button
                type='button'
                iconName={AdminIcons.plus}
                aria-label='Добавить поле'
                onClick={handleVideoLink}
            />
        </>
    );
};

export default UrlsSelector;