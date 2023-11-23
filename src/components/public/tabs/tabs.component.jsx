import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./tabs.scss";

const Tabs = ({ children, extraClass, theme, place = window.global.makeid(6) }) => {
    const [activeTab, setActiveTab] = React.useState(place && window.localStorage.getItem(`${place}_tab`) ? parseInt(window.localStorage.getItem(`${place}_tab`)) : 0);

    if (!children.length)
        return (
            <div key={children?.props?.title} className={children?.props?.extraClass}>
                {children}
            </div>
        );

    return (
        <div className={`tabs${theme ? ` tabs_theme_${theme}` : ``}${extraClass ? ` ${extraClass}` : ``}`}>
            <ul className={`tabs__list${extraClass ? ` ${extraClass}-list` : ``}`}>
                {children.map((child, index) => {
                    if(child)
                    {
                        return (
                            <li
                                key={child?.props?.title}
                                onClick={() => {
                                    if(place)
                                    {
                                        window.localStorage.setItem(`${place}_tab`, index);
                                    }

                                    setActiveTab(index);
                                }}
                                className={`tabs__item${index === activeTab ? ` tabs__item_active` : ``}${
                                    child?.props?.hidden ? ` --hide` : ``
                                }`}
                            >
                                {child?.props?.title}
                            </li>
                        )
                    }
                })}
            </ul>
            <AnimatePresence mode={"wait"}>
                <motion.div
                    className='tabs__section'
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {children
                        .filter((child, index) => activeTab === index)
                        .map((child) => (
                            <div key={child.props?.title} className={child.props?.extraClass}>
                                {child.props?.children}
                            </div>
                        ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Tabs;
