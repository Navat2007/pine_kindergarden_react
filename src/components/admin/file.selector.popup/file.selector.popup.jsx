import React from "react";
import moment from "moment";

import useMediaFilesStore from "../../../store/admin/mediaFilesStore";

import withSupportDoubleClick from "../../../hook/withSupportDoubleClick";
import SearchFilter from "../search.filter/search.filter.component";
import ContextMenu from "../context.menu/context.menu.component";
import Button from "../button/button.component";
import Popup from "../../general/popup/popup.component";
import AlertPopup from "../../general/alert.popup/alert.popup";

import "./file.selector.popup.scss";
import {AdminIcons, FileIcons} from "../../svgs";

const FileSelectorPopup = ({ onFileSelected = () => {}, onClose = () => {}, accept = "*.*", maxFileSize = 5 }) => {
    const store = useMediaFilesStore();

    const inputFileRef = React.createRef();

    const [inputKey, setInputKey] = React.useState("");
    const [view, setView] = React.useState("list");
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [order, setOrder] = React.useState("ASC");
    const [sorted, setSorted] = React.useState([]);
    const [filtered, setFiltered] = React.useState([]);
    const [sortKey, setSortKey] = React.useState("");
    const [notif, setNotif] = React.useState(<></>);

    const itemsConfig = [
        {
            header: "ID",
            key: "ID",
            type: "int",
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
            icon: AdminIcons.view_list,
        },
        {
            title: "Плитка",
            icon: AdminIcons.view_module,
        },
    ];

    const fetchData = async () => {
        await store.loadAll();
    };

    React.useEffect(() => {
        setFiltered(store.items);
    }, [store.items]);

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleClick = withSupportDoubleClick({
        onDoubleClick: (e, data) => {
            onFileSelected(data);
            onClose();
        },
        onSingleClick: (e, data) => {
            setSelectedFile(data);
        },
    });

    const handleAddFile = async (e) => {
        const getFileType = (data) => {
            switch (data.type) {
                case "image/jpeg":
                case "image/png":
                case "image/gif":
                    return "image";

                case "application/pdf":
                    return "pdf";

                case "application/msword":
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    return "doc";

                case "application/vnd.ms-excel":
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    return "xls";

                case "application/vnd.ms-powerpoint":
                case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                    return "ppt";

                case "application/vnd.oasis.opendocument.text":
                    return "odt";

                case "application/vnd.oasis.opendocument.spreadsheet":
                    return "ods";

                case "application/vnd.oasis.opendocument.presentation":
                    return "odp";

                default:
                    return "other";
            }
        };

        async function readFileAsDataURL(file) {
            return await new Promise((resolve) => {
                let fileReader = new FileReader();
                fileReader.onload = (e) => resolve(fileReader.result);
                fileReader.readAsDataURL(file);
            });
        }

        let errorFiles = [];

        let match = accept.split(",").join("|");

        for (const file of e.target.files) {
            if (accept === "*.*" || file.type.match(match)) {
                if (file.size <= maxFileSize * 1000000) {
                } else {
                    errorFiles.push({
                        title: file.name,
                        text: "Файл больше " + maxFileSize + " Мб.",
                    });
                    continue;
                }
            } else {
                errorFiles.push({
                    title: file.name,
                    text: "Файл должен быть изображением.",
                });
                continue;
            }

            const url = await readFileAsDataURL(file);

            let sendObject = {
                title: file.name,
                type: getFileType(file),
                text: "",
                file: [
                    {
                        file: file,
                        url: url,
                        isFile: 1,
                        isLoaded: 0,
                        title: file.name,
                        type: getFileType(file),
                    },
                ],
            };

            await store.add(sendObject);

            if (store.error) {
                setNotif(
                    <AlertPopup
                        title='Ошибка'
                        text={store.errorText}
                        opened={true}
                        onClose={() => {
                            setNotif(<></>);
                        }}
                    />
                );
            }
        }

        if (errorFiles.length > 0) {
            setNotif(
                <Popup opened={true} onClose={() => setNotif(<></>)} title={"Ошибка загрузки файлов"}>
                    <div className='admin-image-alert'>
                        <h3 className={`admin-image-alert__caption`}>
                            {AdminIcons.error} Не удалось добавить следующие файлы:
                        </h3>
                        <ol className={`admin-image-alert__list`}>
                            {errorFiles.map((error) => (
                                <li className='admin-image-alert__item' key={error.title}>
                                    <p className={`admin-image-alert__text`}>
                                        {error.title}{" "}
                                        <span className={`admin-image-alert__error-span`}>{error.text}</span>
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </Popup>
            );
        }

        setInputKey(window.global.makeid(30));

        await fetchData();
    };

    const filterCallback = (filter) => {
        function checkItem(config, itemValue, filterValue, prop) {
            if (prop === "search_string") {
                let tmpFilter = {};

                for (const itemKey in itemValue) {
                    if (itemValue[itemKey] !== null) {
                        tmpFilter[itemKey] = !!itemValue[itemKey]
                            .toString()
                            .toLowerCase()
                            .includes(filterValue["search_string"].toLowerCase());
                    }
                }

                if (Object.keys(tmpFilter).some((key) => tmpFilter[key])) return true;
            }

            switch (config?.type) {
                case "int":
                    return parseInt(itemValue[prop]) === parseInt(filterValue[prop]);

                case "string":
                    return config.filter === "select"
                        ? itemValue[prop] === filterValue[prop]
                        : itemValue[prop].toLowerCase().includes(filterValue[prop].toLowerCase());

                case "date":
                    if ("linkKey" in config) {
                        if ("dateFilter" in config && config.dateFilter === "to")
                            return moment(itemValue[config["linkKey"]]).isBefore(moment(filterValue[prop]));
                        if ("dateFilter" in config && config.dateFilter === "from")
                            return moment(itemValue[config["linkKey"]]).isAfter(moment(filterValue[prop]));
                    }

                    const date = moment(itemValue[prop]);

                    return moment(
                        `${date.year()}-${
                            date.month() <= 9 ? "0" + (date.month() + 1) : date.month() + 1
                        }-${date.date()}`
                    ).isSame(moment(filterValue[prop]));

                case "datetime":
                    if ("linkKey" in config) {
                        if ("dateFilter" in config && config.dateFilter === "to")
                            return moment(itemValue[config["linkKey"]]).isBefore(moment(filterValue[prop]));
                        if ("dateFilter" in config && config.dateFilter === "from")
                            return moment(itemValue[config["linkKey"]]).isAfter(moment(filterValue[prop]));
                    }

                    const itemDate = moment(itemValue[prop]);
                    return moment({
                        year: itemDate.get("year"),
                        month: itemDate.get("month"),
                        day: itemDate.get("date"),
                    }).isSame(moment(filterValue[prop]));

                case "array":
                    return itemValue[prop].some((item) =>
                        item[config.arrayKey].toLowerCase().includes(filterValue[prop].toLowerCase())
                    );

                default:
                    if (itemValue[prop]) return itemValue[prop] === filterValue[prop];
                    else return false;
            }
        }

        setSorted([]);
        setOrder("ASC");
        setSortKey("");

        if (filter) {
            let tmpArray = [];

            for (const item of store.items) {
                let tmpFilter = {};

                for (let prop in filter)
                    tmpFilter[prop] = !!(
                        filter[prop] === "" ||
                        filter[prop] === "Все" ||
                        checkItem(
                            itemsConfig.find((itemConfig) => itemConfig.key === prop),
                            item,
                            filter,
                            prop
                        )
                    );

                if (!Object.keys(tmpFilter).some((key) => !tmpFilter[key])) {
                    tmpArray.push(item);
                }
            }

            setFiltered(tmpArray);
        } else setFiltered(store.items);
    };

    const onContextItemClick = (props) => {
        if (props === 0) {
            setView("list");
        }

        if (props === 1) {
            setView("grid");
        }
    };

    const getFileIcon = (type) => {
        switch (type) {
            case "doc":
                return FileIcons.doc;
            case "pdf":
                return FileIcons.pdf;
            case "xls":
                return FileIcons.xls;
            default:
                return FileIcons.default;
        }
    };

    return (
        <div className='file-selector-popup'>
            <SearchFilter config={itemsConfig} items={store.items} onSubmit={filterCallback}>
                <ContextMenu items={contextMenu} onItemClick={onContextItemClick} />
            </SearchFilter>
            <ol
                className={`file-selector-popup__list${
                    view === "grid" ? ` file-selector-popup__list_type_card-deck` : ``
                }`}
            >
                {filtered && filtered
                    .filter((item) => {
                        if(accept === "image/*" && item.type === "image")
                            return true;

                        if(accept === "*.*")
                            return true;
                    })
                    .length === 0 && <p>Нет файлов</p>}
                {filtered &&
                    filtered.length > 0 &&
                    filtered
                        .filter((item) => {
                            if(accept === "image/*" && item.type === "image")
                                return true;

                            if(accept === "*.*")
                                return true;
                        })
                        .map((item) => {
                        return (
                            <li
                                key={item.ID}
                                onClick={(e) => {
                                    handleClick(e, item);
                                }}
                            >
                                {
                                    item.type === "image"
                                    ?
                                        <article className={`file-selector-popup-card${
                                            selectedFile?.ID === item.ID ? ` file-selector-popup-card_active` : ``
                                        }`}>
                                            <img
                                                className='file-selector-popup-card__image'
                                                src={process.env.REACT_APP_BASE_URL + item.url}
                                                alt={item.title}
                                            />
                                            <p className='file-selector-popup-card__image-src'>
                                                {item.title}
                                            </p>
                                        </article>
                                        :
                                        <article
                                            className={`file-selector-popup-card${
                                                selectedFile?.ID === item.ID ? ` file-selector-popup-card_active` : ``
                                            }`}
                                        >
                                            {getFileIcon(item.type)}
                                            <p className='file-selector-popup-card__title'>
                                                {item.title}
                                                {item.title !== item.file_name && ` (${item.file_name})`}
                                            </p>
                                        </article>
                                }
                            </li>
                        );
                    })}
            </ol>
            <div className='file-selector-popup__panel'>
                <Button type='button' theme='text' onClick={onClose} spinnerActive={store.loading}>
                    Отмена
                </Button>
                <Button
                    type='button'
                    onClick={() => {
                        onFileSelected(selectedFile);
                        onClose();
                    }}
                    spinnerActive={store.loading}
                >
                    Выбрать
                </Button>
                <Button
                    type='button'
                    iconName={AdminIcons.upload}
                    extraClass={"file-selector-popup__upload-button"}
                    onClick={() => inputFileRef.current.click()}
                    spinnerActive={store.loading}
                >
                    Загрузить
                </Button>
                <input
                    ref={inputFileRef}
                    key={inputKey}
                    onChange={handleAddFile}
                    hidden={true}
                    type='file'
                    accept={accept}
                    multiple={true}
                    size={maxFileSize}
                />
            </div>
            {notif}
        </div>
    );
};

export default FileSelectorPopup;
