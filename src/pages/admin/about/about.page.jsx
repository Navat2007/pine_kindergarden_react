import React from "react";
import { useNavigate } from "react-router-dom";
import createDOMPurify from "dompurify";

import useAboutStore from "../../../store/admin/aboutStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import Button from "../../../components/admin/button/button.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";

import { AdminIcons } from "../../../components/svgs";

const AdminAboutPage = () => {
    const navigate = useNavigate();
    const DOMPurify = createDOMPurify(window);
    const store = useAboutStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({id: 1});
        };

        fetchData();
    }, []);

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Основные сведения`}>
                <Button
                    type='submit'
                    isIconBtn='true'
                    theme='text'
                    iconName={AdminIcons.edit}
                    aria-label='Редактировать'
                    onClick={() => {
                        navigate("/admin/about/edit");
                    }}
                />
            </TitleBlock>
            <section className='admin-view-section'>
                <h2 className='admin-view-section__title'>Краткое описание</h2>
                <div
                    className='admin-view-section__editor'
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(store.item.preview),
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
        </BasicPage>
    );
};

export default AdminAboutPage;
