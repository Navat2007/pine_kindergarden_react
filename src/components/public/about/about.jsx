import React from "react";
import "./about.scss";
import about__image from "../../../images/about__image.jpg";
import about__card_1 from "../../../images/about__card_1.jpg";
import about__card_2 from "../../../images/about__card_2.jpg";
import about__card_3 from "../../../images/about__card_3.jpg";
import about__card_4 from "../../../images/about__card_4.jpg";
import person_1 from "../../../images/person_1.jpg";
import person_2 from "../../../images/person_2.jpg";
import person_3 from "../../../images/person_3.jpg";
import person_4 from "../../../images/person_4.jpg";

const About = () => {
    return (
        <>
            <section className='about about_contain_inner section'>
                <h1 className='title'>
                    Детский сад СОСНЫ <br />
                    Здесь начинается Детство
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
                            Мы принимаем детей в группы <br />с 3 лет до 7 лет
                        </p>
                    </div>
                    <img
                        className='about__image'
                        src={about__image}
                        alt='Изображение девочки с большим мыльным пузырем'
                    />
                </div>
            </section>
            <section className='about about_bg_light-primary section' aria-label='Описание о нас'>
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
            <section className='about about_contain_inner section'>
                <h2 className='about__title'>Наши группы</h2>
                <ul className='about__list'>
                    <li className='about__card'>
                        <img
                            className='about__card-image'
                            src={about__card_1}
                            alt='Малыши играют в игрушечную посуду'
                        />
                        <h3 className='about__card-title'>Младшая группа</h3>
                    </li>
                    <li className='about__card'>
                        <img
                            className='about__card-image'
                            src={about__card_2}
                            alt='Малыш показывает накрашенный водными красками ручки'
                        />
                        <h3 className='about__card-title'>Средняя группа</h3>
                    </li>
                    <li className='about__card'>
                        <img className='about__card-image' src={about__card_3} alt='Малышка собирает пазлы' />
                        <h3 className='about__card-title'>Старшая группа</h3>
                    </li>
                    <li className='about__card'>
                        <img
                            className='about__card-image'
                            src={about__card_4}
                            alt='Малыш строит домик из кубиков'
                        />
                        <h3 className='about__card-title'>Подготовительная группа</h3>
                    </li>
                </ul>
            </section>
            <section className='about about_contain_inner section'>
                <h2 className='about__title'>Наша команда</h2>
                <div className='splide about__slider' id='person-slider'>
                    <div className='splide__track about__slider-track'>
                        <ul className='splide__list'>
                            <li className='splide__slide'>
                                <div className='slider-card'>
                                    <img
                                        className='slider-card__image'
                                        src={person_1}
                                        alt='Фотография Анна Ивановна Иванова'
                                    />
                                    <h3 className='slider-card__title'>
                                        Анна Ивановна Иванова <br />
                                        Заведующая детского сада СОСНЫ
                                    </h3>
                                </div>
                            </li>
                            <li className='splide__slide'>
                                <div className='slider-card'>
                                    <img
                                        className='slider-card__image'
                                        src={person_2}
                                        alt='Фотография Инга Марковна Шелест'
                                    />
                                    <h3 className='slider-card__title'>
                                        Инга Марковна Шелест <br />
                                        Преподаватель по английскому языку
                                    </h3>
                                </div>
                            </li>
                            <li className='splide__slide'>
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
                            </li>
                            <li className='splide__slide'>
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
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
