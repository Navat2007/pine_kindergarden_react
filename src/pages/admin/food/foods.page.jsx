import React from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import createDOMPurify from "dompurify";

import useFoodAboutStore from "../../../store/admin/foodAboutStore";
import useFoodMenuStore from "../../../store/admin/foodMenuStore";
import useAuthStore from "../../../store/authStore";

import Table from "../../../components/admin/table/table.component";
import Button from "../../../components/admin/button/button.component";
import Tabs from "../../../components/general/tabs/tabs.component";
import Tab from "../../../components/general/tabs/tab.component";
import Editor from "../../../components/general/reach_editor/editor.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import TitleBlock from "../../../components/admin/title.block/title.block.component";

import { AdminIcons } from "../../../components/svgs";

const AdminFoodsPage = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const { handleSubmit, reset, control, setValue, getValues } = useForm();
    const DOMPurify = createDOMPurify(window);

    // Private component
    const FoodAbout = () => {
        const store = useFoodAboutStore();
        const [edit, setEdit] = React.useState(false);

        const fetchData = async () => {
            await store.load();
        };

        React.useEffect(() => {
            fetchData();
        }, [edit]);

        const Edit = () => {
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            React.useEffect(() => {
                if (edit) {
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

                setSending(true);

                const result = await store.edit(sendObject);

                setSending(false);

                console.log(result);

                if (!result.error) {
                    setPopup(
                        <AlertPopup
                            title=''
                            text={"Новость успешно отредактирована"}
                            opened={true}
                            onClose={() => {
                                setEdit(false)
                            }}
                        />
                    );
                } else {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={result.errorText}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                }
            };

            if (edit) {
                return (
                    <>
                        <TitleBlock title={`Редактирование основных сведений`} onBack={() => {setEdit(false)}} />
                        <form onSubmit={handleSubmit(onEdit)} className='admin-form'>
                            <fieldset className='admin-form__section'>
                                <p className='admin-form__subtitle'>Краткое описание</p>
                                <Editor
                                    control={control}
                                    name='preview'
                                    minHeight={250}
                                    buttons={{ link: true }}
                                />
                                <p className='admin-form__subtitle'>Детальное описание</p>
                                <Editor
                                    control={control}
                                    name='text'
                                    minHeight={250}
                                    buttons={{ link: true }}
                                />
                            </fieldset>
                            <div className='admin-form__controls'>
                                <Button type='submit' theme='primary' text='Сохранить' spinnerActive={sending} />
                                <Button
                                    type='button'
                                    theme='text'
                                    onClick={() => {
                                        setEdit(false);
                                    }}
                                    spinnerActive={sending}
                                >
                                    Отмена
                                </Button>
                            </div>
                        </form>
                        {popup}
                    </>
                );
            }
        };

        const View = () => {
            if (!edit && !store.loading) {
                return (
                    <>
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
                    </>
                );
            }
        };

        return (
            <>
                <Edit />
                <View />
            </>
        )
    }

    const Menu = () => {
        const store = useFoodMenuStore();

        const url = 'admin/food/menu';

        const onItemClick = (props) => {
            navigate(`/${url}/${props}`);
        };

        const fetchData = async () => {
            await store.loadAll();
        };

        React.useEffect(() => {
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

        return <Table
            title={`Таблица ${url} ${user.ID}`}
            loading={store.loading}
            items={store.items}
            itemsConfig={itemConfig}
            onItemClick={onItemClick}
            withFilter={true}
        >
            <Button
                type='button'
                iconName={AdminIcons.plus}
                aria-label='Добавить группу'
                onClick={() => navigate(`/${url}/new`)}
            >
                Создать
            </Button>
        </Table>
    }

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
