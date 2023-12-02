import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import moment from "moment";
import createDOMPurify from "dompurify";

import SingleImageWithPreview from "../../general/single.image.with.preview/single.image.with.preview";

import "./news.scss";

const News = ({ children, items, count }) => {
    const DOMPurify = createDOMPurify(window);

    if (items.length > 0) {
        return (
            <motion.section
                className='news'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
            >
                <div className='news__wrap'>
                    <h2 className='news__title'>Новости</h2>
                    <ul className='news__list'>
                        {items.map((item) => {
                            return (
                                <li key={item.ID}>
                                    <NavLink className={"card-link"} to={"/новости/" + item.ID}>
                                        <article className='article-card'>
                                            <SingleImageWithPreview
                                                image={item.preview_image}
                                                extraClass={"article-card__image"}
                                            />
                                            <time dateTime={item.date} className='article-card__date'>
                                                {moment(item.date).format("DD.MM.YYYY")}
                                            </time>
                                            <h3 className='article-card__title'>{item.preview_title}</h3>
                                            <p
                                                className='article-card__description'
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(item.preview_text),
                                                }}
                                            />
                                            <p className='article-card__button' role='button'>
                                                Подробнее
                                            </p>
                                        </article>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                    {children}
                </div>
            </motion.section>
        );
    } else {
        return null;
    }
};

export default News;
