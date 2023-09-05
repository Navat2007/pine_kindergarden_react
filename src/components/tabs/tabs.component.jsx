import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EventIcons } from "../svgs.js";
import styles from "./tabs.module.scss";

const Tabs = ({ extraClass, theme, children }) => {
    const [activeTab, setActiveTab] = React.useState(0);

    if (!children.length)
        return (
            <section
                key={children.props.title}
                className={children.props.extraClass}
            >
                {children}
            </section>
        );

    return (
        <div
            className={[
                styles.tabs,
                theme && styles["tabs_theme_" + theme],
                extraClass,
            ].join(" ")}
        >
            <ul className={styles.list}>
                {children.map((child, index) => (
                    <li
                        key={child.props.title}
                        onClick={() => setActiveTab(index)}
                        className={
                            styles.item +
                            (index === activeTab
                                ? ` ` + styles.item_actived
                                : "") +
                            (child.props.hidden ? " --hide" : "")
                        }
                    >
                        {child.props.title}

                        {child.props.event && (
                            <span
                                className={styles.eventIcon}
                                aria-label="Благославенная талия"
                                title="Благославенная талия"
                            >
                                {EventIcons[child.props.event]}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    key={activeTab}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {children
                        .filter((child, index) => activeTab === index)
                        .map((child) => (
                            <section
                                key={child.props.title}
                                className={child.props.extraClass}
                            >
                                {child.props.children}
                            </section>
                        ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Tabs;
