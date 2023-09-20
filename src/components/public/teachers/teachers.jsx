import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import "./teachers.scss";

import person_2 from "../../../images/person_2.jpg";
import person_3 from "../../../images/person_3.jpg";
import person_4 from "../../../images/person_4.jpg";

const Teachers = () => {
    return (
        <motion.section
            className='teachers'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
        >
            <h2 className='teachers__title'>Администрация</h2>
            <ul className='teachers__list'>
                <li className='teachers__item'>
                    <NavLink to={"#0"} className='card-link'>
                        <article className='teachers-card'>
                            <img
                                className='teachers-card__image'
                                src=''
                                loading='lazy'
                                alt='Фотография Юлия Викторовна Щетенкова'
                            />
                            <h3 className='teachers-card__title'>Юлия Викторовна Щетенкова</h3>
                            <p className='teachers-card__subtitle'>И.О. Заведующая детского сада</p>
                        </article>
                    </NavLink>
                </li>
            </ul>
            <h2 className='teachers__title'>Специалисты</h2>
            <ul className='teachers__list'>
                <li className='teachers__item'>
                    <NavLink to={"#0"} className='card-link'>
                        <article className='teachers-card'>
                            <img
                                className='teachers-card__image'
                                src={person_2}
                                loading='lazy'
                                alt='Фотография Инга Марковна Шелест'
                            />
                            <h3 className='teachers-card__title'>Инга Марковна Шелест</h3>
                            <p className='teachers-card__subtitle'>Преподаватель по&nbsp;английскому языку</p>
                        </article>
                    </NavLink>
                </li>
                <li className='teachers__item'>
                    <NavLink to={"#0"} className='card-link'>
                        <article className='teachers-card'>
                            <img
                                className='teachers-card__image'
                                src={person_3}
                                loading='lazy'
                                alt='Фотография Игорь Петрович Михалев'
                            />
                            <h3 className='teachers-card__title'>Игорь Петрович Михалев</h3>
                            <p className='teachers-card__subtitle'>Преподаветель по&nbsp;шахматам</p>
                        </article>
                    </NavLink>
                </li>
                <li className='teachers__item'>
                    <NavLink to={"#0"} className='card-link'>
                        <article className='teachers-card'>
                            <img
                                className='teachers-card__image'
                                src={person_4}
                                loading='lazy'
                                alt='Фотография Инна Федоровна Осипова'
                            />
                            <h3 className='teachers-card__title'>Инна Федоровна Осипова</h3>
                            <p className='teachers-card__subtitle'>Логопед</p>
                        </article>
                    </NavLink>
                </li>
            </ul>
        </motion.section>
    );
};

export default Teachers;
