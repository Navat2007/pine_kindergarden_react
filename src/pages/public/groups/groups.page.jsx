import React from "react";
import { Helmet } from "react-helmet";
import {motion, Variants} from "framer-motion";
import {NavLink} from "react-router-dom";

import useAboutStore from "../../../store/public/aboutStore";
import useGroupsStore from "../../../store/public/groupsStore";
import useEmployeesStore from "../../../store/public/employeesStore";

import BasicPage from "../../../components/public/basic.page/basic.page.component";

import "./about.scss";

const GroupsPage = () => {
    const aboutStore = useAboutStore();
    const groupsStore = useGroupsStore();
    const teachersStore = useEmployeesStore();

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
                <h2 id={"groups"} className='about__title'>Наши группы</h2>
                <ul className='about__list'>
                    {
                        groupsStore.loading && <h3>Загрузка...</h3>
                    }
                    {
                        groupsStore.loading === false && groupsStore.items.map((item, index) => {
                            const cardVariants: Variants = {
                                offscreen: {
                                    y: 300,
                                    rotate: window.global.getRandomIntNumber(-30, 30),
                                },
                                onscreen: {
                                    y: 0,
                                    rotate: 0,
                                    transition: {
                                        type: "spring",
                                        bounce: 0.4,
                                        duration: 0.8
                                    }
                                }
                            };

                            return (
                                <motion.li
                                    key={index}
                                    initial="offscreen"
                                    whileInView="onscreen"
                                    viewport={{once: true, amount: 0.05}}
                                    variants={cardVariants}
                                >
                                    <NavLink
                                        className={"card-link"}
                                        to={"" + item.ID}
                                        aria-label={"Главная страница"}
                                    >
                                        <article className='about-card'>
                                            <img
                                                className='about-card__image'
                                                src={
                                                    item.image.includes("http")
                                                        ? item.image
                                                        : process.env.REACT_APP_BASE_URL + item.image
                                                }
                                                loading="lazy"
                                                alt='Изображение группы'
                                            />
                                            <h3 className='about-card__title'>{item.title}</h3>
                                            <p>{item.preview}</p>
                                        </article>
                                    </NavLink>
                                </motion.li>
                            );
                        })
                    }
                </ul>
            </section>
        </BasicPage>
    );
};

export default GroupsPage;
