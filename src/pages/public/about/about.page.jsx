import React from "react";
import {Helmet} from "react-helmet";
import {motion, Variants} from "framer-motion";
import {NavLink} from "react-router-dom";
import createDOMPurify from "dompurify";

import useAboutStore from "../../../store/public/aboutStore";
import useGroupsStore from "../../../store/public/groupsStore";
import useTeachersStore from "../../../store/public/employeesStore";

import BasicPage from "../../../components/public/basic.page/basic.page.component";
import TeachersSlider from "../../../components/general/teachers.slider/teachers.slider";

import "./about.scss";
import about__image from "../../../images/about__image.jpg";

const GroupsPage = () => {
    const DOMPurify = createDOMPurify(window);
    const aboutStore = useAboutStore();
    const groupsStore = useGroupsStore();
    const teachersStore = useTeachersStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await aboutStore.loadByID({id: 1});
            await groupsStore.loadAll();
            await teachersStore.loadAll();
        };

        fetchData();
    }, []);

    return (
        <BasicPage loadings={[aboutStore, groupsStore, teachersStore]}>
            <Helmet>
                <title>Наши группы</title>
            </Helmet>
            <section className='about about_contain_inner'>
                <h1 className='main-title'>
                    ФГБДОУ &laquo;Центр развития ребенка&nbsp;&mdash; детский сад &laquo;Сосны&raquo;
                </h1>
                <div className='about__column'>
                    <div className='about__text'>
                        <h2 className='about__title'>О нас</h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(aboutStore.item.preview),
                            }}
                        />
                    </div>
                    <img
                        className='about__image'
                        src={about__image}
                        loading="lazy"
                        alt='Изображение девочки с большим мыльным пузырем'
                    />
                </div>
            </section>
            <section className='about about_bg_light-primary' aria-label='Описание о нас'>
                <div className='about__inner about__inner_bg_half-image'>
                    <div
                        className='about__description'
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(aboutStore.item.text),
                        }}
                    />
                </div>
            </section>
            <section className='about about_contain_inner'>
                <h2 className='about__title'>Наша команда</h2>
                {
                    teachersStore.loading
                        ?
                        <p>Загрузка...</p>
                        :
                        <TeachersSlider categories={teachersStore.items}/>
                }

            </section>
        </BasicPage>
    );
};

export default GroupsPage;
