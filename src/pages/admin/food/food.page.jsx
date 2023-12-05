import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import useFoodMenuStore from "../../../store/admin/foodMenuStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import Button from "../../../components/admin/button/button.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";

import { AdminIcons } from "../../../components/svgs";

const AdminFoodPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const store = useFoodMenuStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
        };

        fetchData();
    }, []);

    const back = () => navigate("/admin/food");

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Питание. Меню ID: ${store.item.ID}`} onBack={back}>
                <Button
                    type='submit'
                    isIconBtn='true'
                    theme='text'
                    iconName={AdminIcons.edit}
                    aria-label='Редактировать'
                    onClick={() => navigate(`/admin/food/menu/edit/${id}`)}
                />
            </TitleBlock>
            <section className='admin-view-section'>
                <div className='admin-view-section__two-columns'>
                    <div className='admin-view-section__column'>
                        <h2 className='admin-view-section__title'>Основная информация</h2>
                        <ul className='admin-view-section__list'>
                            <li className='admin-view-section__item'>
                                <h3 className='admin-view-section__label'>Название</h3>
                                <p className='admin-view-section__description'>{store.item.title}</p>
                            </li>
                            <li className='admin-view-section__item'>
                                <h3 className='admin-view-section__label'>Описание</h3>
                                <p className='admin-view-section__description'>{store.item.text}</p>
                            </li>
                            <li className='admin-view-section__item'>
                                <h3 className='admin-view-section__label'>Ссылка на документ</h3>
                                <p className='admin-view-section__description'>
                                    <NavLink
                                        className='admin-view-section__link'
                                        to={store.item.url}
                                        target={"_blank"}
                                        rel='noopener nofollow noreferrer'
                                    >
                                        Открыть {AdminIcons.open_in_new}
                                    </NavLink>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className='admin-view-section__column'>
                        <h2 className='admin-view-section__title'>Картинка для превью документа</h2>
                        <ImageGallery
                            items={[
                                {
                                    url: store.item.image,
                                },
                            ]}
                            orientation={"portrait"}
                            front={false}
                        />
                    </div>
                </div>
            </section>
        </BasicPage>
    );
};

export default AdminFoodPage;
