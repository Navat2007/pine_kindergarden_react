import React from "react";
import { Helmet } from "react-helmet";
import {motion} from "framer-motion";
import {NavLink} from "react-router-dom";

import useTeachersStore from "../../../store/public/teachersStore";

import BasicPage from "../../../components/public/basic.page/basic.page.component";

import "./teachers.scss";
import person_2 from "../../../images/person_2.jpg";
import person_3 from "../../../images/person_3.jpg";
import person_4 from "../../../images/person_4.jpg";
import SingleImageWithPreview from "../../../components/general/single_image_with_preview/single.image.with.preview";

const TeachersPage = () => {
    const store = useTeachersStore();

    const fetchData = async () => {
        await store.loadAll();
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const Person = ({person}) => {
        return (
            <li className='teachers__item'>
                <NavLink to={"/teachers/" + person.ID } className='card-link'>
                    <article className='teachers-card'>
                        <SingleImageWithPreview image={person.photo} extraClass={'teachers-card__image'} />
                        <h3 className='teachers-card__title'>{person.fio}</h3>
                        <p className='teachers-card__subtitle'>{person.position}</p>
                    </article>
                </NavLink>
            </li>
        )
    }

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
                                {
                                    item.persons.map((person) => {
                                        return (
                                            <Person key={person.ID} person={person} />
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })}

            </motion.section>
        </BasicPage>
    );
};

export default TeachersPage;
