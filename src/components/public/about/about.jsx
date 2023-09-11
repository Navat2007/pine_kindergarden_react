import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { NavLink, useParams } from "react-router-dom";

import useTeachersStore from "../../../store/public/teachersStore";

import "./about.scss";
import about__image from "../../../images/about__image.jpg";
import about__card_1 from "../../../images/about__card_1.jpg";
import about__card_2 from "../../../images/about__card_2.jpg";
import about__card_3 from "../../../images/about__card_3.jpg";
import about__card_4 from "../../../images/about__card_4.jpg";
// import person_1 from "../../../images/person_1.jpg"; Нужно новое фото
import person_2 from "../../../images/person_2.jpg";
import person_3 from "../../../images/person_3.jpg";
import person_4 from "../../../images/person_4.jpg";

const About = () => {
    return (
        <>
            <section className='about about_contain_inner main-section'>
                <h1 className='main-title'>
                    ФГБДОУ &laquo;Центр развития ребенка&nbsp;&mdash; детский сад &laquo;Сосны&raquo;
                </h1>
                <div className='about__column'>
                    <div className='about__text'>
                        <h2 className='about__title'>О нас</h2>
                        <p>
                            Детский сад СОСНЫ <br />
                            расположен вдали от города и шумный дорог, там, где кругом лес и свежий воздух.
                        </p>
                        <br />
                        <p>
                            Мы принимаем детей в группы <br />с 3 лет до прекращения образовательных отношений (7-8 лет)
                        </p>
                    </div>
                    <img
                        className='about__image'
                        src={about__image}
                        alt='Изображение девочки с большим мыльным пузырем'
                    />
                </div>
            </section>
            <section className='about about_bg_light-primary main-section' aria-label='Описание о нас'>
                <div className='about__inner about__inner_bg_half-image'>
                    <div className='about__description'>
                        <p>
                            Именно в детском саду у ребенка вырабатываются первые навыки общения, способствующие его
                            дальнейшей социализации. Уже в два года дети активно идут на контакт как со взрослыми, так
                            и со сверстниками. У малыша могут появиться первые друзья, он учится взаимодействовать
                            с коллективом, находить выход из конфликтных ситуаций.
                        </p>
                        <p>
                            Программа дошкольного учреждения ориентирована на всестороннее развитие личности ребенка.
                            Для этого воспитатели проводят многочисленные занятия различной направленности. Большое
                            внимание уделяется физической культуре, ведь именно от нее зависит здоровье будущего
                            поколения. Ребята делают утреннюю зарядку, посещают спортивные занятия. Детский сад создает
                            благоприятные условия для развития творческих способностей. Малыши занимаются пением,
                            танцами, рисованием, лепкой, изготавливают поделки. Дети средней и старшей группы принимают
                            участие в торжественных утренниках, ставят интересные номера, разыгрывают сценки. Также
                            воспитатели проводят занятия, направленные на воспитание у детей чувства патриотизма, любви
                            к родному краю и т. д.
                        </p>
                    </div>
                </div>
            </section>
            <section className='about about_contain_inner main-section'>
                <h2 className='about__title'>Наши группы</h2>
                <ul className='about__list'>
                    <li className='about__card'>
                        <img
                            className='about__card-image'
                            src={about__card_1}
                            alt='Малыши играют в игрушечную посуду'
                        />
                        <h3 className='about__card-title'>1-ая младшая группа</h3>
                        <p>1,5 - 3 лет.</p>
                    </li>
                    <li className='about__card'>
                        <img
                            className='about__card-image'
                            src={about__card_2}
                            alt='Малыш показывает накрашенный водными красками ручки'
                        />
                        <h3 className='about__card-title'>2-ая младшая группа</h3>
                        <p>3 - 4 лет.</p>
                    </li>
                    <li className='about__card'>
                        <img className='about__card-image' src={about__card_3} alt='Малышка собирает пазлы' />
                        <h3 className='about__card-title'>Средняя группа</h3>
                        <p>4 - 5 лет.</p>
                    </li>
                    <li className='about__card'>
                        <img className='about__card-image' src={about__card_4} alt='Малыш строит домик из кубиков' />
                        <h3 className='about__card-title'>Старшая группа</h3>
                        <p>5 - 6 лет.</p>
                    </li>
                    <li className='about__card'>
                        <img className='about__card-image' src={about__card_3} alt='Малыш строит домик из кубиков' />
                        <h3 className='about__card-title'>Подготовительная группа</h3>
                        <p>6 - до прекращения образовательных отношений (7-8 лет)</p>
                    </li>
                </ul>
            </section>
            <section className='about about_contain_inner main-section'>
                <h2 className='about__title'>Наша команда</h2>
                <Splide
                    className='splide about__slider'
                    options={{
                        type: "loop",
                        rewind: true,
                        pagination: false,
                        arrows: true,
                        arrowPath:
                            "M8.152 35.878a.5.5 0 0 1 .147-.691l22.212-14.438L8.3 6.31a.5.5 0 1 1 .545-.839L31.701 20.33a.5.5 0 0 1 0 .839L8.844 36.025a.5.5 0 0 1-.692-.147Z",
                        autoplay: true,
                        // padding: 15,
                        perPage: 4,
                        perMove: 1,
                        gap: "min(3.25vmax, 1.875em)",
                        breakpoints: {
                            576: {
                                arrows: false,
                                perPage: 1,
                            },
                            768: {
                                perPage: 2,
                            },
                            1024: {
                                perPage: 3,
                            },
                        },
                    }}
                >
                    <SplideSlide data-splide-interval='5000' onClick={() => {}}>
                        <div className='slider-card'>
                            <img className='slider-card__image' src='' alt='Фотография Юлия Викторовна Щетенкова' />
                            <h3 className='slider-card__title'>
                                Юлия Викторовна Щетенкова <br />
                                И.О. Заведующая детского сада
                            </h3>
                        </div>
                    </SplideSlide>
                    <SplideSlide data-splide-interval='5000' onClick={() => {}}>
                        <div className='slider-card'>
                            <img className='slider-card__image' src={person_2} alt='Фотография Инга Марковна Шелест' />
                            <h3 className='slider-card__title'>
                                Инга Марковна Шелест <br />
                                Преподаватель по английскому языку
                            </h3>
                        </div>
                    </SplideSlide>
                    <SplideSlide data-splide-interval='5000' onClick={() => {}}>
                        <div className='slider-card'>
                            <img
                                className='slider-card__image'
                                src={person_3}
                                alt='Фотография Игорь Петрович Михалев'
                            />
                            <h3 className='slider-card__title'>
                                Игорь Петрович Михалев <br />
                                Преподаветель по шахматам
                            </h3>
                        </div>
                    </SplideSlide>
                    <SplideSlide data-splide-interval='5000' onClick={() => {}}>
                        <div className='slider-card'>
                            <img
                                className='slider-card__image'
                                src={person_4}
                                alt='Фотография Инна Федоровна Осипова'
                            />
                            <h3 className='slider-card__title'>
                                Инна Федоровна Осипова <br />
                                Логопед
                            </h3>
                        </div>
                    </SplideSlide>
                </Splide>
            </section>
        </>
    );
};

export default About;
