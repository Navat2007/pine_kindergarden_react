import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import createDOMPurify from "dompurify";

import useFoodStore from "../../../store/public/foodsStore";
import useFoodMenuStore from "../../../store/public/foodMenuStore";

import SingleImageWithPreview from "../../../components/general/single.image.with.preview/single.image.with.preview";
import BasicPage from "../../../components/public/basic.page/basic.page.component";

import "./food.scss";
import Food__image from "../../../images/food__image.jpg";

const FoodPage = () => {
    const DOMPurify = createDOMPurify(window);

    const store = useFoodStore();
    const menuStore = useFoodMenuStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadAll();
            await menuStore.loadAll();
        };

        fetchData();
    }, []);

    return (
        <BasicPage loadings={[store, menuStore]}>
            <Helmet>
                <title>Питание</title>
            </Helmet>
            <motion.section
                className='food'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
            >
                <div className='food__two-columns'>
                    <div className='food__column'>
                        <h1 className='food__title'>Питание</h1>
                        <div
                            className='food__text'
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(store.items.preview),
                            }}
                        />
                    </div>
                    <div className='food__column'>
                        <img
                            className='food__image'
                            src={Food__image}
                            loading='lazy'
                            alt='Изображение супа со слоненком из хлеба, обед в детском садике'
                        />
                    </div>
                </div>
                <h2 className='food__title'>Меню</h2>
                <ul className='food__two-columns'>
                    {menuStore.items.map((item) => {
                        return (
                            <li key={item.ID} className='food-menu-card'>
                                <SingleImageWithPreview image={item.image} extraClass={"food-menu-card__image"} />
                                <div className='food-menu-card__section'>
                                    <h3 className='food-menu-card__title'>{item.title}</h3>
                                    <div className='food-menu-card__text'>
                                        <p>{item.text}</p>
                                    </div>
                                    <a
                                        className='food-menu-card__link'
                                        href={item.url}
                                        rel='noopener nofollow noreferrer'
                                        target={"_blank"}
                                    >
                                        Скачать
                                    </a>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div
                    className='food__text'
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(store.items.text),
                    }}
                />
            </motion.section>
        </BasicPage>
    );
};

export default FoodPage;
