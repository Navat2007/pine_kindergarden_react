import React from 'react';

import Button from "./button/button.component";

import {AdminIcons} from "../svgs";

const TitleBlock = ({onBack, title = "", iconName = AdminIcons.back}) => {
    return (
        <div className='app__title-block'>
            <Button
                type='button'
                theme='text'
                isIconBtn
                iconName={iconName}
                aria-label='Назад'
                onClick={() => onBack && onBack()}
            />
            <h1 className='app__title'>{title}</h1>
        </div>
    );
};

export default TitleBlock;