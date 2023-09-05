import React, { Fragment } from "react";
import _ from "lodash";
import Button from "../button/button.component";
import styles from "./pagination.module.scss";

const Pagination = ({
    pageCount,
    pageIndex = 1,
    minCount = 10,
    setPageChangeCallback = () => {},
}) => {
    const [page, setPage] = React.useState(1);

    const handlePageSelect = (pageIndex) => {
        setPageChangeCallback(pageIndex);
    };

    React.useEffect(() => {
        setPage(parseInt(pageIndex));
    }, [pageIndex]);

    if (pageCount <= 1) return null;

    const pages = _.range(1, pageCount + 1);

    return (
        <>
            {pageCount && (
                <div className={styles.pagin}>
                    <Button
                        type="button"
                        isIconBtn={true}
                        iconClass="mdi mdi-chevron-left"
                        theme="text"
                        extraClass={styles.thumb}
                        onClick={() => handlePageSelect(page - 1)}
                        aria-label="Назад"
                        disabled={page === 1}
                    />
                    <ul className={styles.list}>
                        {pages.map((item, index) => (
                            <Fragment key={item}>
                                {pageCount <= minCount && (
                                    <li
                                        className={`${styles.item} ${
                                            item === page
                                                ? styles.item_actived
                                                : ""
                                        }`}
                                        onClick={() => handlePageSelect(item)}
                                    >
                                        {item}
                                    </li>
                                )}
                                {pageCount > minCount && (
                                    <li
                                        className={`${styles.item} ${
                                            item === page
                                                ? styles.item_actived
                                                : ""
                                        } ${
                                            index !== 0 &&
                                            index !== pageCount - 1 &&
                                            (index < page - 2 || index > page)
                                                ? "--hide"
                                                : ""
                                        }`}
                                        onClick={() => handlePageSelect(item)}
                                    >
                                        {item}
                                    </li>
                                )}
                                {pageCount > minCount && index === 0 && (
                                    <li
                                        className={`${styles.item} ${
                                            page > 3 ? "" : "--hide"
                                        }`}
                                    >
                                        ...
                                    </li>
                                )}
                                {pageCount > minCount &&
                                    index === pageCount - 2 && (
                                        <li
                                            className={`${styles.item} ${
                                                page < pageCount - 2
                                                    ? ""
                                                    : "--hide"
                                            }`}
                                        >
                                            ...
                                        </li>
                                    )}
                            </Fragment>
                        ))}
                    </ul>
                    <Button
                        type="button"
                        isIconBtn={true}
                        iconClass="mdi mdi-chevron-right"
                        theme="text"
                        extraClass={styles.thumb}
                        onClick={() => handlePageSelect(page + 1)}
                        aria-label="Вперед"
                        disabled={page === pageCount}
                    />
                </div>
            )}
        </>
    );
};

export default Pagination;
