import React, { Fragment } from "react";
import _ from "lodash";
import Button from "../../admin/button/button.component";
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
                <div className='pagination'>
                    <Button
                        type='button'
                        isIconBtn
                        iconName={AdminIcons.chevron_left}
                        theme='text'
                        extraClass='pagination__thumb'
                        onClick={() => handlePageSelect(page - 1)}
                        aria-label='Назад'
                        disabled={page === 1}
                    />
                    <ul className='pagination__list'>
                        {pages.map((item, index) => (
                            <Fragment key={item}>
                                {pageCount <= minCount && (
                                    <li
                                        className={`pagination__item ${
                                            item === page ? "pagination__item_actived" : ""
                                        }`}
                                        onClick={() => handlePageSelect(item)}
                                    >
                                        {item}
                                    </li>
                                )}
                                {pageCount > minCount && (
                                    <li
                                        className={`pagination__item ${
                                            item === page ? "pagination__item_actived" : ""
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
                                    <li className={`pagination__item ${page > 3 ? "" : "--hide"}`}>...</li>
                                )}
                                {pageCount > minCount && index === pageCount - 2 && (
                                    <li className={`pagination__item ${page < pageCount - 2 ? "" : "--hide"}`}>...</li>
                                )}
                            </Fragment>
                        ))}
                    </ul>
                    <Button
                        type='button'
                        isIconBtn
                        iconName={AdminIcons.chevron_right}
                        theme='text'
                        extraClass='pagination__thumb'
                        onClick={() => handlePageSelect(page + 1)}
                        aria-label='Вперед'
                        disabled={page === pageCount}
                    />
                </div>
            )}
        </>
    );
};

export default Pagination;
