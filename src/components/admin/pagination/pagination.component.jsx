import React, { Fragment } from "react";
import _ from "lodash";
import "./pagination.scss";
import { AdminIcons } from "../../svgs";

const Pagination = ({ pageCount, pageIndex = 1, minCount = 10, setPageChangeCallback = () => {} }) => {
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
                <div className='admin-pagination'>
                    <button
                        type='button'
                        className='admin-pagination__thumb admin-pagination__item'
                        onClick={() => handlePageSelect(page - 1)}
                        aria-label='Назад'
                        disabled={page === 1}
                    >
                        <span className='admin-pagination__thumb-icon'>{AdminIcons.chevron_left}</span>
                    </button>
                    <ul className='admin-pagination__list'>
                        {pages.map((item, index) => (
                            <Fragment key={item}>
                                {pageCount <= minCount && (
                                    <li
                                        className={`admin-pagination__item ${
                                            item === page ? "admin-pagination__item_active" : ""
                                        }`}
                                        onClick={() => handlePageSelect(item)}
                                    >
                                        {item}
                                    </li>
                                )}
                                {pageCount > minCount && (
                                    <li
                                        className={`admin-pagination__item ${
                                            item === page ? "admin-pagination__item_active" : ""
                                        } ${
                                            index !== 0 && index !== pageCount - 1 && (index < page - 2 || index > page)
                                                ? "--hide"
                                                : ""
                                        }`}
                                        onClick={() => handlePageSelect(item)}
                                    >
                                        {item}
                                    </li>
                                )}
                                {pageCount > minCount && index === 0 && (
                                    <li className={`admin-pagination__item ${page > 3 ? "" : "--hide"}`}>...</li>
                                )}
                                {pageCount > minCount && index === pageCount - 2 && (
                                    <li className={`admin-pagination__item ${page < pageCount - 2 ? "" : "--hide"}`}>
                                        ...
                                    </li>
                                )}
                            </Fragment>
                        ))}
                    </ul>
                    <button
                        type='button'
                        className='admin-pagination__thumb admin-pagination__item'
                        onClick={() => handlePageSelect(page + 1)}
                        aria-label='Вперед'
                        disabled={page === pageCount}
                    >
                        <span className='admin-pagination__thumb-icon'>{AdminIcons.chevron_right}</span>
                    </button>
                </div>
            )}
        </>
    );
};

export default Pagination;
