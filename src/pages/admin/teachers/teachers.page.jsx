import React from "react";
import { useNavigate } from "react-router-dom";

import useNewsStore from "../../../store/admin/newsStore";
import useAuthStore from "../../../store/authStore";

import Table from "../../../components/admin/table/table.component";
import Button from "../../../components/admin/button/button.component";

import { AdminIcons } from "../../../components/svgs";

const AdminTeachersPage = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const newsStore = useNewsStore();

    const onItemClick = (props) => {
        navigate(`/admin/news/${props}`);
    };

    const fetchData = async () => {
        await newsStore.loadAll();
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
            header: "Название",
            key: "preview_title",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Дата",
            key: "date",
            type: "datetime",
            filter: "date",
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
        <Table
            title={"Таблица новостей администратора" + user.ID}
            loading={newsStore.loading}
            items={newsStore.items}
            itemsConfig={itemConfig}
            onItemClick={onItemClick}
            withFilter={true}
        >
            <Button
                type='button'
                iconName={AdminIcons.plus}
                aria-label='Добавить новость'
                onClick={() => navigate("/admin/item/new")}
            >
                Создать
            </Button>
        </Table>
    );
};

export default AdminTeachersPage;
