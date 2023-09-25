import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useTeachersCategoriesStore from "../../../store/admin/teacherCategoriesStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldText from "../../../components/admin/field/field.text.component";

import { AdminIcons } from "../../../components/svgs";

const AdminCategoryTeachersPage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setValue, getValues } = useForm();

    const store = useTeachersCategoriesStore();

    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {
        await store.loadByID({ id });
    };

    React.useEffect(() => {
        reset();
        fetchData();
    }, [id]);

    const back = () => navigate("/admin/teachers");

    //Private component
    const Article = () => {
        const Create = () => {
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            const checkForComplete = (sendObject) => {
                if (!sendObject.title) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Название должно быть заполнено."}
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

            const onAdd = async (params) => {
                const data = getValues();

                let sendObject = { ...data };

                if (!checkForComplete(sendObject)) return;

                setSending(true);

                const result = await store.add(sendObject);

                setSending(false);

                if (!result.error) {
                    setPopup(
                        <AlertPopup
                            title=''
                            text={"Подразделение успешно добавлено"}
                            opened={true}
                            onClose={() => {
                                back();
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

            if (!id) {
                return (
                    <>
                        <TitleBlock title={"Создание"} onBack={back} />
                        <form onSubmit={handleSubmit(onAdd)} className='admin-form'>
                            <fieldset className='admin-form__section admin-form__section_width_one-col'>
                                <FieldText
                                    label={"Название*"}
                                    required={true}
                                    placeholder={"Введите название"}
                                    {...register("title")}
                                />
                            </fieldset>
                            <div className='admin-form__controls'>
                                <Button extraClass={"admin-form__button"} type='submit' spinnerActive={sending}>
                                    Сохранить
                                </Button>
                                <Button
                                    type='button'
                                    extraClass={"admin-form__button"}
                                    theme='text'
                                    onClick={back}
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

        const Edit = () => {
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            React.useEffect(() => {
                if (edit) {
                    setValue("text", store.item.text);
                }
            }, [edit]);

            const checkForComplete = (sendObject) => {
                if (!sendObject.title) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Название должно быть заполнено."}
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

            const onEdit = async (params) => {
                const data = getValues();

                let sendObject = { ...data };

                sendObject["id"] = id;

                if (!checkForComplete(sendObject)) return;

                setSending(true);

                const result = await store.edit(sendObject);

                setSending(false);

                console.log(result);

                if (!result.error) {
                    setPopup(
                        <AlertPopup
                            title=''
                            text={"Занятие успешно отредактирована"}
                            opened={true}
                            onClose={() => {
                                back();
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

            const onDelete = async () => {
                setPopup(
                    <AlertPopup
                        text={"Вы уверены что хотите удалить?"}
                        opened={true}
                        onClose={() => setPopup(<></>)}
                        buttons={
                            <>
                                <Button type='button' theme='text' onClick={() => setPopup(<></>)}>
                                    Нет
                                </Button>
                                <Button
                                    type='button'
                                    onClick={async () => {
                                        let sendObject = {};

                                        sendObject["id"] = id;

                                        const result = await store.remove(sendObject);

                                        if (!result.error) {
                                            setPopup(
                                                <AlertPopup
                                                    title=''
                                                    text={"Занятие удалено"}
                                                    opened={true}
                                                    onClose={() => {
                                                        setPopup(<></>);
                                                        back();
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
                                    }}
                                >
                                    Да
                                </Button>
                            </>
                        }
                    />
                );
            };

            if (id && edit) {
                return (
                    <>
                        <TitleBlock title={`Редактирование ID: ${id}`} onBack={back} />
                        <form onSubmit={handleSubmit(onEdit)} className='admin-form'>
                            <fieldset className='admin-form__section admin-form__section_width_one-col'>
                                <FieldText
                                    label={"Название*"}
                                    required={true}
                                    placeholder={"Введите название"}
                                    {...register("title", {
                                        value: store.item.title,
                                    })}
                                />
                            </fieldset>
                            <div className='admin-form__controls'>
                                <Button type='submit' theme='primary' text='Сохранить' spinnerActive={sending} />
                                <Button
                                    type='button'
                                    theme='text'
                                    text='Удалить'
                                    onClick={onDelete}
                                    spinnerActive={sending}
                                />
                                <Button
                                    type='button'
                                    theme='text'
                                    text='Отмена'
                                    onClick={() => {
                                        setEdit(false);
                                    }}
                                    spinnerActive={sending}
                                />
                            </div>
                        </form>
                        {popup}
                    </>
                );
            }
        };

        const View = () => {
            if (id && !edit && !store.loading && Object.keys(store.item).length > 0) {
                return (
                    <>
                        <TitleBlock title={`Подразделение ID: ${store.item.ID}`} onBack={back}>
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
                            <ul className='admin-view-section__list'>
                                <li className='admin-view-section__item'>
                                    <h3 className='admin-view-section__label'>Название</h3>
                                    <p className='admin-view-section__description'>{store.item.title}</p>
                                </li>
                            </ul>
                        </section>
                    </>
                );
            }
        };

        return (
            <>
                <Create />
                <Edit />
                <View />
            </>
        );
    };

    return (
        <BasicPage id={id} mainStore={store} loadings={[store]} back={back}>
            <Article />
        </BasicPage>
    );
};

export default AdminCategoryTeachersPage;
