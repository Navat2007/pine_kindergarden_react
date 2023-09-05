import React from 'react';
import Tippy from "@tippyjs/react";

const Tooltip = ({
                     children,
                     hasPreviousValueChanged = false,
                     previousValueChangedTooltip = null,
                 }) => {
    return (
        <Tippy
            content={previousValueChangedTooltip}
            disabled={!hasPreviousValueChanged || previousValueChangedTooltip === null}
        >
            {children}
        </Tippy>
    );
};

export default Tooltip;