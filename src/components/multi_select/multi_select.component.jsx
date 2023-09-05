import React from "react";
import ReactSelect, {components} from "react-select";
import {Controller} from "react-hook-form";
import makeAnimated from "react-select/animated";
import Tippy from "@tippyjs/react";

import "tippy.js/dist/tippy.css";

const MultiSelect = ({
                         control,
                         name,
                         classNamePrefix = "multy-select",
                         isMulti = false,
                         closeMenuOnSelect = true,
                         hasPreviousValueChanged = false,
                         previousValueChangedTooltip = null,
                         placeholder = "Выберите или введите для поиска...",
                         values = [],
                         options = [],
                         ...rest
                     }) => {
    const animatedComponents = makeAnimated();

    const NoOptionsMessage = ({children, ...rest}) => {
        return (
            <>
                <components.NoOptionsMessage children={"Нет опций для отображения"} {...rest} />
            </>
        );
    };

    return (
        <>
            <Tippy
                content={previousValueChangedTooltip}
                disabled={!hasPreviousValueChanged || previousValueChangedTooltip === null}
            >
                <div tabIndex='0' className={hasPreviousValueChanged ? "multy-select-is-changed" : ""} {...rest}>
                    <Controller
                        control={control}
                        name={name}
                        defaultValue={values}
                        render={({field}) => {
                            return (
                                <ReactSelect
                                    classNamePrefix={classNamePrefix}
                                    {...field}
                                    isMulti={isMulti}
                                    placeholder={placeholder}
                                    closeMenuOnSelect={closeMenuOnSelect}
                                    components={{animatedComponents, NoOptionsMessage}}
                                    options={options}
                                    {...rest}
                                />
                            );
                        }}
                    />
                </div>
            </Tippy>
        </>
    );
};

export default MultiSelect;
