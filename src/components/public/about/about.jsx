import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import createDOMPurify from "dompurify";

import useAboutStore from "../../../store/public/aboutStore";
import useGroupsStore from "../../../store/public/groupsStore";

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
import logo from "../../../images/logo.svg";
import { NavLink } from "react-router-dom";

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
            <section className='about about_contain_inner main-section'>
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
                        alt='Изображение девочки с большим мыльным пузырем'
                    />
                </div>
            </section>
            <section className='about about_bg_light-primary main-section' aria-label='Описание о нас'>
                <div className='about__inner about__inner_bg_half-image'>
                    <div
                        className='about__description'
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(aboutStore.item.text),
                        }}
                    />
                </div>
            </section>
            <section className='about about_contain_inner main-section'>
                <h2 className='about__title'>Наши группы</h2>
                <ul className='about__list'>
                    {groupsStore.items.map((item, index) => {
                        return (
                            <li key={index}>
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
                                            alt='Изображение группы'
                                        />
                                        <h3 className='about-card__title'>{item.title}</h3>
                                        <p>Текст {item.description}</p>
                                    </article>
                                </NavLink>
                            </li>
                        );
                    })}
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
