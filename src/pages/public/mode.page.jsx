import React from "react";
import { Helmet } from "react-helmet";

import Feedback from "../../components/public/feedback/feedback";
import Construction from "../../components/public/cunstruction/construction";
import Tabs from "../../components/public/tabs/tabs.component";
import Tab from "../../components/public/tabs/tab.component";
import { AdminIcons } from "../../components/svgs";

const ModePage = () => {
    return (
        <>
            <Helmet>
                <title>Режим</title>
            </Helmet>
            {/* <Construction /> */}

            <section className='article'>
                <article className='person'>
                    <img
                        className='person__image'
                        src='https://ds1387.ru/images/people/volkova2.jpg'
                        loading='lazy'
                        alt='Фотография Инна Федоровна Осипова'
                    />
                    <div className='person__section'>
                        <div className='person__main-content'>
                            <h1 className='person__title'>Инна Федоровна Осипова</h1>
                            <p className='person__subtitle'>Логопед</p>
                            <a className='person__link' href='' rel='noopener nofollow noreferer' target='_blank'>
                                Личная страница {AdminIcons.open_in_new}
                            </a>
                        </div>
                        <Tabs>
                            <Tab title={"Образование"}>
                                <div className='table'>
                                    <div className='table__container'>
                                        <table className='table__table'>
                                            <thead className='table__thead'>
                                                <tr className='table__row'>
                                                    <th className='table__cell-heading'>
                                                        Наименование учебного учреждения
                                                    </th>
                                                    <th className='table__cell-heading'>Дата окончания</th>
                                                    <th className='table__cell-heading'>
                                                        Специальность, квалификация по диплому
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className='table__tbody'>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>
                                                        Московский государственный заочный педагогический институт
                                                    </td>
                                                    <td className='table__cell'>1990 год</td>
                                                    <td className='table__cell'>
                                                        Педагогика и психология (дошкольная), преподаватель дошкольной
                                                        педагогики и психологии, методист по дошкольному воспитанию
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                            <Tab title={"Повышение квалификации"}>
                                <div className='table'>
                                    <div className='table__container'>
                                        <table className='table__table'>
                                            <thead className='table__thead'>
                                                <tr className='table__row'>
                                                    <th className='table__cell-heading'>Наименование</th>
                                                    <th className='table__cell-heading'>Место проведения</th>
                                                    <th className='table__cell-heading'>Дата прохождения</th>
                                                    <th className='table__cell-heading'>Количество часов</th>
                                                </tr>
                                            </thead>
                                            <tbody className='table__tbody'>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>
                                                        Руководство развитием дошкольной образовательной организации
                                                    </td>
                                                    <td className='table__cell'>
                                                        Негосударственное образовательное частное учреждение организации
                                                        дополнительного профессионального образования "Актион-МЦФЭР"
                                                    </td>
                                                    <td className='table__cell'>2018 год</td>
                                                    <td className='table__cell'>72 часа</td>
                                                </tr>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>
                                                        Организация и контроль качества образовательной деятельности в
                                                        ДОО
                                                    </td>
                                                    <td className='table__cell'>
                                                        Негосударственное образовательное частное учреждение организации
                                                        дополнительного профессионального образования "Актион-МЦФЭР"
                                                    </td>
                                                    <td className='table__cell'>2018 год</td>
                                                    <td className='table__cell'>72 часа</td>
                                                </tr>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>
                                                        Управление образовательной организацией
                                                    </td>
                                                    <td className='table__cell'>
                                                        Негосударственное образовательное частное учреждение организации
                                                        дополнительного профессионального образования "Актион-МЦФЭР"
                                                    </td>
                                                    <td className='table__cell'>2018 год</td>
                                                    <td className='table__cell'>120 часов</td>
                                                </tr>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>
                                                        Менеджмент дошкольного образования (профессиональная
                                                        переподготовка)
                                                    </td>
                                                    <td className='table__cell'>
                                                        Негосударственное образовательное частное учреждение организации
                                                        дополнительного профессионального образования "Актион-МЦФЭР"
                                                    </td>
                                                    <td className='table__cell'>2018 год</td>
                                                    <td className='table__cell'>250 часов</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                            <Tab title={"Трудовой стаж"}>
                                <div className='table'>
                                    <div className='table__container'>
                                        <table className='table__table'>
                                            <tbody className='table__tbody'>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>Общий стаж</td>
                                                    <td className='table__cell'>38 лет</td>
                                                </tr>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>Педагогический стаж</td>
                                                    <td className='table__cell'>38 лет</td>
                                                </tr>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>В данном учреждении</td>
                                                    <td className='table__cell'>35 лет</td>
                                                </tr>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>Квалификационная категория:</td>
                                                    <td className='table__cell'>высшая</td>
                                                </tr>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>Дата аттестации:</td>
                                                    <td className='table__cell'>
                                                        19.12.2017 (Приказ Управления делами Президента Российской
                                                        Федерации от 09.01.2018 г. № 2 лс)
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                            <Tab title={"Награды, благодарности"}>
                                <div className='table'>
                                    <div className='table__container'>
                                        <table className='table__table'>
                                            <thead className='table__thead'>
                                                <tr className='table__row'>
                                                    <th className='table__cell-heading'>Наименование</th>
                                                    <th className='table__cell-heading'>Дата</th>
                                                </tr>
                                            </thead>
                                            <tbody className='table__tbody'>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>Почетная грамота учреждения</td>
                                                    <td className='table__cell'>06.11.1984</td>
                                                </tr>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>Медаль «В память 850-летия Москвы»</td>
                                                    <td className='table__cell'>26.02.1997</td>
                                                </tr>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>
                                                        Почетная грамота Управления делами Президента РФ
                                                    </td>
                                                    <td className='table__cell'>15.01.1999</td>
                                                </tr>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>
                                                        Благодарность Управления делами Президента РФ
                                                    </td>
                                                    <td className='table__cell'>02.12.2008</td>
                                                </tr>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>
                                                        Памятный знак «20 лет Управлению делами Президента РФ»
                                                    </td>
                                                    <td className='table__cell'>14.11.2013</td>
                                                </tr>
                                                <tr className='table__row'>
                                                    <td className='table__cell'>
                                                        Благодарность Управления делами Президента РФ
                                                    </td>
                                                    <td className='table__cell'>24.10.2018</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </article>
            </section>
            <Feedback />
        </>
    );
};

export default ModePage;
