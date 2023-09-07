import React from "react";
import "./advantages.scss";
import advantages__image_1 from "../../../images/advantages__image_1.png";
import advantages__image_2 from "../../../images/advantages__image_2.png";
import advantages__image_3 from "../../../images/advantages__image_3.png";
import advantages__image_4 from "../../../images/advantages__image_4.png";

const Advantages = () => {
    return (
        <section className='advantages'>
            <h2 className='advantages__title main-section'>Наши преимущества</h2>
            <ul className='advantages__list'>
                <li className='card main-section'>
                    <div className='card__wrap'>
                        <img
                            className='card__image'
                            src={advantages__image_1}
                            alt='Изображение малышки с игрушечным фотоаппаратом'
                        />
                        <h3 className='card__title'>Безопасная среда</h3>
                        <div className='card__text'>
                            <p>
                                Безопасная среда детского сада включает в себя ряд факторов, которые обеспечивают
                                физическую, эмоциональную и психологическую безопасность детей
                            </p>
                        </div>
                    </div>
                </li>
                <li className='card main-section'>
                    <div className='card__wrap'>
                        <img className='card__image' src={advantages__image_2} alt='Изображение мальчика в зеленой маске' />
                        <h3 className='card__title'>Социализация</h3>
                        <div className='card__text'>
                            <p>
                                Детский сад обеспечивает возможности для социализации и взаимодействия с другими детьми,
                                что способствует развитию коммуникативных навыков, умению сотрудничать и учиться дружить
                            </p>
                        </div>
                    </div>
                </li>
                <li className='card main-section'>
                    <div className='card__wrap'>
                        <img className='card__image' src={advantages__image_3} alt='Изображение девочки с книгой' />
                        <h3 className='card__title'>Обучение и развитие</h3>
                        <div className='card__text'>
                            <p>
                                В детском саду предлагается обучающая программа, которая стимулирует интеллектуальное,
                                физическое, эмоциональное и социальное развитие детей. Дети учатся различным навыкам,
                                таким как чтение, письмо, математика, искусство и наука, а также развивают свою моторику
                            </p>
                        </div>
                    </div>
                </li>
                <li className='card main-section'>
                    <div className='card__wrap'>
                        <img className='card__image' src={advantages__image_4} alt='Изображение домика из кубиков' />
                        <h3 className='card__title'>Подготовка к школе</h3>
                        <div className='card__text'>
                            <p>
                                Детский сад помогает детям адаптироваться к школьной среде и подготавливает
                                их к успешному переходу в начальную школу
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    );
};

export default Advantages;
