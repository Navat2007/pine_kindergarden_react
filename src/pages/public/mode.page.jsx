import React from "react";
import { Helmet } from "react-helmet";

import Feedback from "../../components/public/feedback/feedback";
import Construction from "../../components/public/cunstruction/construction";
import Tabs from "../../components/public/tabs/tabs.component";
import Tab from "../../components/public/tabs/tab.component";

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
                    <div className='person__main-text'>
                        <h1 className='person__title'>Инна Федоровна Осипова</h1>
                        <p className='person__subtitle'>Логопед</p>
                        <Tabs>
                            <Tab title={"Образование"}>
                                <div className='table'></div>

                                Наименование учебного учреждения	Дата окончания	Специальность, квалификация по диплому
Московский государственный заочный педагогический институт	1990 год
Педагогика и психология (дошкольная), преподаватель дошкольной педагогики и психологии, методист по дошкольному воспитанию
                            </Tab>
                            <Tab title={"Повышение квалификации"}></Tab>
                            <Tab title={"Трудовой стаж"}></Tab>
                            <Tab title={"Награды, благодарности"}></Tab>
                        </Tabs>
                    </div>
                </article>
            </section>
            <Feedback />
        </>
    );
};

export default ModePage;
