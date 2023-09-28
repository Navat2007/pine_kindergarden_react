import React from "react";

import useMediaFilesStore from "../../../store/admin/mediaFilesStore";

import SearchFilter from "../search.filter/search.filter.component";
import ContextMenu from "../context.menu/context.menu.component";
import Button from "../button/button.component";

import "./file.selector.popup.scss";
import { AdminIcons, FileIcons } from "../../svgs";

const FileSelectorPopup = ({ onFileSelected }) => {
    const store = useMediaFilesStore();

    const [view, setView] = React.useState("list");

    const fetchData = async () => {
        await store.loadAll();
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const onContextItemClick = (props) => {
        if(props === 0){
            setView("list");
        }

        if(props === 1){
            setView("grid");
        }
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
    const contextMenu = [
        {
            title: "Список",
            icon: AdminIcons.view_list
        },
        {
            title: "Плитка",
            icon: AdminIcons.view_module
        }
    ]

    return (
        <div className='file-selector-popup'>
            <div className='file-selector-popup__search'>
                <SearchFilter config={itemConfig}>
                    <ContextMenu items={contextMenu} onItemClick={onContextItemClick}/>
                </SearchFilter>
            </div>
            {
                view === "list" &&
                <ol className='file-selector-popup__list'>
                    <li>
                        <article className='file-selector-popup-card file-selector-popup-card_active'>
                            {FileIcons.doc}
                            <p className='file-selector-popup-card__title'>пояснения.docx</p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            {FileIcons.pdf}
                            <p className='file-selector-popup-card__title'>пояснения.docx</p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            {FileIcons.xls}
                            <p className='file-selector-popup-card__title'>
                                Было бы странно обсуждать арии и музыку в разделе про доступность.xls
                            </p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            <img
                                className='file-selector-popup-card__image'
                                src='https://demotivation.ru/wp-content/uploads/2020/11/1553308805_fitnes_modeli_nike_ampquot_-_kartochka_polzovatelja_olgajarygina1992.jpg'
                            />
                            <p className='file-selector-popup-card__image-src'>
                                https://demotivation.ru/wp-content/uploads/2020/11/1553308805_fitnes_modeli_nike_ampquot_-_kartochka_polzovatelja_olgajarygina1992.jpg
                            </p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            {FileIcons.doc}
                            <p className='file-selector-popup-card__title'>пояснения.docx</p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            {FileIcons.pdf}
                            <p className='file-selector-popup-card__title'>пояснения.docx</p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            {FileIcons.xls}
                            <p className='file-selector-popup-card__title'>
                                Было бы странно обсуждать арии и музыку в разделе про доступность.xls
                            </p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            <img
                                className='file-selector-popup-card__image'
                                src='https://demotivation.ru/wp-content/uploads/2020/11/1553308805_fitnes_modeli_nike_ampquot_-_kartochka_polzovatelja_olgajarygina1992.jpg'
                            />
                            <p className='file-selector-popup-card__image-src'>
                                https://demotivation.ru/wp-content/uploads/2020/11/1553308805_fitnes_modeli_nike_ampquot_-_kartochka_polzovatelja_olgajarygina1992.jpg
                            </p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            {FileIcons.doc}
                            <p className='file-selector-popup-card__title'>пояснения.docx</p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            {FileIcons.pdf}
                            <p className='file-selector-popup-card__title'>пояснения.docx</p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            {FileIcons.xls}
                            <p className='file-selector-popup-card__title'>
                                Было бы странно обсуждать арии и музыку в разделе про доступность.xls
                            </p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            <img
                                className='file-selector-popup-card__image'
                                src='https://demotivation.ru/wp-content/uploads/2020/11/1553308805_fitnes_modeli_nike_ampquot_-_kartochka_polzovatelja_olgajarygina1992.jpg'
                            />
                            <p className='file-selector-popup-card__image-src'>
                                https://demotivation.ru/wp-content/uploads/2020/11/1553308805_fitnes_modeli_nike_ampquot_-_kartochka_polzovatelja_olgajarygina1992.jpg
                            </p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            {FileIcons.doc}
                            <p className='file-selector-popup-card__title'>пояснения.docx</p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            {FileIcons.pdf}
                            <p className='file-selector-popup-card__title'>пояснения.docx</p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            {FileIcons.xls}
                            <p className='file-selector-popup-card__title'>
                                Было бы странно обсуждать арии и музыку в разделе про доступность.xls
                            </p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            <img
                                className='file-selector-popup-card__image'
                                src='https://demotivation.ru/wp-content/uploads/2020/11/1553308805_fitnes_modeli_nike_ampquot_-_kartochka_polzovatelja_olgajarygina1992.jpg'
                            />
                            <p className='file-selector-popup-card__image-src'>
                                https://demotivation.ru/wp-content/uploads/2020/11/1553308805_fitnes_modeli_nike_ampquot_-_kartochka_polzovatelja_olgajarygina1992.jpg
                            </p>
                        </article>
                    </li>
                </ol>
            }
            {
                view === "grid" &&
                <ol className='file-selector-popup__list file-selector-popup__list_type_card-deck'>
                    <li>
                        <article className='file-selector-popup-card'>
                            {FileIcons.doc}
                            <p className='file-selector-popup-card__title'>пояснения.docx</p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            {FileIcons.pdf}
                            <p className='file-selector-popup-card__title'>пояснения.docx</p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            {FileIcons.xls}
                            <p className='file-selector-popup-card__title'>
                                Было бы странно обсуждать арии и музыку в разделе про доступность.xls
                            </p>
                        </article>
                    </li>
                    <li>
                        <article className='file-selector-popup-card'>
                            <img
                                className='file-selector-popup-card__image'
                                src='https://demotivation.ru/wp-content/uploads/2020/11/1553308805_fitnes_modeli_nike_ampquot_-_kartochka_polzovatelja_olgajarygina1992.jpg'
                            />
                        </article>
                    </li>
                </ol>
            }
            <div className='file-selector-popup__panel'>
                <Button type='button' theme='text'>
                    Отмена
                </Button>
                <Button type='button'>Выбрать</Button>
                <Button type='button' iconName={AdminIcons.upload} extraClass={"file-selector-popup__upload-button"}>
                    Загрузить
                </Button>
            </div>
        </div>
    );
};

export default FileSelectorPopup;
