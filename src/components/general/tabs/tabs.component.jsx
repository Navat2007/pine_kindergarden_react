import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./tabs.scss";

const Tabs = ({ extraClass, theme, children }) => {
    const [activeTab, setActiveTab] = React.useState(window.localStorage.getItem(`${children?.props?.title}_tab`) ? parseInt(window.localStorage.getItem(`${children?.props?.title}_tab`)) : 0);

    if (!children.length)
        return (
            <div key={children.props.title} className={children.props.extraClass}>
                {children}
            </div>
        );

    return (
        <div className={`admin-tabs${theme ? ` admin-tabs_theme_${theme}` : ``}${extraClass ? ` ${extraClass}` : ``}`}>
            <ul className={`admin-tabs__list${extraClass ? ` ${extraClass}-list` : ``}`}>
                {children.map((child, index) => (
                    <li
                        key={child.props.title}
                        onClick={() => {
                            window.localStorage.setItem(`${children?.props?.title}_tab`, index);
                            setActiveTab(index)
                        }}
                        className={`admin-tabs__item${index === activeTab ? ` admin-tabs__item_active` : ``}${
                            child.props.hidden ? ` --hide` : ``
                        }`}
                    >
                        {child.props.title}
                    </li>
                ))}
            </ul>
            <AnimatePresence mode={"wait"}>
                <motion.div
                    className='admin-tabs__section'
                    key={activeTab}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {children
                        .filter((child, index) => activeTab === index)
                        .map((child) => (
                            <div key={child.props.title} className={child.props.extraClass}>
                                {child.props.children}
                            </div>
                        ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Tabs;
