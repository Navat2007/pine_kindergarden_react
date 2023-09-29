import React from "react";
import Button from "../button/button.component";
import { AnimatePresence, motion } from "framer-motion";
import { isArray } from "lodash";
import createDOMPurify from "dompurify";

const ShowMore = ({ children }) => {
    const DOMPurify = createDOMPurify(window);

    const [showMore, setShowMore] = React.useState(false);

    const container = {
        hidden: {
            opacity: 0,
            height: 0,
        },
        visible: (i = 1) => ({
            opacity: 1,
            height: "auto",
            transition: {
                height: {
                    duration: 0.25,
                },
                opacity: {
                    duration: 0.25,
                    delay: 0.15,
                },
            },
        }),
    };

    function truncateString(str, num) {
        // If the length of str is less than or equal to num
        // just return str--don't truncate it.
        if (str.length <= num) {
            return str;
        }
        // Return str truncated with '...' concatenated to the end of str.
        return str.slice(0, num) + "...";
    }

    if (!children || children.length === 0) return null;

    if (showMore) {
        return (
            <>
                <motion.div initial='hidden' variants={container} animate='visible'>
                    {children.map((child, index) => (
                        <motion.span
                            key={index}
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                delay: 0.15 * index,
                                duration: 0.35,
                            }}
                        >
                            {child}
                        </motion.span>
                    ))}
                </motion.div>
                <br />
                {isArray(children) && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            delay: 0.35,
                            duration: 1,
                        }}
                    >
                        <Button
                            type='button'
                            className='about__more-btn'
                            onClick={() => {
                                setShowMore(!showMore);
                            }}
                        >
                            Скрыть
                        </Button>
                    </motion.div>
                )}
            </>
        );
    }

    return (
        <div>
            <motion.div initial={false}>
                {isArray(children) ? (
                    <>
                        {children[0].props.children ? (
                            <>{children[0].props.children} ...</>
                        ) : (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(children[0].props.dangerouslySetInnerHTML.__html),
                                }}
                            />
                        )}
                    </>
                ) : (
                    children
                )}
            </motion.div>
            <br />
            {isArray(children) && (
                <Button
                    type='button'
                    className='about__more-btn'
                    onClick={() => {
                        setShowMore(!showMore);
                    }}
                >
                    Читать полностью
                </Button>
            )}
        </div>
    );
};

export default ShowMore;
