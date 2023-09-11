import React from "react";
import "./lead.scss";
import Image from "../../../images/lead__image.jpg";

const Lead = () => {
    return (
        <section className='lead main-section'>
            <h1 className='main-title'>
                ФГБДОУ &laquo;Центр развития ребенка&nbsp;&mdash; детский сад &laquo;Сосны&raquo;
            </h1>
            <img className='lead__image' src={Image} alt='Изображение соснового леса' />
        </section>
    );
};

export default Lead;
