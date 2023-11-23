import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import createDOMPurify from "dompurify";

import useFoodAboutStore from "../../../store/admin/foodAboutStore";
import useFoodMenuStore from "../../../store/admin/foodMenuStore";
import {userStore} from "../../../store/userStore";

import Table from "../../../components/admin/table/table.component";
import Button from "../../../components/admin/button/button.component";
import Tabs from "../../../components/general/tabs/tabs.component";
import Tab from "../../../components/general/tabs/tab.component";
import Editor from "../../../components/general/reach.editor/editor.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import TitleBlock from "../../../components/admin/title.block/title.block.component";

import { AdminIcons } from "../../../components/svgs";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";

const AdminFoodsPage = () => {
    const navigate = useNavigate();

    // Private component
    const FoodAbout = () => {
        const [edit, setEdit] = React.useState(false);

        const Edit = () => {
            const store = useFoodAboutStore();
            const { handleSubmit, reset, control, setValue, getValues } = useForm();

            const [popup, setPopup] = React.useState(<></>);

            React.useEffect(() => {
                const fetchData = async () => {
                    await store.loadByID({id: 1});
                };

                if (edit) {
                    fetchData();
                    setValue("preview", store.item.preview);
                    setValue("text", store.item.text);
                }
            }, [edit]);

            const checkForComplete = (sendObject) => {
                if (!sendObject.preview || sendObject.preview === "<p><br></p>") {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Краткое описание должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.text || sendObject.text === "<p><br></p>") {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Детальное описание должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                return true;
            };

            const onEdit = async () => {
                const data = getValues();

                let sendObject = { ...data };

                if (!checkForComplete(sendObject)) return;

                await store.edit(sendObject);

                if (!store.error) {
                    setPopup(
                        <AlertPopup
                            title=''
                            text={"Информация о питании успешно отредактирована"}
                            opened={true}
                            onClose={() => {
                                setEdit(false);
                            }}
                        />
                    );
                } else {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={store.errorText}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                }
            };

            return (
                <BasicPage mainStore={store} loadings={[store]}>
                    <TitleBlock
                        title={`Редактирование основных сведений`}
                        onBack={() => {
                            setEdit(false);
                        }}
                    />
                    <form onSubmit={handleSubmit(onEdit)} className='admin-form'>
                        <fieldset className='admin-form__section'>
                            <p className='admin-form__subtitle'>Краткое описание</p>
                            <Editor control={control} name='preview' minHeight={250} buttons={{ link: true }} />
                            <p className='admin-form__subtitle'>Детальное описание</p>
                            <Editor control={control} name='text' minHeight={250} buttons={{ link: true }} />
                        </fieldset>
                        <div className='admin-form__controls'>
                            <Button type='submit' spinnerActive={store.sending}>
                                Сохранить
                            </Button>
                            <Button
                                type='button'
                                theme='text'
                                onClick={() => {
                                    setEdit(false);
                                }}
                                spinnerActive={store.sending}
                            >
                                Отмена
                            </Button>
                        </div>
                    </form>
                    {popup}
                </BasicPage>
            );
        };

        const View = () => {
            const store = useFoodAboutStore();
            const DOMPurify = createDOMPurify(window);

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
                                setEdit(true);
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

        if(edit)
            return <Edit />;

        return <View />;
    };

    const Menu = () => {
        const store = useFoodMenuStore();

        const url = "admin/food/menu";

        const onItemClick = (props) => {
            navigate(`/${url}/${props}`);
        };

        React.useEffect(() => {
            const fetchData = async () => {
                await store.loadAll();
            };

            fetchData();
        }, []);

        const itemConfig = [
            {
                header: "ID",
                key: "ID",
                type: "int",
                filter: "number",
                sorting: true,
            },
            {
                header: "Название",
                key: "title",
                type: "string",
                filter: "string",
                sorting: true,
            },
            {
                header: "Дата",
                key: "create_time",
                type: "datetime",
                filter: "date",
                sorting: true,
            },
        ];

        return (
            <Table
                title={`Таблица ${url} ${userStore.value.ID}`}
                loading={store.loading}
                items={store.items}
                itemsConfig={itemConfig}
                onItemClick={onItemClick}
                withFilter={true}
            >
                <Button
                    type='button'
                    iconName={AdminIcons.plus}
                    aria-label='Добавить'
                    onClick={() => navigate(`/${url}/new`)}
                >
                    Создать
                </Button>
            </Table>
        );
    };

    return (
        <Tabs place={"admin/about"}>
            <Tab title={"Основная информация"}>
                <FoodAbout />
            </Tab>
            <Tab title={"Меню"}>
                <Menu />
            </Tab>
        </Tabs>
    );
};

export default AdminFoodsPage;
