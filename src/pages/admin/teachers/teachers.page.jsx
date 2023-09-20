import React from "react";
import {useNavigate} from "react-router-dom";

import useTeachersStore from "../../../store/admin/teachersStore";
import useTeachersCategoriesStore from "../../../store/admin/teacherCategoriesStore";
import useAuthStore from "../../../store/authStore";

import Table from "../../../components/admin/table/table.component";
import Button from "../../../components/admin/button/button.component";

import {AdminIcons} from "../../../components/svgs";
import Tab from "../../../components/general/tabs/tab.component";
import Tabs from "../../../components/general/tabs/tabs.component";

const AdminTeachersPage = () => {
    const {user} = useAuthStore();
    const navigate = useNavigate();

    //Private components
    const Teachers = () => {
        const store = useTeachersStore();

        const url = 'admin/teachers';

        const onItemClick = (props) => {
            navigate(`/${url}/${props}`);
        };

        const fetchData = async () => {
            await store.loadAll();
        };

        React.useEffect(() => {
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
                title={`Таблица ${url} ${user.ID}`}
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

        const url = 'admin/teachers/category';

        const onItemClick = (props) => {
            navigate(`/${url}/${props}`);
        };

        const fetchData = async () => {
            await store.loadAll();
        };

        React.useEffect(() => {
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
        ];

        return (
            <Table
                title={`Таблица ${url} ${user.ID}`}
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
        <Tabs>
            <Tab title={"Педагоги"}>
                <Teachers/>
            </Tab>
            <Tab title={"Структурные подразделения"}>
                <Category/>
            </Tab>
        </Tabs>
    );
};

export default AdminTeachersPage;
