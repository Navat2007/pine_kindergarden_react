import React, { forwardRef } from "react";

import { PopUpContext } from "../../../context";

import Button from "../button/button.component";
import FileSelectorPopup from "../file.selector.popup/file.selector.popup";
import Popup from "../../general/popup/popup.component";

import "./field.scss";
import { AdminIcons } from "../../svgs";

const FieldUrl = (
    {
        errorText,
        extraClass,
        label = "",
        visuallyLabel = true,
        placeholder = "https://...",
        required = false,
        withFileSelect,
        onFileSelected = () => {},
        ...rest
    },
    ref
) => {
    const id = window.global.makeid(8);

    const { setPopup } = React.useContext(PopUpContext);

    return (
        <div className={`field${errorText ? ` field_state_error` : ``}${extraClass ? ` ${extraClass}` : ``}`}>
            <label
                className={`field__label${extraClass ? ` ${extraClass}-label` : ``}${
                    !visuallyLabel ? ` visually-hidden` : ``
                }`}
                htmlFor={id}
            >
                {label}
            </label>
            <div
                className={`field__inner field__inner_content_url-image-search${
                    extraClass ? ` ${extraClass}-inner` : ``
                }`}
            >
                <input
                    ref={ref}
                    className={`field__input${extraClass ? ` ${extraClass}-input` : ``}`}
                    id={id}
                    type='text'
                    name='url'
                    placeholder={placeholder}
                    required={required}
                    {...rest}
                />
                <span className={`field__info-text${extraClass ? ` ${extraClass}-info-text` : ``}`}>{errorText}</span>
                {withFileSelect && (
                    <Button
                        type='button'
                        extraClass={"field__icon-image-search"}
                        title='Выбрать из структуры'
                        aria-label='Выбрать из структуры'
                        iconName={AdminIcons.image_search}
                        isIconBtn={true}
                        onClick={() =>
                            setPopup(
                                <Popup
                                    title={"Выбор файла"}
                                    opened={true}
                                    onClose={() => {
                                        setPopup(<></>);
                                    }}
                                >
                                    <FileSelectorPopup
                                        onFileSelected={onFileSelected}
                                        onClose={() => {
                                            setPopup(<></>);
                                        }}
                                        {...rest}
                                    />
                                </Popup>
                            )
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default forwardRef(FieldUrl);
