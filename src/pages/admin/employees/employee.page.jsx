import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import useEmployeesStore from "../../../store/admin/employeesStore";
import useEmployeesCategoriesStore from "../../../store/admin/employeeCategoriesStore";

import Table from "../../../components/admin/table/table.component";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import Button from "../../../components/admin/button/button.component";
import Tabs from "../../../components/general/tabs/tabs.component";
import Tab from "../../../components/general/tabs/tab.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";

import { AdminIcons } from "../../../components/svgs";

const AdminEmployeePage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();

    const store = useEmployeesStore();
    const storeCategories = useEmployeesCategoriesStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await storeCategories.loadAll();
            await store.loadByID({ id });
        };

        fetchData();
    }, []);

    const back = () => {
        window.localStorage.removeItem(`teacher_create_tab`);
        navigate("/admin/employees");
    };

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
            required: false,
        },
        {
            header: "Педагогический стаж",
            key: "education",
            type: "string",
            filter: "string",
            sorting: true,
            required: false,
        },
        {
            header: "В данном учреждении",
            key: "work",
            type: "string",
            filter: "string",
            sorting: true,
            required: false,
        },
        {
            header: "Квалификационная категория",
            key: "category",
            type: "string",
            filter: "string",
            sorting: true,
            required: false,
        },
        {
            header: "Дата аттестации",
            key: "date",
            type: "date",
            filter: "date",
            sorting: true,
            required: false,
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
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Сотрудник ID: ${store.item.ID}`} onBack={back}>
                <Button
                    type='submit'
                    isIconBtn='true'
                    theme='text'
                    iconName={AdminIcons.edit}
                    aria-label='Редактировать'
                    onClick={() => navigate(`/admin/employees/edit/${id}`)}
                />
            </TitleBlock>
            <Tabs>
                <Tab title={"Основная информация"}>
                    <section className='admin-view-section'>
                        <div className='admin-view-section__two-columns'>
                            <div className='admin-view-section__column'>
                                <h2 className='admin-view-section__title'>Основная информация</h2>
                                <ul className='admin-view-section__list'>
                                    <li className='admin-view-section__item'>
                                        <h3 className='admin-view-section__label'>ФИО</h3>
                                        <p className='admin-view-section__description'>{store.item.fio}</p>
                                    </li>
                                    <li className='admin-view-section__item'>
                                        <h3 className='admin-view-section__label'>Должность</h3>
                                        <p className='admin-view-section__description'>
                                            {store.item.position}
                                        </p>
                                    </li>
                                    <li className='admin-view-section__item'>
                                        <h3 className='admin-view-section__label'>Публичная страница</h3>
                                        <p className='admin-view-section__description'>
                                            <NavLink
                                                className='admin-view-section__link'
                                                to={"/employees/" + id}
                                                target={"_blank"}
                                                rel='noopener nofollow noreferrer'
                                            >
                                                На страницу {AdminIcons.open_in_new}
                                            </NavLink>
                                        </p>
                                    </li>
                                    {store.item.page && (
                                        <li className='admin-view-section__item'>
                                            <h3 className='admin-view-section__label'>Личная страница</h3>
                                            <p className='admin-view-section__description'>
                                                <NavLink
                                                    className='admin-view-section__link'
                                                    to={store.item.page}
                                                    target={"_blank"}
                                                    rel='noopener nofollow noreferrer'
                                                >
                                                    {store.item.page}
                                                </NavLink>
                                            </p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className='admin-view-section__column'>
                                <h2 className='admin-view-section__title'>Фотография</h2>
                                <ImageGallery
                                    orientation='portrait'
                                    extraClass={"admin-view-section__photo"}
                                    items={[
                                        {
                                            url: store.item.photo,
                                        },
                                    ]}
                                    front={false}
                                />
                            </div>
                        </div>
                    </section>
                </Tab>
                {store.item?.educations?.length > 0 && (
                    <Tab title={"Образование"}>
                        <section className='admin-view-section'>
                            <h2 className='admin-view-section__title'>Образование</h2>
                            <Table
                                title={"Информация об образовании"}
                                items={store.item.educations}
                                itemsConfig={itemConfigEducation}
                            />
                        </section>
                    </Tab>
                )}
                {store.item?.qualifications?.length > 0 && (
                    <Tab title={"Квалификация"}>
                        <section className='admin-view-section'>
                            <h2 className='admin-view-section__title'>Квалификация</h2>
                            <Table
                                title={"Информация об квалификации"}
                                items={store.item.qualifications}
                                itemsConfig={itemConfigQualification}
                            />
                        </section>
                    </Tab>
                )}
                {store.item?.works?.length > 0 && (
                    <Tab title={"Трудовой стаж"}>
                        <h2 className='admin-view-section__title'>Трудовой стаж</h2>
                        <Table
                            title={"Информация о трудовом стаже"}
                            items={store.item.works}
                            itemsConfig={itemConfigWork}
                        />
                    </Tab>
                )}
                {store.item?.rewards?.length > 0 && (
                    <Tab title={"Награды, благодарности"}>
                        <section className='admin-view-section'>
                            <h2 className='admin-view-section__title'>Награды, благодарности</h2>
                            <Table
                                title={"Информация о наградах, благодарностях"}
                                items={store.item.rewards}
                                itemsConfig={itemConfigReward}
                            />
                        </section>
                    </Tab>
                )}
            </Tabs>
        </BasicPage>
    );
};

export default AdminEmployeePage;
