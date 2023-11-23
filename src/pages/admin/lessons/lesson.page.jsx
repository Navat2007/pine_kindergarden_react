import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import createDOMPurify from "dompurify";

import useLessonsStore from "../../../store/admin/lessonsStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import Button from "../../../components/admin/button/button.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";

import { AdminIcons } from "../../../components/svgs";

const AdminLessonPage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const DOMPurify = createDOMPurify(window);

    const store = useLessonsStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
        };

        fetchData();
    }, []);

    const back = () => navigate("/admin/lessons");

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Занятие ID: ${store.item.ID}`} onBack={back}>
                <Button
                    type='submit'
                    isIconBtn='true'
                    theme='text'
                    iconName={AdminIcons.edit}
                    aria-label='Редактировать'
                    onClick={() => navigate(`/admin/lessons/edit/${id}`)}
                />
            </TitleBlock>
            <section className='admin-view-section'>
                <ul className='admin-view-section__list'>
                    <li className='admin-view-section__item'>
                        <h3 className='admin-view-section__label'>Публичная страница</h3>
                        <p className='admin-view-section__description'>
                            <NavLink
                                className='admin-view-section__link'
                                to={"/lesson/" + id}
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
                <h2 className='admin-view-section__title'>Детальное описание</h2>
                <div
                    className='admin-view-section__editor'
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(store.item.text),
                    }}
                />
            </section>
        </BasicPage>
    );
};

export default AdminLessonPage;
