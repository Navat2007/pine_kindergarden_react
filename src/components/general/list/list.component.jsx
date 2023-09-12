import React from 'react';
import {useNavigate} from "react-router-dom";

import SearchFilter from "../search_filter/search.filter.component";
import Button from "../button/button.component";

import styles from "../../pages/public/spectacles/spectacles.module.scss";

const List = ({withFilter, items, itemsConfig}) => {

    const navigate = useNavigate();

    return (
        <>
            <SearchFilter items={items} config={itemsConfig} />
            <ul className={styles.list}>
                {items.map((item, index) => (
                    <li key={window.global.makeid(12)}
                        className={[
                            'commonStyles.card',
                            'commonStyles.card_variant_detail_poster',
                        ].join(" ")}
                    >
                        <div className={'commonStyles.cardImage'}>
                            <img
                                src={item.src}
                                alt={item.title}
                            />
                        </div>
                        <div className={'commonStyles.cardMainText'}>
                            <h3 className={'commonStyles.cardTitle'}>
                                {item.title}
                            </h3>
                            <p className={'commonStyles.cardSubtitle'}>
                                {item.theatre} <br />
                                {item.school}
                            </p>
                            <p className={'commonStyles.cardDescription'}>
                                {item.description}
                            </p>
                        </div>
                        <div className={'commonStyles.cardAsside'}>
                            <p className={'commonStyles.cardDate'}>
                                {item.date}
                            </p>
                            <p className={'commonStyles.cardTiketInfo'}>

                            </p>
                            <Button
                                extraClass={'commonStyles.cardButton'}
                                type="button"
                                theme={"public_primary"}
                                text="Подробнее"
                                onClick={() => {
                                    navigate()
                                }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default List;