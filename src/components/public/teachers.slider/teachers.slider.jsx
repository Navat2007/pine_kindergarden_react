import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { NavLink } from "react-router-dom";

import "./teachers.slider.scss";
import person_2 from "../../../images/person_2.jpg";
import person_3 from "../../../images/person_3.jpg";
import person_4 from "../../../images/person_4.jpg";

const TeachersSlider = () => {
    return (
        <Splide
            className='splide teachers-slider'
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
            <SplideSlide data-splide-interval='5000'>
                <NavLink className={"card-link"} to={"/teachers/"}>
                    <article className='person-card'>
                        <img
                            className='person-card__image'
                            loding='lazy'
                            src=''
                            alt='Фотография Юлия Викторовна Щетенкова'
                        />
                        <h3 className='person-card__title'>
                            Юлия Викторовна Щетенкова <br />
                            И.О. Заведующая детского сада
                        </h3>
                    </article>
                </NavLink>
            </SplideSlide>
            <SplideSlide data-splide-interval='5000'>
                <NavLink className={"card-link"} to={"/teachers/"}>
                    <article className='person-card'>
                        <img
                            className='person-card__image'
                            loding='lazy'
                            src={person_2}
                            alt='Фотография Инга Марковна Шелест'
                        />
                        <h3 className='person-card__title'>
                            Инга Марковна Шелест <br />
                            Преподаватель по английскому языку
                        </h3>
                    </article>
                </NavLink>
            </SplideSlide>
            <SplideSlide data-splide-interval='5000'>
                <NavLink className={"card-link"} to={"/teachers/"}>
                    <article className='person-card'>
                        <img
                            className='person-card__image'
                            loding='lazy'
                            src={person_3}
                            alt='Фотография Игорь Петрович Михалев'
                        />
                        <h3 className='person-card__title'>
                            Игорь Петрович Михалев <br />
                            Преподаветель по шахматам
                        </h3>
                    </article>
                </NavLink>
            </SplideSlide>
            <SplideSlide data-splide-interval='5000'>
                <NavLink className={"card-link"} to={"/teachers/"}>
                    <article className='person-card'>
                        <img
                            className='person-card__image'
                            loding='lazy'
                            src={person_4}
                            alt='Фотография Инна Федоровна Осипова'
                        />
                        <h3 className='person-card__title'>
                            Инна Федоровна Осипова <br />
                            Логопед
                        </h3>
                    </article>
                </NavLink>
            </SplideSlide>
        </Splide>
    );
};

export default TeachersSlider;
