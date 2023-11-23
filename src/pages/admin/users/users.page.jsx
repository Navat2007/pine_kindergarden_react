import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import useUsersStore from "../../../store/admin/usersStore";
import {userStore} from "../../../store/userStore";

import Table from "../../../components/admin/table/table.component";
import Button from "../../../components/admin/button/button.component";

import { AdminIcons } from "../../../components/svgs.js";

const UsersPage = () => {
    const user = userStore.value;
    const navigate = useNavigate();

    const store = useUsersStore();

    const onAdminItemClick = (props) => {
        navigate(`/admin/users/edit/${props}`);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadAll();
        };

        fetchData();
    }, []);

    const adminItemsConfig = [
        {
            header: "ID",
            key: "ID",
            type: "int",
            filter: "number",
            sorting: true,
        },
        {
            header: "Email",
            key: "email",
            type: "string",
            filter: "string",
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
            header: "Роль",
            key: "role",
            type: "string",
            filter: "select",
            sorting: true,
        },
        {
            header: "Статус",
            key: "active",
            type: "string",
            filter: "select",
            sorting: true,
        },
    ];

    return (
        <>
            <Helmet>
                <title>Административный раздел. Пользователи</title>
            </Helmet>
            <Table
                title={"Таблица пользователи" + user.ID}
                loading={store.loading}
                items={store.items}
                itemsConfig={adminItemsConfig}
                onItemClick={onAdminItemClick}
                withFilter={true}
            >
                <Button
                    type='button'
                    iconName={AdminIcons.plus}
                    aria-label='Создать пользователя'
                    onClick={() => navigate("/admin/users/new")}
                >
                    Создать
                </Button>
            </Table>
        </>
    );
};

export default UsersPage;
