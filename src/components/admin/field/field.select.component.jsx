import React, { forwardRef } from "react";

import "./field.scss";

const FieldSelect = (
    {
        errorText,
        extraClass,
        label = "",
        visuallyLabel = true,
        placeholder = "",
        required = false,
        defaultSelectItem = {
            title: "Все",
            value: "Все",
            disabled: false,
        },
        selectItems = [],
        flatOptions = <></>,
        disabled,
        ...rest
    },
    ref
) => {
    const id = window.global.makeid(8);

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
            <div className={`field__inner field__inner_content_select${extraClass ? ` ${extraClass}-inner` : ``}`}>
                <select
                    ref={ref}
                    className={`field__select${extraClass ? ` ${extraClass}-select` : ``}`}
                    required={required}
                    disabled={disabled}
                    {...rest}
                >
                    {defaultSelectItem && (
                        <option defaultValue disabled={defaultSelectItem.disabled} value={defaultSelectItem.value}>
                            {defaultSelectItem.title}
                        </option>
                    )}
                    {selectItems.map((item, index) => (
                        <option key={item.value + "_" + index} value={item.value}>
                            {item.title}
                        </option>
                    ))}
                    {flatOptions}
                </select>
                <span className={`field__info-text${extraClass ? ` ${extraClass}-info-text` : ``}`}>{errorText}</span>
            </div>
        </div>
    );
};

export default forwardRef(FieldSelect);
