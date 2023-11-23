import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import useMediaFilesStore from "../../../store/admin/mediaFilesStore";

import FileGallery from "../../../components/general/file.gallery/file.gallery.component";
import Button from "../../../components/admin/button/button.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";

import { AdminIcons } from "../../../components/svgs";

const AdminMediaFilePage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const store = useMediaFilesStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
        };

        fetchData();
    }, []);

    const back = () => navigate("/admin/mediaFiles");

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Файл ID: ${store.item.ID}`} onBack={back}>
                <Button
                    type='submit'
                    isIconBtn='true'
                    theme='text'
                    iconName={AdminIcons.edit}
                    aria-label='Редактировать'
                    onClick={() => navigate(`/admin/mediaFiles/edit/${id}`)}
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
                                        to={
                                            store.item?.url?.includes("http")
                                                ? store.item.url
                                                : process.env.REACT_APP_BASE_URL + store.item.url
                                        }
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
                        <h2 className='admin-view-section__title'>Файл</h2>
                        <FileGallery
                            items={[
                                {
                                    title: store.item.file_name,
                                    url: store.item.url,
                                    type: store.item.type,
                                    isFile: 1,
                                    isLoaded: 1,
                                    order: 1,
                                },
                            ]}
                            orientation={"portrait"}
                        />
                    </div>
                </div>
            </section>
        </BasicPage>
    );
};

export default AdminMediaFilePage;
