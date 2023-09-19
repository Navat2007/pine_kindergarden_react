import React from "react";

import "./construction.scss";

import Image_samo from "../../../images/construction__image.jpg";

const Construction = () => {
    return (
        <section className='construction main-wrapper'>
            <img className='construction__image' src={Image_samo} alt='Дети собирают кубики сидя на полу' />
            <h1 className='construction__title'>Ведутся работы по создранию страницы...</h1>
        </section>
    );
};

export default Construction;
