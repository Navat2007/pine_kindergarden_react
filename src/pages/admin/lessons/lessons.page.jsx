import React from "react";
import { useNavigate } from "react-router-dom";

import useNewsStore from "../../../store/admin/newsStore";
import useAuthStore from "../../../store/authStore";
import { Helmet } from "react-helmet";

import Table from "../../../components/admin/table/table.component";
import Button from "../../../components/admin/button/button.component";

import { AdminIcons } from "../../../components/svgs";

const AdminLessonsPage = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const newsStore = useNewsStore();

    const onItemClick = (props) => {
        navigate(`/admin/lessons/${props}`);
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
        <>
            <Helmet>
                <title>Административный раздел. Занятия</title>
            </Helmet>
            <Table
                title={"Таблица занятий " + user.ID}
                loading={newsStore.loading}
                items={newsStore.allNews}
                itemsConfig={itemConfig}
                onItemClick={onItemClick}
                withFilter={true}
            >
                <Button
                    type='button'
                    iconName={AdminIcons.plus}
                    aria-label='Добавить занятие'
                    onClick={() => navigate("/admin/lessons/new")}
                >
                    Создать
                </Button>
            </Table>
        </>
    );
};

export default AdminLessonsPage;
