import React from "react";
import "./lessons.scss";
import Card_image_1 from "../../../images/lessons__card-image_1.jpg";
import Card_image_2 from "../../../images/lessons__card-image_2.jpg";
import Card_image_3 from "../../../images/lessons__card-image_3.jpg";
import Card_image_4 from "../../../images/lessons__card-image_4.jpg";
import Card_image_5 from "../../../images/lessons__card-image_5.jpg";
import Card_image_6 from "../../../images/lessons__card-image_6.jpg";
import Card_image_7 from "../../../images/lessons__card-image_7.jpg";
import Card_image_8 from "../../../images/lessons__card-image_8.jpg";
import Card_image_9 from "../../../images/lessons__card-image_9.jpg";
import Card_image_10 from "../../../images/lessons__card-image_10.jpg";
import Card_image_11 from "../../../images/lessons__card-image_11.jpg";
import Card_image_12 from "../../../images/lessons__card-image_12.jpg";
import VisibilityTrackComponent from "../visibility/visibility.track";

const Lessons = () => {
    return (
        <section className='lessons'>
            <h1 className='lessons__title main-section'>Занятия</h1>
            <p className='lessons__title main-section'>Что будем делать?</p>
            <ul className='lessons__list'>
                <VisibilityTrackComponent extraClassName={"lessons__card"}>
                    <img
                        className='lessons__card-image'
                        src={Card_image_1}
                        alt='Изображение шахмат на шахматной доске'
                    />
                    <h2 className='lessons__card-title'>Шахматы</h2>
                </VisibilityTrackComponent>
                <VisibilityTrackComponent extraClassName={"lessons__card"}>
                    <img
                        className='lessons__card-image'
                        src={Card_image_2}
                        alt='Изображение пляжного мяча на воде'
                    />
                    <h2 className='lessons__card-title'>Бассейн</h2>
                </VisibilityTrackComponent>
                <VisibilityTrackComponent extraClassName={"lessons__card"}>
                    <img
                        className='lessons__card-image'
                        src={Card_image_3}
                        alt='Изображение букв на асфальте'
                    />
                    <h2 className='lessons__card-title'>Ангийский язык</h2>
                </VisibilityTrackComponent>
                <VisibilityTrackComponent extraClassName={"lessons__card"}>
                    <img
                        className='lessons__card-image'
                        src={Card_image_4}
                        alt='Изображение работы на гончарном круге'
                    />
                    <h2 className='lessons__card-title'>Гончарный круг</h2>
                </VisibilityTrackComponent>
                <VisibilityTrackComponent extraClassName={"lessons__card"}>
                    <img
                        className='lessons__card-image'
                        src={Card_image_5}
                        alt='Изображение студийного микрофона'
                    />
                    <h2 className='lessons__card-title'>Вокал</h2>
                </VisibilityTrackComponent>
                <VisibilityTrackComponent extraClassName={"lessons__card"}>
                    <img
                        className='lessons__card-image'
                        src={Card_image_6}
                        alt='Изображение мальчика в аквагримме на сцене'
                    />
                    <h2 className='lessons__card-title'>Актерское мастерство</h2>
                </VisibilityTrackComponent>
                <VisibilityTrackComponent extraClassName={"lessons__card"}>
                    <img
                        className='lessons__card-image'
                        src={Card_image_7}
                        alt='Изображение кубика-рубика'
                    />
                    <h2 className='lessons__card-title'>Математика</h2>
                </VisibilityTrackComponent>
                <VisibilityTrackComponent extraClassName={"lessons__card"}>
                    <img
                        className='lessons__card-image'
                        src={Card_image_8}
                        alt='Изображение механизмов из лего конструкторов'
                    />
                    <h2 className='lessons__card-title'>Робототехника</h2>
                </VisibilityTrackComponent>
                <VisibilityTrackComponent extraClassName={"lessons__card"}>
                    <img className='lessons__card-image' src={Card_image_9} alt='Изображение детей' />
                    <h2 className='lessons__card-title'>Аэробика</h2>
                </VisibilityTrackComponent>
                <VisibilityTrackComponent extraClassName={"lessons__card"}>
                    <img
                        className='lessons__card-image'
                        src={Card_image_10}
                        alt='Изображение игры с кукольными игрушками'
                    />
                    <h2 className='lessons__card-title'>Логопед</h2>
                </VisibilityTrackComponent>
                <VisibilityTrackComponent extraClassName={"lessons__card"}>
                    <img
                        className='lessons__card-image'
                        src={Card_image_11}
                        alt='Изображение деток, занимающихся пилатесом'
                    />
                    <h2 className='lessons__card-title'>Живчики</h2>
                </VisibilityTrackComponent>
                <VisibilityTrackComponent extraClassName={"lessons__card"}>
                    <img
                        className='lessons__card-image'
                        src={Card_image_12}
                        alt='Изображение мальчика, рассмотривающего бабочку на цветке через лупу'
                    />
                    <h2 className='lessons__card-title'>Окружающий мир</h2>
                </VisibilityTrackComponent>
            </ul>
        </section>
    );
};

export default Lessons;
