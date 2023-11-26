import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./accordion.module.scss";
import { AdminIcons } from "../../svgs.js";

const Accordion = ({ theme = "text", extraClass, children, title, ...rest }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const config = [styles.accordion, theme ? styles["accordion_theme_" + theme] : null, extraClass];

    const finalClassName = config.filter(Boolean).join(" ");

    return (
        <div className={finalClassName} data-testid='accordion' {...rest}>
            <div
                aria-controls={title}
                aria-expanded={isOpen}
                className={styles.caption}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div>{title}</div>
                <AnimatePresence initial={false} mode='wait'>
                    <motion.div
                        className={styles.icon}
                        key={isOpen ? "minus" : "plus"}
                        initial={{
                            rotate: isOpen ? -90 : 90,
                        }}
                        animate={{
                            rotate: 0,
                            transition: {
                                type: "tween",
                                duration: 0.15,
                                ease: "circOut",
                            },
                        }}
                        exit={{
                            rotate: isOpen ? -90 : 90,
                            transition: {
                                type: "tween",
                                duration: 0.15,
                                ease: "circIn",
                            },
                        }}
                    >
                        {isOpen ? AdminIcons.minus : AdminIcons.plus}
                    </motion.div>
                </AnimatePresence>
            </div>
            <motion.div
                id={title}
                initial={false}
                animate={
                    isOpen
                        ? {
                              height: "auto",
                              opacity: 1,
                              display: "block",
                              paddingBottom: "min(2.75vmax, 1.875em)",
                              transition: {
                                  height: {
                                      duration: 0.4,
                                  },
                                  opacity: {
                                      duration: 0.25,
                                      delay: 0.15,
                                  },
                              },
                          }
                        : {
                              height: 0,
                              opacity: 0,
                              paddingBottom: 0,
                              transition: {
                                  height: {
                                      duration: 0.4,
                                  },
                                  opacity: {
                                      duration: 0.25,
                                  },
                              },
                              transitionEnd: {
                                  display: "none",
                              },
                          }
                }
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Accordion;
