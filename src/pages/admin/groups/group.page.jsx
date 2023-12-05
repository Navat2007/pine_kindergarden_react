import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import createDOMPurify from "dompurify";

import useGroupsStore from "../../../store/admin/groupsStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import Button from "../../../components/admin/button/button.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import TeachersSlider from "../../../components/general/teachers.slider/teachers.slider";

import { AdminIcons } from "../../../components/svgs";

const AdminGroupPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const DOMPurify = createDOMPurify(window);

    const store = useGroupsStore();

    const back = () => navigate("/admin/groups");

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id },true);
        };

        fetchData();
    }, []);

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Группа ID: ${store.item.ID}`} onBack={back}>
                <Button
                    type='submit'
                    isIconBtn='true'
                    theme='text'
                    iconName={AdminIcons.edit}
                    aria-label='Редактировать'
                    onClick={() => navigate(`/admin/groups/edit/${id}`)}
                />
            </TitleBlock>
            <section className='admin-view-section'>
                <ul className='admin-view-section__list'>
                    <li className='admin-view-section__item'>
                        <h3 className='admin-view-section__label'>Публичная страница</h3>
                        <p className='admin-view-section__description'>
                            <NavLink
                                className='admin-view-section__link'
                                to={"/group/" + id}
                                target={"_blank"}
                                rel='noopener nofollow noreferrer'
                            >
                                На страницу {AdminIcons.open_in_new}
                            </NavLink>
                        </p>
                    </li>
                    <li className='admin-view-section__item'>
                        <h3 className='admin-view-section__label'>Название</h3>
                        <p className='admin-view-section__description'>{store.item.title}</p>
                    </li>
                    <li className='admin-view-section__item'>
                        <h3 className='admin-view-section__label'>Краткое описание</h3>
                        <p className='admin-view-section__description'>{store.item.preview}</p>
                    </li>
                </ul>
                <h2 className='admin-view-section__title'>Фотография</h2>
                <ImageGallery
                    items={[
                        {
                            url: store.item.image,
                        },
                    ]}
                    front={false}
                />
                {store.item?.employees?.length > 0 && (
                    <>
                        <h2 className='admin-view-section__title'>Воспитатели</h2>
                        <TeachersSlider
                            isBorderGradient={false}
                            type={"slide"}
                            items={store.item?.employees}
                        />
                    </>
                )}
                {
                    store.item?.text &&
                    <>
                        <h2 className='admin-view-section__title'>Детальное описание</h2>
                        <div
                            className='admin-view-section__editor'
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(store.item.text),
                            }}
                        />
                    </>
                }
            </section>
        </BasicPage>
    );
};

export default AdminGroupPage;