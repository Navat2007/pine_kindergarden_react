import React from "react";
import "./lead.scss";
import Image from "../../../images/lead__image.jpg";

const Lead = () => {
    return (
<section className="lead section">
    <h1 className="title">
        Детский сад СОСНЫ <br />
        Здесь начинается Детство
    </h1>
    <img className="lead__image" src={Image} alt="Изображение соснового леса" />
</section>
    );
};

export default Lead;
