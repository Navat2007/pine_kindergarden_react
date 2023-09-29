import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import useTeachersStore from "../../../store/public/teachersStore";

import SingleImageWithPreview from "../../../components/general/single.image.with.preview/single.image.with.preview";
import BasicPage from "../../../components/public/basic.page/basic.page.component";

import "./teachers.scss";

const TeachersPage = () => {
    const store = useTeachersStore();

    const fetchData = async () => {
        await store.loadAll();
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const Person = ({ person }) => {
        return (
            <li className='teachers__item'>
                <NavLink to={"/teachers/" + person.ID} className='card-link'>
                    <article className='teachers-card'>
                        <SingleImageWithPreview
                            isPersonImage={true}
                            image={person.photo}
                            extraClass={"teachers-card__image"}
                        />
                        <h3 className='teachers-card__title'>{person.fio}</h3>
                        <p className='teachers-card__subtitle'>{person.position}</p>
                    </article>
                </NavLink>
            </li>
        );
    };

    return (
        <BasicPage loadings={[store]}>
            <Helmet>
                <title>Педагоги</title>
            </Helmet>
            <motion.section
                className='teachers'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
            >
                {store.items.map((item) => {
                    return (
                        <div key={item.category}>
                            <h2 className='teachers__title'>{item.category}</h2>
                            <ul className='teachers__list'>
                                {item.persons.map((person) => {
                                    return <Person key={person.ID} person={person} />;
                                })}
                            </ul>
                        </div>
                    );
                })}
            </motion.section>
        </BasicPage>
    );
};

export default TeachersPage;
