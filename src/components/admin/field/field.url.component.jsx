import React, { forwardRef } from "react";

import Button from "../button/button.component";
import FileSelectorPopup from "../file.selector.popup/file.selector.popup";

import "./field.scss";
import FieldInput from "../../general/field/field.input.component";
import Popup from "../../general/popup/popup.component";

const FieldUrl = ({ errorText, extraClass, label = "", placeholder = "", required = false, ...rest }, ref) => {
    const id = window.global.makeid(8);
    const [popup, setPopup] = React.useState(<></>);

    return (
        <div className={`field${errorText ? ` field_state_error` : ``}${extraClass ? ` ${extraClass}` : ``}`}>
            <label className={`field__label${extraClass ? ` ${extraClass}-label` : ``}`} htmlFor={id}>
                {label}
            </label>
            <div className={`field__inner${extraClass ? ` ${extraClass}-inner` : ``}`}>
                <input
                    ref={ref}
                    className={`field__input${extraClass ? ` ${extraClass}-input` : ``}`}
                    id={id}
                    type='url'
                    name='url'
                    placeholder={placeholder}
                    required={required}
                    {...rest}
                />
                <span className={`field__info-text${extraClass ? ` ${extraClass}-info-text` : ``}`}>{errorText}</span>
            </div>
            <Button
                type='button'
                onClick={() => setPopup(<Popup
                    title={"Выбор файла"}
                    opened={true}
                    onClose={() => {
                        setPopup(<></>);
                    }}
                >
                    <FileSelectorPopup />
                </Popup>)}
            >
                Выбрать из файлов
            </Button>
            {popup}
        </div>
    );
};

export default forwardRef(FieldUrl);
