import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import useTeachersStore from "../../../store/public/teachersStore";

import BasicPage from "../../../components/public/basic.page/basic.page.component";
import Tabs from "../../../components/public/tabs/tabs.component";
import Tab from "../../../components/public/tabs/tab.component";

import { AdminIcons } from "../../../components/svgs";
import SingleImageWithPreview from "../../../components/general/single.image.with.preview/single.image.with.preview";
import Table from "../../../components/public/table/table.component";
import Breadcrumbs from "../../../components/public/breadcrumbs/breadcrumbs";
import { Helmet } from "react-helmet";

const TeacherPage = () => {
    let { id } = useParams();

    const store = useTeachersStore();

    const fetchData = async () => {
        await store.loadByID({ id });
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const itemConfigEducation = [
        {
            header: "ID",
            key: "ID",
            type: "int",
            filter: "number",
            sorting: true,
            hide: true,
        },
        {
            header: "Наименование учебного учреждения",
            key: "orgName",
            type: "string",
            filter: "string",
            sorting: true,
            required: true,
        },
        {
            header: "Дата окончания",
            key: "endDate",
            type: "date",
            filter: "date",
            sorting: true,
            required: true,
        },
        {
            header: "Специальность, квалификация по диплому",
            key: "qualification",
            type: "string",
            filter: "select",
            sorting: true,
            required: true,
        },
    ];
    const itemConfigQualification = [
        {
            header: "ID",
            key: "ID",
            type: "int",
            filter: "number",
            sorting: true,
            hide: true,
        },
        {
            header: "Наименование",
            key: "title",
            type: "string",
            filter: "string",
            sorting: true,
            required: true,
        },
        {
            header: "Место проведения",
            key: "place",
            type: "string",
            filter: "string",
            sorting: true,
            required: true,
        },
        {
            header: "Дата прохождения",
            key: "date",
            type: "date",
            filter: "date",
            sorting: true,
            required: true,
        },
        {
            header: "Количество часов",
            key: "hours",
            type: "int",
            filter: "int",
            sorting: true,
            required: true,
        },
    ];
    const itemConfigWork = [
        {
            header: "ID",
            key: "ID",
            type: "int",
            filter: "number",
            sorting: true,
            hide: true,
        },
        {
            header: "Общий стаж",
            key: "summary",
            type: "string",
            filter: "string",
            sorting: true,
            required: true,
        },
        {
            header: "Педагогический стаж",
            key: "education",
            type: "string",
            filter: "string",
            sorting: true,
            required: true,
        },
        {
            header: "В данном учреждении",
            key: "work",
            type: "string",
            filter: "string",
            sorting: true,
            required: true,
        },
        {
            header: "Квалификационная категория",
            key: "category",
            type: "string",
            filter: "string",
            sorting: true,
            required: true,
        },
        {
            header: "Дата аттестации",
            key: "date",
            type: "date",
            filter: "date",
            sorting: true,
            required: true,
        },
        {
            header: "Приказ",
            key: "date_order",
            type: "string",
            filter: "string",
            sorting: true,
            required: false,
        },
    ];
    const itemConfigReward = [
        {
            header: "ID",
            key: "ID",
            type: "int",
            filter: "number",
            sorting: true,
            hide: true,
        },
        {
            header: "Наименование",
            key: "title",
            type: "string",
            filter: "string",
            sorting: true,
            required: true,
        },
        {
            header: "Дата",
            key: "date",
            type: "date",
            filter: "date",
            sorting: true,
            required: true,
        },
    ];

    return (
        <BasicPage loadings={[store]}>
            <Helmet>
                <title>{store.item.fio}</title>
            </Helmet>
            <Breadcrumbs
                items={[
                    {
                        title: "Главная",
                        url: "/",
                    },
                    {
                        title: "Педагоги",
                        url: "/teachers/",
                    },
                    {
                        title: store.item.fio,
                        url: "",
                    },
                ]}
            />
            <motion.section
                className='article'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
            >
                <article className='person'>
                    <SingleImageWithPreview
                        isPersonImage={true}
                        image={store.item.photo}
                        extraClass={"person__image"}
                    />
                    <div className='person__section'>
                        <div className='person__main-content'>
                            <h1 className='person__title'>{store.item.fio}</h1>
                            <p className='person__subtitle'>{store.item.position}</p>
                            {store.item.page && (
                                <a
                                    className='person__link'
                                    href={store.item.page}
                                    rel='noopener nofollow noreferrer'
                                    target='_blank'
                                >
                                    Личная страница {AdminIcons.open_in_new}
                                </a>
                            )}
                        </div>
                        <Tabs>
                            <Tab title={"Образование"}>
                                <Table
                                    title={"Информация об образовании"}
                                    items={store.item.educations}
                                    itemsConfig={itemConfigEducation}
                                />
                            </Tab>
                            <Tab title={"Повышение квалификации"}>
                                <Table
                                    title={"Информация об квалификации"}
                                    items={store.item.qualifications}
                                    itemsConfig={itemConfigQualification}
                                />
                            </Tab>
                            <Tab title={"Трудовой стаж"}>
                                <ul className='person__list'>
                                    <li className='person__item'>
                                        <p className='person__label'>Общий стаж</p>
                                        <p className='person__description'></p>
                                    </li>
                                    <li className='person__item'>
                                        <p className='person__label'>Педагогический стаж</p>
                                        <p className='person__description'></p>
                                    </li>
                                    <li className='person__item'>
                                        <p className='person__label'>В данном учреждении</p>
                                        <p className='person__description'></p>
                                    </li>
                                    <li className='person__item'>
                                        <p className='person__label'>Квалификационная категория</p>
                                        <p className='person__description'></p>
                                    </li>
                                    <li className='person__item'>
                                        <p className='person__label'>Дата аттестации</p>
                                        <p className='person__description'></p>
                                    </li>
                                    <li className='person__item'>
                                        <p className='person__label'>Приказ</p>
                                        <p className='person__description'></p>
                                    </li>
                                </ul>
                                <Table
                                    title={"Информация о трудовом стаже"}
                                    items={store.item.works}
                                    itemsConfig={itemConfigWork}
                                />
                            </Tab>
                            {
                                store.item.rewards.length > 0 &&
                                <Tab title={"Награды, благодарности"}>
                                    <Table
                                        title={"Информация о наградах, благодарностях"}
                                        items={store.item.rewards}
                                        itemsConfig={itemConfigReward}
                                    />
                                </Tab>
                            }
                        </Tabs>
                    </div>
                </article>
            </motion.section>
        </BasicPage>
    );
};

export default TeacherPage;
