import React from "react";
import { NavLink } from "react-router-dom";
import "./news.scss";

const News = () => {
    return (
        <section className='news'>
            <h2 className='news__title'>Новости</h2>
            <ul className='news__list'>
                <li>
                    <NavLink className={"card-link"} to={"/news/"}>
                        <article className='article-card'>
                            <img
                                className='article-card__image'
                                src='https://ds1387.ru/images/news/2021/06/pushkin-sm.jpg'
                                loading='lazy'
                                alt='Изображение новости'
                            />
                            <time dateTime='2023-06-09' className='article-card__date'>
                                09 июня 2023
                            </time>
                            <h3 className='article-card__title'>Там на неведомых дорожках...</h3>
                            <p className='article-card__description'>
                                6 июня в России отмечается день рождения А.С. Пушкина и в нашем детском саду было
                                уделено много внимания этой замечательной дате.
                            </p>
                            <p className='article-card__button' role='button'>
                                Подробнее
                            </p>
                        </article>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={"card-link"} to={"/news/"}>
                        <article className='article-card'>
                            <img
                                className='article-card__image'
                                src='https://ds1387.ru/images/news/2021/05/olimp-07.jpg'
                                loading='lazy'
                                alt='Изображение новости'
                            />
                            <time dateTime='2023-06-09' className='article-card__date'>
                                09 июня 2023
                            </time>
                            <h3 className='article-card__title'>Быстрее, выше, сильнее! Малые Олимпийские игры</h3>
                            <p className='article-card__description'>
                                Трудно представить себе жизнь малышей в детском саду без веселых досугов и развлечений,
                                шумных игр и соревнований, интересных игр и занимательной деятельности.
                            </p>
                            <p className='article-card__button' role='button'>
                                Подробнее
                            </p>
                        </article>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={"card-link"} to={"/news/"}>
                        <article className='article-card'>
                            <img
                                className='article-card__image'
                                src='https://ds1387.ru/images/news/2021/04/snowdrop-07.jpg'
                                loading='lazy'
                                alt='Изображение новости'
                            />
                            <time dateTime='2023-06-09' className='article-card__date'>
                                09 июня 2023
                            </time>
                            <h3 className='article-card__title'>19 апреля – День подснежника</h3>
                            <p className='article-card__description'>
                                Этот день символизирует наступление тепла и солнечных дней.
                            </p>
                            <p className='article-card__button' role='button'>
                                Подробнее
                            </p>
                        </article>
                    </NavLink>
                </li>
            </ul>
        </section>
    );
};

export default News;
