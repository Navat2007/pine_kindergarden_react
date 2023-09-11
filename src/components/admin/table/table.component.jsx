import React from "react";
import lodash from "lodash";
import Cookies from "js-cookie";
import moment from "moment";

import Pagination from "../pagination/pagination.component";
import SearchFilter from "../search.filter/search.filter.component";

import "./table.scss";
import { AdminIcons } from "../../svgs.js";

const Table = ({ children, title, itemsConfig, items, onItemClick, loading, withFilter = false, pageSize = 12 }) => {
    const [order, setOrder] = React.useState("ASC");
    const [sorted, setSorted] = React.useState([]);
    const [filtered, setFiltered] = React.useState([]);
    const [sortKey, setSortKey] = React.useState("");
    const [startIndex, setStartIndex] = React.useState(0);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [paginatedItems, setPaginatedItems] = React.useState([]);
    const [pageCount, setPageCount] = React.useState(items ? Math.ceil(items.length / pageSize) : 0);

    React.useEffect(() => {
        setFiltered(items);
    }, [items]);

    React.useEffect(() => {
        setPageCount(Math.ceil(filtered.length / pageSize));
        setPaginatedItems(
            lodash(sorted.length > 0 ? sorted : filtered)
                .slice(startIndex)
                .take(pageSize)
                .value()
        );
    }, [filtered, sorted, startIndex, pageSize]);

    React.useEffect(() => {
        if (Cookies.get("table_" + title)) {
            handleChangePage(Cookies.get("table_" + title));
        } else {
            handleChangePage(1);
        }
    }, []);

    if (loading) return <p>Загрузка...</p>;

    if (!items) return <p>Ошибка загрузки данных с сервера</p>;

    if (items.length > 0 && !("ID" in items[0])) {
        console.log(title, "ВНИМАНИЕ! В таблице нет ключа ID.");
    }

    const handleChangePage = (index) => {
        setStartIndex((index - 1) * pageSize);
        setPageIndex(index);

        Cookies.set("table_" + title, index);
    };

    const sorting = (key, type) => {
        if (order === "ASC") {
            const sorted = [...filtered].sort((a, b) => {
                if (!a[key] || !b[key]) return -1;

                switch (type) {
                    case "int":
                        return a[key] > b[key] ? 1 : -1;
                    case "string":
                        return a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1;
                    case "date":
                        return moment(a[key]).isAfter(moment(b[key])) ? 1 : -1;
                    default:
                        return a[key] > b[key] ? 1 : -1;
                }
            });

            setSorted(sorted);

            setOrder("DSC");
        } else {
            const sorted = [...filtered].sort((a, b) => {
                if (!a[key] || !b[key]) return -1;

                switch (type) {
                    case "int":
                        return a[key] < b[key] ? 1 : -1;
                    case "string":
                        return a[key].toLowerCase() < b[key].toLowerCase() ? 1 : -1;
                    case "date":
                        return moment(a[key]).isBefore(moment(b[key])) ? 1 : -1;
                    default:
                        return a[key] < b[key] ? 1 : -1;
                }
            });

            setSorted(sorted);

            setOrder("ASC");
        }
    };

    const getElementByType = (configItem, value) => {
        switch (configItem.type) {
            case "image":
                return value ? <img className='cell-image-logo' src={window.global.baseUrl + value} alt={""} /> : <></>;

            case "string":
                if (configItem.key === "status") {
                    switch (value) {
                        case "Новая":
                            return <p className='request-status --place-table --status-new'>Новая</p>;
                        case "Принята":
                            return <p className='request-status --place-table --status-accept'>Принята</p>;
                        case "Отклонена":
                        case "Удаление отклонено":
                            return <p className='request-status --place-table --status-decline'>Отклонена</p>;
                        case "Отозвана":
                            return <p className='request-status --place-table --status-callback'>Отозвана</p>;
                        case "Рассмотрение":
                            return <p className='request-status --place-table --status-review'>Рассмотрение</p>;
                        case "Удаление":
                            return <p className='request-status --status-decline'>Удаление</p>;
                        default:
                            return <>{value}</>;
                    }
                }

                return <>{value}</>;

            case "date":
                return <>{moment(value).format("DD.MM.YYYY")}</>;

            case "datetime":
                return <>{moment(value).format("DD.MM.YYYY HH:mm")}</>;

            case "array":
                return (
                    <ul>
                        {value.map((item, index) => (
                            <li key={index}>{item[configItem.arrayKey]}</li>
                        ))}
                    </ul>
                );

            default:
                return <>{value}</>;
        }
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

            return false;
        }

        setSorted([]);
        setOrder("ASC");
        setSortKey("");

        if (filter) {
            let tmpArray = [];

            for (const item of items) {
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
        } else setFiltered(items);

        handleChangePage(1);
    };

    return (
        <>
            {withFilter && (
                <SearchFilter config={itemsConfig} onSubmit={filterCallback} items={items}>
                    {children}
                </SearchFilter>
            )}
            {filtered && filtered.length === 0 && <p>Нет данных для отображения</p>}
            {filtered && filtered.length > 0 && (
                <>
                    <Pagination pageCount={pageCount} pageIndex={pageIndex} setPageChangeCallback={handleChangePage} />
                    <div className='admin-table'>
                        <div className='admin-table__container'>
                            <table className='admin-table__table'>
                                <thead>
                                    <tr className='admin-table__row'>
                                        {itemsConfig.map(
                                            (item) =>
                                                !item.hide && (
                                                    <th className='admin-table__cell-heading' key={item.header}>
                                                        <p
                                                            className={`${"sorting" in item ? "cell-sorting" : ""} ${
                                                                sortKey === item.key && "cell-sorting_active"
                                                            }`}
                                                            aria-label='Сортировать по возрастанию'
                                                            onClick={() => {
                                                                if ("sorting" in item) {
                                                                    setSortKey(item.key);
                                                                    sorting(item.key, item.type);
                                                                }
                                                            }}
                                                        >
                                                            {item.sorting && (
                                                                <>
                                                                    {sortKey === item.key && order === "ASC"
                                                                        ? AdminIcons.ascending
                                                                        : AdminIcons.descending}
                                                                </>
                                                            )}

                                                            {item.header}
                                                        </p>
                                                    </th>
                                                )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedItems.map((item) => (
                                        <tr
                                            className={`admin-table__row admin-table__row_hover`}
                                            key={item.ID}
                                            onClick={() => onItemClick && onItemClick(item.ID)}
                                        >
                                            {itemsConfig.map(
                                                (itemKey) =>
                                                    !itemKey.hide && (
                                                        <td className={"admin-table__cell"} key={itemKey.key}>
                                                            {getElementByType(itemKey, item[itemKey.key])}
                                                        </td>
                                                    )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Table;
