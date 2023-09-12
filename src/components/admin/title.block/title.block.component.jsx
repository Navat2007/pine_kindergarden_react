import React from "react";

import Button from "../button/button.component";
import { AdminIcons } from "../../svgs";
import "./title.block.scss";

const TitleBlock = ({ children, onBack, title = "", iconName = AdminIcons.back }) => {
    return (
        <div className='admin-title-block'>
            {onBack && (
                <Button
                    type='button'
                    theme='text'
                    isIconBtn
                    iconName={iconName}
                    aria-label='Назад'
                    onClick={() => onBack()}
                />
            )}
            <h1 className='admin-title-block__title'>{title}</h1>
            {children}
        </div>
    );
};

export default TitleBlock;
