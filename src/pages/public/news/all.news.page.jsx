import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";
import lodash from "lodash";
import createDOMPurify from "dompurify";

import useNewsStore from "../../../store/public/newsStore";

import Skeleton from "react-loading-skeleton";
import SearchFilter from "../../../components/search_filter/search.filter.component";
import Pagination from "../../../components/pagination/pagination.component";
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs.component";

import styles from "./all.news.module.scss";
import commonStyles from "../common.module.scss";
import Cookies from "js-cookie";

const AllNewsPage = () => {
    const DOMPurify = createDOMPurify(window);

    const newsStore = useNewsStore();

    const fetchData = async () => {
        await newsStore.loadAllNews();
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    //Private components
    const MainBlock = () => {
        const pageSize = 9;

        const [filtered, setFiltered] = React.useState([]);
        const [startIndex, setStartIndex] = React.useState(0);
        const [pageIndex, setPageIndex] = React.useState(0);
        const [paginatedItems, setPaginatedItems] = React.useState([]);
        const [pageCount, setPageCount] = React.useState(
            newsStore.allNews ? Math.ceil(newsStore.allNews.length / pageSize) : 0
        );

        const itemConfig = [
            {
                header: "Название",
                key: "title",
                type: "string",
                filter: "string",
                sorting: true,
            },
            {
                header: "Дата",
                key: "date",
                type: "date",
                filter: "date",
                sorting: true,
            },
        ];

        React.useEffect(() => {
            setFiltered(newsStore.allNews);
        }, [newsStore.allNews]);

        React.useEffect(() => {
            setPageCount(Math.ceil(filtered.length / pageSize));
            setPaginatedItems(lodash(filtered).slice(startIndex).take(pageSize).value());
        }, [filtered, startIndex, pageSize]);

        React.useEffect(() => {
            if(Cookies.get("table_public_news"))
            {
                handleChangePage(parseInt(Cookies.get("table_public_news")));
            }
            else {
                handleChangePage(1);
            }
        }, []);

        const handleFilter = (filter) => {
            function checkItem(config, itemValue, filterValue, prop) {
                if (prop === "search_string") {
                    let tmpFilter = {};

                    for (const itemKey in itemValue)
                        if (itemValue[itemKey] !== null)
                            tmpFilter[itemKey] = !!itemValue[itemKey]
                                .toString()
                                .toLowerCase()
                                .includes(filterValue["search_string"].toLowerCase());

                    if (Object.keys(tmpFilter).some((key) => tmpFilter[key])) return true;
                }

                switch (config?.type) {
                    case "int":
                        return parseInt(itemValue[prop]) === parseInt(filterValue[prop]);

                    case "string":
                        return config.filter === "select" || config.filter === "multiselect"
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
                        return itemValue[prop].some((item) => item === filterValue[prop]);

                    default:
                        if (itemValue[prop]) return itemValue[prop] === filterValue[prop];
                        else return false;
                }
            }

            if (filter) {
                let tmpArray = [];

                for (const item of newsStore.allNews) {
                    let tmpFilter = {};

                    for (let prop in filter)
                        tmpFilter[prop] = !!(
                            filter[prop] === "" ||
                            filter[prop] === "Все" ||
                            checkItem(
                                itemConfig.find((itemConfig) => itemConfig.key === prop),
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
            } else setFiltered(newsStore.allNews);

            handleChangePage(1);
        };

        const handleChangePage = (index) => {
            setStartIndex((index - 1) * pageSize);
            setPageIndex(index);

            Cookies.set("table_public_news", index);
        };

        const News = ({ item }) => {
            const navigate = useNavigate();

            const handleItemClick = () => {
                navigate("/news/" + item.ID);
            };

            return (
                <li className={styles.card} onClick={handleItemClick}>
                    {item.preview_image && (
                        <img
                            className={styles.image}
                            src={
                                item.preview_image.includes("http")
                                    ? item.preview_image
                                    : process.env.REACT_APP_BASE_URL + item.preview_image
                            }
                            alt={item.preview_image}
                        />
                    )}
                    <p className={styles.date}>{moment(item.date).format("DD MMMM YYYY HH:mm")}</p>
                    <h3 className={styles.title}>{item.preview_title}</h3>
                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(item.preview_text),
                        }}
                    />
                </li>
            );
        };

        return (
            <section className={`${commonStyles.wrap} ${commonStyles.wrap_shadow}`}>
                {newsStore.loading && (
                    <>
                        <h2 className={`${commonStyles.title} ${commonStyles.title_underline}`}>Новости</h2>
                        <Skeleton height={66} />
                        <Skeleton width={"25vmax"} height={40} style={{ margin: "1.875em auto", display: "block" }} />
                        <ul className={styles.list}>
                            {Array(4)
                                .fill()
                                .map((item, index) => (
                                    <li className={styles.card} key={index}>
                                        <Skeleton className={styles.image} />
                                        <Skeleton className={styles.date} />
                                        <Skeleton className={styles.title} count={2} />
                                        <Skeleton className={styles.description} count={4} />
                                    </li>
                                ))}
                        </ul>
                        <Skeleton width={"25vmax"} height={40} style={{ margin: "1.875em auto", display: "block" }} />
                    </>
                )}
                {!newsStore.loading && newsStore.allNews.length > 0 && (
                    <>
                        <h2 className={`${commonStyles.title} ${commonStyles.title_underline}`}>Новости</h2>
                        <SearchFilter
                            front={true}
                            items={newsStore.allNews}
                            config={itemConfig}
                            onSubmit={handleFilter}
                        />
                        <Pagination pageCount={pageCount} pageIndex={pageIndex} setPageChangeCallback={handleChangePage} />
                        <ul className={styles.list}>
                            {paginatedItems.map((item, index) => (
                                <News key={index} item={item} />
                            ))}
                        </ul>
                        <Pagination pageCount={pageCount} pageIndex={pageIndex} setPageChangeCallback={handleChangePage} />
                    </>
                )}
                {!newsStore.loading && newsStore.allNews.length === 0 && (
                    <p className={commonStyles.subtitle}>
                        На сайте пока нет новостей, Вы можете вернуться{" "}
                        <NavLink className={commonStyles.link} to={"/"}>
                            на главную
                        </NavLink>
                    </p>
                )}
            </section>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Breadcrumbs
                items={[
                    {
                        title: "Главная",
                        url: "/",
                    },
                    {
                        title: "Новости",
                        url: "",
                    },
                ]}
            />
            <MainBlock />
        </motion.div>
    );
};

export default AllNewsPage;