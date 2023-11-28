import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import useEmployeesStore from "../../../store/public/employeesStore";

import SingleImageWithPreview from "../../../components/general/single.image.with.preview/single.image.with.preview";
import BasicPage from "../../../components/public/basic.page/basic.page.component";

import "./employees.scss";

const EmployeesPage = () => {
    const store = useEmployeesStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadAll();
        };

        fetchData();
    }, []);

    const Person = ({ person }) => {
        return (
            <li className='teachers__item'>
                <NavLink to={"" + person.ID} className='card-link'>
                    <article className='employees-card'>
                        <SingleImageWithPreview
                            isPersonImage={true}
                            image={person.photo}
                            extraClass={"employees-card__image"}
                        />
                        <h3 className='employees-card__title'>{person.fio}</h3>
                        <p className='employees-card__subtitle'>{person.position}</p>
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
                className='employees'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
            >
                {store.items.map((item) => {
                    return (
                        <div key={item.category}>
                            <h2 className='employees__title'>{item.category}</h2>
                            <ul className='employees__list'>
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

export default EmployeesPage;
