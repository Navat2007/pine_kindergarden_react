import React from "react";
import {Helmet} from "react-helmet";
import {motion} from "framer-motion";
import createDOMPurify from "dompurify";

import useFoodStore from "../../../store/public/foodsStore";
import useFoodMenuStore from "../../../store/public/foodMenuStore";

import BasicPage from "../../../components/public/basic.page/basic.page.component";

import "./food.scss";
import Food__image from "../../../images/food__image.jpg";
import SingleImageWithPreview from "../../../components/general/single_image_with_preview/single.image.with.preview";

const FoodPage = () => {
    const DOMPurify = createDOMPurify(window);

    const store = useFoodStore();
    const menuStore = useFoodMenuStore();

    const fetchData = async () => {
        await store.loadAll();
        await menuStore.loadAll();
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    React.useEffect(() => {
        console.log(menuStore.items);
    }, [store.items, menuStore.items]);

    return (
        <BasicPage loadings={[store, menuStore]}>
            <Helmet>
                <title>Питание</title>
            </Helmet>
            <motion.section
                className='food'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{delay: 0.2, duration: 1}}
            >
                <img
                    className='food__image'
                    src={Food__image}
                    loading='lazy'
                    alt='Изображение супа со слоненком из хлеба, обед в детском садике'
                />
                <h1 className='food__title'>Питание</h1>
                <div className='food__text'
                     dangerouslySetInnerHTML={{
                         __html: DOMPurify.sanitize(store.items.preview),
                     }}
                />
                <h2 className='food__title'>Меню</h2>
                {
                    menuStore.items.map((item) => {
                        return (
                            <li key={item.ID} className="documents__item section section_showed">
                                <SingleImageWithPreview image={item.image} extraClass={"documents__item-image"} />
                                <div className="documents__item-section">
                                    <h3 className="documents__item-title">{item.title}</h3>
                                    <div className="documents__item-text">
                                        <p>{item.text}</p>
                                    </div>
                                    <a className="documents__item-link" href={item.url} rel="noopener nofollow noreferrer" target={"_blank"}>Открыть</a>
                                </div>
                            </li>
                        )
                    })
                }
                <div className='food__text'
                     dangerouslySetInnerHTML={{
                         __html: DOMPurify.sanitize(store.items.text),
                     }}
                />
            </motion.section>
        </BasicPage>
    );
};

export default FoodPage;
