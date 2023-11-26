import React from 'react';
import MenuItem from "./menu.item";

const MenuList = ({list}) => {
    return (
        <>
            {
                list &&
                list.map((item, index) =>
                    <MenuItem
                        key={item.ID}
                        title={item.title}
                        item={item}
                        firstSorting={index === 0}
                        lastSorting={list.length - 1 === index}
                    />
                )
            }
        </>
    )
};

export default React.memo(MenuList);