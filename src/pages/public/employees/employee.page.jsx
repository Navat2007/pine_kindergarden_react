import React from "react";
import {motion} from "framer-motion";
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import moment from "moment";

import useEmployeesStore from "../../../store/public/employeesStore";

import BasicPage from "../../../components/public/basic.page/basic.page.component";
import Tabs from "../../../components/public/tabs/tabs.component";
import Tab from "../../../components/public/tabs/tab.component";
import SingleImageWithPreview from "../../../components/general/single.image.with.preview/single.image.with.preview";
import Table from "../../../components/public/table/table.component";
import Breadcrumbs from "../../../components/public/breadcrumbs/breadcrumbs";

import {AdminIcons} from "../../../components/svgs";

const EmployeePage = () => {
    let {id} = useParams();

    const store = useEmployeesStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({id});
        };

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
                        url: "/сотрудники/",
                    },
                    {
                        title: store.item.fio,
                        url: "",
                    },
                ]}
            />
            <motion.section
                className='article'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{delay: 0.2, duration: 1}}
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
                            {
                                store?.item?.educations?.length > 0 &&
                                <Tab title={"Образование"}>
                                    <Table
                                        title={"Информация об образовании"}
                                        items={store.item.educations}
                                        itemsConfig={itemConfigEducation}
                                    />
                                </Tab>
                            }
                            {
                                store?.item?.qualifications?.length > 0 &&
                                <Tab title={"Повышение квалификации"}>
                                    <Table
                                        title={"Информация об квалификации"}
                                        items={store.item.qualifications}
                                        itemsConfig={itemConfigQualification}
                                    />
                                </Tab>
                            }
                            {
                                store?.item?.works && Object.keys(store.item.works).length > 0 &&
                                <Tab title={"Трудовой стаж"}>
                                    <ul className='person__list'>
                                        {
                                            store.item.works.summary &&
                                            <li className='person__item'>
                                                <p className='person__label'>Общий стаж</p>
                                                <p className='person__description'>{store.item.works.summary}</p>
                                            </li>
                                        }
                                        {
                                            store.item.works.education &&
                                            <li className='person__item'>
                                                <p className='person__label'>Педагогический стаж</p>
                                                <p className='person__description'>{store.item.works.education}</p>
                                            </li>
                                        }
                                        {
                                            store.item.works.work &&
                                            <li className='person__item'>
                                                <p className='person__label'>В данном учреждении</p>
                                                <p className='person__description'>{store.item.works.work}</p>
                                            </li>
                                        }
                                        {
                                            store.item.works.category &&
                                            <li className='person__item'>
                                                <p className='person__label'>Квалификационная категория</p>
                                                <p className='person__description'>{store.item.works.category}</p>
                                            </li>
                                        }
                                        {
                                            store.item.works.date_order && store.item.works.date !== "0000-00-00" &&
                                            <li className='person__item'>
                                                <p className='person__label'>Дата аттестации</p>
                                                <p className='person__description'>{store.item.works.date !== "0000-00-00" && moment(store.item.works.date).format("DD.MM.YYYY")}</p>
                                            </li>
                                        }
                                        {
                                            store.item.works.date_order &&
                                            <li className='person__item'>
                                                <p className='person__label'>Приказ</p>
                                                <p className='person__description'>{store.item.works.date_order}</p>
                                            </li>
                                        }
                                    </ul>
                                </Tab>
                            }
                            {
                                store?.item?.rewards?.length > 0 &&
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

export default EmployeePage;
