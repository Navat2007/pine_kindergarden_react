import React from 'react';
import {AnimatePresence, motion} from "framer-motion";

import Button from "../button/button.component";

import {AdminIcons} from "../../svgs";

const ContextMenu = ({items, onItemClick}) => {
    const [opened, setOpened] = React.useState(false);
    const [activeItem, setActiveItem] = React.useState(0);

    const variants = {
        open: {
            opacity: 1,
            y: 0,
        },
        closed: {
            opacity: 0,
            y: -10,
        },
    };

    return (
        <nav className='admin-context-menu'>
            <Button
                type='button'
                isIconBtn={true}
                extraClass={"admin-context-menu__menu-button"}
                iconName={AdminIcons.view_list}
                onClick={() => setOpened(!opened)}
            />
            <motion.div animate={opened ? "open" : "closed"} variants={variants}>
                <AnimatePresence>
                    {opened && (
                        <motion.div
                            className={`search-filter__filed-columns`}
                            initial={{
                                height: 0,
                                opacity: 0,
                                y: -20,
                            }}
                            animate={{
                                height: "auto",
                                opacity: 1,
                                y: 0,
                                transition: {
                                    height: {
                                        duration: 0.25,
                                    },
                                    opacity: {
                                        duration: 0.25,
                                        delay: 0.15,
                                    },
                                },
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                y: -20,
                                transition: {
                                    height: {
                                        duration: 0.25,
                                    },
                                    opacity: {
                                        duration: 0.15,
                                    },
                                },
                            }}
                        >
                            <div className='admin-context-menu__wrapper'>
                                <p className='admin-context-menu__title'>Вид</p>
                                <ul className='admin-context-menu__list'>
                                    {items.map((item, index) => (
                                        <li
                                            key={item.title}
                                            className='admin-context-menu__item admin-context-menu__item_active'
                                            onClick={() => {
                                                setActiveItem(index);
                                                onItemClick(index);
                                                setOpened(!opened);
                                            }}
                                        >
                                            <p className={`admin-context-menu-item${index === activeItem ? ` admin-context-menu-item_active` : ``}`}>
                                            <span className='admin-context-menu-item__label'>
                                                {item.icon}
                                                {item.title}
                                            </span>
                                                <span className='admin-context-menu-item__icon'>{AdminIcons.check}</span>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

        </nav>
    );
};

export default ContextMenu;