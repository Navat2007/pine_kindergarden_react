import React from "react";
import { NavLink } from "react-router-dom";
import createDOMPurify from "dompurify";
import {motion, Variants} from "framer-motion";

import useAboutStore from "../../../store/public/aboutStore";
import useGroupsStore from "../../../store/public/groupsStore";

import TeachersSlider from "../teachers-slider/teachers-slider";

import "./about.scss";
import about__image from "../../../images/about__image.jpg";

const About = () => {
    const DOMPurify = createDOMPurify(window);
    const aboutStore = useAboutStore();
    const groupsStore = useGroupsStore();

    const fetchData = async () => {
        await aboutStore.load();
        await groupsStore.loadAll();
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <section className='about about_contain_inner'>
                <h1 className='main-title'>
                    ФГБДОУ &laquo;Центр развития ребенка&nbsp;&mdash; детский сад &laquo;Сосны&raquo;
                </h1>
                <div className='about__column'>
                    <div className='about__text'>
                        <h2 className='about__title'>О нас</h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(aboutStore.item.preview),
                            }}
                        />
                    </div>
                    <img
                        className='about__image'
                        src={about__image}
                        loading="lazy"
                        alt='Изображение девочки с большим мыльным пузырем'
                    />
                </div>
            </section>
            <section className='about about_bg_light-primary' aria-label='Описание о нас'>
                <div className='about__inner about__inner_bg_half-image'>
                    <div
                        className='about__description'
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(aboutStore.item.text),
                        }}
                    />
                </div>
            </section>
            <section className='about about_contain_inner'>
                <h2 className='about__title'>Наши группы</h2>
                <ul className='about__list'>
                    {
                        groupsStore.loading && <h3>Загрузка...</h3>
                    }
                    {
                        groupsStore.loading === false && groupsStore.items.map((item, index) => {
                        const cardVariants: Variants = {
                            offscreen: {
                                y: 300,
                                rotate: window.global.getRandomIntNumber(-30, 30),
                            },
                            onscreen: {
                                y: 0,
                                rotate: 0,
                                transition: {
                                    type: "spring",
                                    bounce: 0.4,
                                    duration: 0.8
                                }
                            }
                        };

                        return (
                            <motion.li
                                key={index}
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{once: true, amount: 0.05}}
                                variants={cardVariants}
                            >
                                <NavLink
                                    className={"card-link"}
                                    to={"/group/" + item.ID}
                                    aria-label={"Главная страница"}
                                >
                                    <article className='about-card'>
                                        <img
                                            className='about-card__image'
                                            src={
                                                item.image.includes("http")
                                                    ? item.image
                                                    : process.env.REACT_APP_BASE_URL + item.image
                                            }
                                            loading="lazy"
                                            alt='Изображение группы'
                                        />
                                        <h3 className='about-card__title'>{item.title}</h3>
                                        <p>{item.preview}</p>
                                    </article>
                                </NavLink>
                            </motion.li>
                        );
                    })}
                </ul>
            </section>
            <section className='about about_contain_inner'>
                <h2 className='about__title'>Наша команда</h2>
                <TeachersSlider />
            </section>
        </>
    );
};

export default About;
