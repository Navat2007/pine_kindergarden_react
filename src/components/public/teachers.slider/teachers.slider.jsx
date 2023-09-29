import React from "react";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import {NavLink} from "react-router-dom";

import SingleImageWithPreview from "../../general/single.image.with.preview/single.image.with.preview";

import "./teachers.slider.scss";

const TeachersSlider = ({type = "loop", categories = [], items = []}) => {

    const Slide = ({person}) => {
        return (
            <SplideSlide key={person.ID} data-splide-interval='5000'>
                <NavLink className={"card-link"} to={"/teachers/" + person.ID}>
                    <article className='person-card'>
                        <SingleImageWithPreview image={person.photo} extraClass={'person-card__image'}
                                                noPhoto={""}/>
                        <h3 className='person-card__title'>{person.fio}</h3>
                        <p className='teachers-card__subtitle'>{person.position}</p>
                    </article>
                </NavLink>
            </SplideSlide>
        )
    }

    return (
        <Splide
            className='splide teachers-slider'
            options={{
                type: type,
                rewind: true,
                pagination: false,
                arrows: type === "loop" || categories.length > 1 || items.length > 1,
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
            {categories.length > 0 && categories.map((category) => {
                return category.persons.map((person) => {
                    return (
                        <Slide key={person.ID} person={person}/>
                    )
                })
            })}

            {items.length > 0 && items.map((person) => {
                return (
                    <Slide key={person.ID} person={person}/>
                )
            })}
        </Splide>
    );
};

export default TeachersSlider;
