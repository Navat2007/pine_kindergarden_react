import React from 'react';

import {sortingToSave} from "../../../../services/menu";
import {useFirstRender} from "../../../../hook/useFirstRender";

import MenuItem from "./menu.item";
import {isArray} from "lodash";

const MenuList = ({list}) => {
    const isFirstRender = useFirstRender();

    const [sorting, setSorting] = React.useState([]);

    const moveElementInArray = (input, from, to) => {
        let numberOfDeletedElm = 1;

        const elm = input.splice(from, numberOfDeletedElm)[0];

        numberOfDeletedElm = 0;

        input.splice(to, numberOfDeletedElm, elm);
    }

    const handleMoveItem = (elementOrder, toOrder) => {
        let array = [...sorting];

        let currentIndex = array.findIndex((item) => item.sorting === elementOrder);
        let wantIndex = array.findIndex((item) => item.sorting === toOrder);

        array[currentIndex].sorting = toOrder;
        array[wantIndex].sorting = elementOrder;

        moveElementInArray(array, currentIndex, wantIndex);

        setSorting(array);
    };

    React.useEffect(() => {
        setSorting(list);
    }, [list]);

    React.useEffect(() => {
        if(!isFirstRender)
        {
            if(isArray(sorting) && sorting.length > 0)
                sortingToSave.value[sorting[0].parentID] = sorting;
        }
    }, [sorting]);

    return (
        <>
            {
                sorting &&
                sorting.map((item, index) =>
                    <MenuItem
                        key={item.ID}
                        title={item.title}
                        item={item}
                        firstSorting={index === 0}
                        lastSorting={list.length - 1 === index}
                        onUpSorting={(item) => {
                            handleMoveItem(item.sorting, item.sorting - 1);
                        }}
                        onDownSorting={(item) => {
                            handleMoveItem(item.sorting, item.sorting + 1);
                        }}
                    />
                )
            }
        </>
    )
};

export default MenuList;