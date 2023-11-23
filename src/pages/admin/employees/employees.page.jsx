import React from "react";
import { useNavigate } from "react-router-dom";

import useTeachersStore from "../../../store/admin/employeesStore";
import useTeachersCategoriesStore from "../../../store/admin/employeeCategoriesStore";
import {userStore} from "../../../store/userStore";

import Table from "../../../components/admin/table/table.component";
import Button from "../../../components/admin/button/button.component";
import Tab from "../../../components/general/tabs/tab.component";
import Tabs from "../../../components/general/tabs/tabs.component";

import { AdminIcons } from "../../../components/svgs";

const AdminEmployeesPage = () => {
    const navigate = useNavigate();

    //Private components
    const Employees = () => {
        const store = useTeachersStore();

        const url = "admin/employees";

        const onItemClick = (props) => {
            navigate(`/${url}/${props}`);
        };

        React.useEffect(() => {
            const fetchData = async () => {
                await store.loadAll();
            };

            fetchData();
        }, []);

        const itemConfig = [
            {
                header: "ID",
                key: "ID",
                type: "int",
                filter: "number",
                sorting: true,
            },
            {
                header: "ФИО",
                key: "fio",
                type: "string",
                filter: "string",
                sorting: true,
            },
            {
                header: "Должность",
                key: "position",
                type: "string",
                filter: "string",
                sorting: true,
            },
            {
                header: "Структурное подразделение",
                key: "category",
                type: "string",
                filter: "select",
                sorting: true,
            },
        ];

        return (
            <Table
                title={`Таблица ${url} ${userStore.value.ID}`}
                loading={store.loading}
                items={store.items}
                itemsConfig={itemConfig}
                onItemClick={onItemClick}
                withFilter={true}
            >
                <Button
                    type='button'
                    iconName={AdminIcons.plus}
                    aria-label='Добавить педагога'
                    onClick={() => navigate(`/${url}/new`)}
                >
                    Создать
                </Button>
            </Table>
        );
    };

    const Category = () => {
        const store = useTeachersCategoriesStore();

        const url = "admin/employees/category";

        const onItemClick = (props) => {
            navigate(`/${url}/edit/${props}`);
        };

        React.useEffect(() => {
            const fetchData = async () => {
                await store.loadAll();
            };

            fetchData();
        }, []);

        const itemConfig = [
            {
                header: "ID",
                key: "ID",
                type: "int",
                filter: "number",
                sorting: true,
            },
            {
                header: "Структурное подразделение",
                key: "title",
                type: "string",
                sorting: true,
            },
            {
                header: "Сортировка",
                key: "sorting",
                type: "int",
                filter: "number",
                sorting: true,
            },
        ];

        return (
            <Table
                title={`Таблица ${url} ${userStore.value.ID}`}
                loading={store.loading}
                items={store.items}
                itemsConfig={itemConfig}
                onItemClick={onItemClick}
                withFilter={true}
            >
                <Button
                    type='button'
                    iconName={AdminIcons.plus}
                    aria-label='Добавить подразделение'
                    onClick={() => navigate(`/${url}/new`)}
                >
                    Создать
                </Button>
            </Table>
        );
    };

    return (
        <Tabs place={"admin/employees"}>
            <Tab title={"Сотрудники"}>
                <Employees />
            </Tab>
            <Tab title={"Структурные подразделения"}>
                <Category />
            </Tab>
        </Tabs>
    );
};

export default AdminEmployeesPage;
