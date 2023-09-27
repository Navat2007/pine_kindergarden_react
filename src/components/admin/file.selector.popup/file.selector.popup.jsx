import React from 'react';
import { useNavigate } from "react-router-dom";

import useMediaFilesStore from "../../../store/admin/mediaFilesStore";

import Button from "../button/button.component";
import Table from "../table/table.component";

import {AdminIcons} from "../../svgs";

const FileSelectorPopup = ({onFileSelected}) => {
    const store = useMediaFilesStore();
    const navigate = useNavigate();

    const url = "admin/mediaFiles";

    const fetchData = async () => {
        await store.loadAll();
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const onItemClick = (props) => {
        console.log(props);
    };

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
            key: "title",
            type: "string",
            filter: "string",
            sorting: true,
        },
        {
            header: "Тип файла",
            key: "type",
            type: "string",
            filter: "select",
            sorting: true,
        },
        {
            header: "Дата",
            key: "create_time",
            type: "datetime",
            filter: "date",
            sorting: true,
        },
    ];

    return (
        <Table
            title={`Таблица файлов popup`}
            loading={store.loading}
            items={store.items}
            itemsConfig={itemConfig}
            onItemClick={onItemClick}
            withFilter={true}
        >
            <Button
                type='button'
                iconName={AdminIcons.plus}
                aria-label='Добавить'
                onClick={() => navigate(`/${url}/new`)}
            >
                Создать
            </Button>
        </Table>
    );
};

export default FileSelectorPopup;