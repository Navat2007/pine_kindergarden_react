import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import createDOMPurify from "dompurify";
import moment from "moment";

import useNewsStore from "../../../store/admin/newsStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import Button from "../../../components/admin/button/button.component";
import Tabs from "../../../components/general/tabs/tabs.component";
import Tab from "../../../components/general/tabs/tab.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";

import { AdminIcons } from "../../../components/svgs";

const AdminNewsPage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const DOMPurify = createDOMPurify(window);
    const store = useNewsStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
        };

        fetchData();
    }, []);

    const back = () => navigate("/admin/news");

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Новость ID: ${store.item.ID}`} onBack={back}>
                <Button
                    type='submit'
                    isIconBtn='true'
                    theme='text'
                    iconName={AdminIcons.edit}
                    aria-label='Редактировать новость'
                    onClick={() => navigate(`/admin/news/edit/${id}`)}
                />
            </TitleBlock>
            <Tabs>
                <Tab title={"Основные сведения"}>
                    <section className='admin-view-section'>
                        <ul className='admin-view-section__list'>
                            <li className='admin-view-section__item'>
                                <h3 className='admin-view-section__label'>Доступна для показа?</h3>
                                <p className='admin-view-section__description'>
                                    {store.item.active === "Активен" ? "Да" : "Нет"}
                                </p>
                            </li>
                            <li className='admin-view-section__item'>
                                <h3 className='admin-view-section__label'>
                                    Показывать на главной странице?
                                </h3>
                                <p className='admin-view-section__description'>
                                    {store.item.show_on_main_page === "Активен" ? "Да" : "Нет"}
                                </p>
                            </li>
                            <li className='admin-view-section__item'>
                                <h3 className='admin-view-section__label'>Публичная страница</h3>
                                <p className='admin-view-section__description'>
                                    <NavLink
                                        className='admin-view-section__link'
                                        to={"/item/" + id}
                                        target={"_blank"}
                                        rel='noopener nofollow noreferrer'
                                    >
                                        На страницу {AdminIcons.open_in_new}
                                    </NavLink>
                                </p>
                            </li>
                            <li className='admin-view-section__item'>
                                <h3 className='admin-view-section__label'>Название новости для анонса</h3>
                                <p className='admin-view-section__description'>
                                    {store.item.preview_title}
                                </p>
                            </li>
                            <li className='admin-view-section__item'>
                                <h3 className='admin-view-section__label'>Название новости</h3>
                                <p className='admin-view-section__description'>{store.item.title}</p>
                            </li>
                            <li className='admin-view-section__item'>
                                <h3 className='admin-view-section__label'>Дата новости</h3>
                                <p className='admin-view-section__description'>
                                    {moment(store.item.date).format("DD MMMM YYYY HH:mm")}
                                </p>
                            </li>
                        </ul>
                        <h2 className='admin-view-section__title'>Описание для анонса</h2>
                        <div
                            className='admin-view-section__editor'
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(store.item.preview_text),
                            }}
                        />
                        <h2 className='admin-view-section__title'>Детальное описание</h2>
                        <div
                            className='admin-view-section__editor'
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(store.item.text),
                            }}
                        />
                    </section>
                </Tab>
                <Tab title={"Фотографии"}>
                    <h2 className='admin-view-section__title'>Картинка для анонса</h2>
                    <ImageGallery
                        items={[
                            {
                                url: store.item.preview_image,
                            },
                        ]}
                        front={false}
                    />
                    <h2 className='admin-view-section__title'>Детальная картинка</h2>
                    <ImageGallery
                        items={[
                            {
                                url: store.item.image,
                            },
                        ]}
                        front={false}
                    />
                    <h2 className='admin-view-section__title'>Фото галерея</h2>
                    <ImageGallery items={store.item.images} front={false} />
                </Tab>
            </Tabs>
        </BasicPage>
    );
};

export default AdminNewsPage;
