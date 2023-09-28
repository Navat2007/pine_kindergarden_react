import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { NavLink } from "react-router-dom";

import SingleImageWithPreview from "../../general/single.image.with.preview/single.image.with.preview";

import "./teachers.slider.scss";

const TeachersSlider = ({categories = []}) => {
    if(categories.length > 0)
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
                {categories.map((category) => {
                    return category.persons.map((person) => {
                        return (
                            <SplideSlide key={person.ID} data-splide-interval='5000'>
                                <NavLink className={"card-link"} to={"/teachers/" + person.ID}>
                                    <article className='person-card'>
                                        <SingleImageWithPreview image={person.photo} extraClass={'person-card__image'} noPhoto={""} />
                                        <h3 className='person-card__title'>{person.fio}</h3>
                                        <p className='teachers-card__subtitle'>{person.position}</p>
                                    </article>
                                </NavLink>
                            </SplideSlide>
                        )
                    })
                })}
            </Splide>
        );
    else
        return null;
};

export default TeachersSlider;
