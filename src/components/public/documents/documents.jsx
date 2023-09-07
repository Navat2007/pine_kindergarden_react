import React from "react";

import "./documents.scss";

import Image_samo from "../../../images/documents/samo_preview.jpg";
import Docs_samo from "../../../documents/samo.pdf";
import Image_d41 from "../../../images/documents/d41_preview.jpg";
import Docs_d41 from "../../../documents/d41.pdf";

const Documents = () => {
    return (
        <section className='documents main-section'>
            <h2 className='documents__title'>Документы</h2>
            <ul className='documents__list'>
                <li className='documents__item main-section'>
                    <img
                        className='documents__item-image'
                        src={Image_samo}
                        alt='Изображение документа Результаты самообследования'
                    />
                    <div className='documents__item-section'>
                        <h3 className='documents__item-title'>Результаты само&shy;обсле&shy;дования</h3>
                        <div className='documents__item-text'>
                            <p>
                                Отчет о результатах самообследования ФГБДОУ "Центр развития ребенка - детский сад
                                "Сосны" за 2022 год
                            </p>
                        </div>
                        <a className='documents__item-link' href={Docs_samo} rel='noopener nofollow noreferer'>
                            Скачать
                        </a>
                    </div>
                </li>
                <li className='documents__item main-section'>
                    <img className='documents__item-image' src={Image_d41} alt='Изображение документа Приказ' />
                    <div className='documents__item-section'>
                        <h3 className='documents__item-title'>Приказ</h3>
                        <div className='documents__item-text'>
                            <p>
                                Приказ о назначение на должность заведующей ФГБДОУ «Центр развития ребенка -детский сад
                                «Сосны»
                            </p>
                        </div>
                        <a className='documents__item-link' href={Docs_d41} rel='noopener nofollow noreferer'>
                            Скачать
                        </a>
                    </div>
                </li>
            </ul>
        </section>
    );
};

export default Documents;
