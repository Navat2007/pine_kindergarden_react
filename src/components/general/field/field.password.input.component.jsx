import React, { forwardRef } from "react";
import styles from "./field.module.scss";

const FieldPasswordInput = ({ref, required = false, disabled = false, placeholder = "", ...rest}) => {

    const inputRef = React.useRef();
    const [eyeActive, setEyeActive] = React.useState(false);

    const toggleEye = (e) => {
        setEyeActive(!eyeActive);
    };

    const mergeRefs = (...refs) => {
        const filteredRefs = refs.filter(Boolean);
        if (!filteredRefs.length) return null;
        if (filteredRefs.length === 0) return filteredRefs[0];
        return (inst) => {
            for (const ref of filteredRefs) {
                if (typeof ref === "function") {
                    ref(inst);
                } else if (ref) {
                    ref.current = inst;
                }
            }
        };
    };

    return (
        <input
            ref={mergeRefs(inputRef, ref)}
            type={eyeActive ? "text" : "password"}
            className={styles.input}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            {...rest}
        />
    );
};

export default forwardRef(FieldPasswordInput);