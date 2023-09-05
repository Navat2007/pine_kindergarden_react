import React from 'react';
import {useNavigate} from "react-router-dom";

import useNewsStore from "../../../store/admin/newsStore";
import useAuthStore from "../../../store/authStore";

import Table from "../../../components/table/table.component";
import Button from "../../../components/button/button.component";

const AdminAllNewsPage = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const newsStore = useNewsStore();

    const onItemClick = (props) => {
        navigate(`/admin/news/${props}`);
    };

    const fetchData = async () => {
        await newsStore.loadAllNews();
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
            items={newsStore.allNews}
            itemsConfig={itemConfig}
            onItemClick={onItemClick}
            withFilter={true}
        >
            <Button
                type="button"
                text="Создать"
                theme="primary"
                size="small"
                iconClass={"mdi mdi-plus"}
                aria-label="Добавить новость"
                onClick={() => navigate("/admin/news/new")}
            />
        </Table>
    );
};

export default AdminAllNewsPage;