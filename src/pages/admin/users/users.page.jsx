import React from "react";
import { useNavigate } from "react-router-dom";

import useUsersStore from "../../../store/admin/usersStore";
import useAuthStore from "../../../store/authStore";

import Tabs from "../../../components/general/tabs/tabs.component";
import Tab from "../../../components/general/tabs/tab.component";
import Table from "../../../components/general/table/table.component";
import Button from "../../../components/general/button/button.component";

const UsersPage = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const { admins, users, loadAdmins, loadUsers, loading } = useUsersStore();

    const onAdminItemClick = (props) => {
        navigate(`/admin/users/admin/${props}`);
    };

    const onUserItemClick = (props) => {
        navigate(`/admin/users/user/${props}`);
    };

    const fetchData = async () => {
        await loadAdmins();
        await loadUsers();
    };

    React.useEffect(() => {
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
            header: "Должность",
            key: "position",
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
    const userItemsConfig = [
        {
            header: "ID",
            key: "ID",
            type: "int",
            filter: "number",
            sorting: true,
        },
        {
            header: "Логин",
            key: "login",
            type: "string",
            filter: "string",
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
            header: "Телефон",
            key: "phone",
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
            header: "Школа",
            key: "org_name",
            type: "string",
            filter: "string",
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
            <Tabs>
                <Tab title={"Администраторы"}>
                    <Table
                        title={"Таблица администраторов администратора" + user.ID}
                        loading={loading.admins}
                        items={admins}
                        itemsConfig={adminItemsConfig}
                        onItemClick={onAdminItemClick}
                        withFilter={true}
                    >
                        <Button
                            type="button"
                            iconClass={"mdi mdi-plus"}
                            text="Создать"
                            size="small"
                            aria-label="Создать администратора"
                            onClick={() => navigate("/admin/users/admin/new")}
                        />
                    </Table>
                </Tab>
                <Tab title={"Пользователи"}>
                    <Table
                        title={"Таблица пользователей администратора" + user.ID}
                        loading={loading.users}
                        items={users}
                        itemsConfig={userItemsConfig}
                        pageSize={10}
                        onItemClick={onUserItemClick}
                        withFilter={true}
                    >
                        <Button
                            type="button"
                            iconClass={"mdi mdi-plus"}
                            text="Создать"
                            size="small"
                            aria-label="Создать пользователя"
                            onClick={() => navigate("/admin/users/user/new")}
                        />
                    </Table>
                </Tab>
            </Tabs>
        </>
    );
};

export default UsersPage;
