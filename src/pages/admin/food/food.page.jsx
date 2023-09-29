import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useFoodMenuStore from "../../../store/admin/foodMenuStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import ImageSelector from "../../../components/general/image.selector/image.selector.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FieldUrl from "../../../components/admin/field/field.url.component";

import { AdminIcons } from "../../../components/svgs";
import FieldTextArea from "../../../components/admin/field/field.textarea.component";

const AdminFoodPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, getValues, setValue } = useForm();

    const store = useFoodMenuStore();

    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {
        await store.loadByID({ id });
    };

    React.useEffect(() => {
        reset();
        fetchData();
    }, [id]);

    const back = () => navigate("/admin/food");

    //Private component
    const Article = () => {
        const Create = () => {
            const [image, setImage] = React.useState([]);
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

                if (!sendObject.text) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Описание должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.url) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Ссылка на документ должна быть заполнена."}
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

                sendObject["image"] = image;

                if (!checkForComplete(sendObject)) return;

                setSending(true);

                const result = await store.add(sendObject);

                setSending(false);

                if (!result.error) {
                    setPopup(
                        <AlertPopup
                            title=''
                            text={"Меню успешно добавлено"}
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
                            <div className='admin-form__two-columns'>
                                <fieldset className='admin-form__section'>
                                    <h2 className='admin-form__title'>Основная информация</h2>
                                    <FieldText
                                        label={"Название*"}
                                        required={true}
                                        placeholder={"Введите название"}
                                        {...register("title")}
                                    />
                                    <FieldTextArea
                                        label={"Описание*"}
                                        required={true}
                                        placeholder={"Введите описание"}
                                        {...register("text")}
                                    />
                                    <FieldUrl
                                        label={"Ссылка на документ*"}
                                        required={true}
                                        withFileSelect={true}
                                        placeholder={"https://..."}
                                        {...register("url")}
                                        onFileSelected={(file) => {
                                            setValue("url", process.env.REACT_APP_BASE_URL + file.url);
                                        }}
                                    />
                                </fieldset>
                                <fieldset className='admin-form__section'>
                                    <h2 className='admin-form__title'>Картинка для превью документа</h2>
                                    <ImageSelector
                                        items={image}
                                        onlyOneFile={true}
                                        multiFiles={false}
                                        onChange={(items) => setImage(items)}
                                    />
                                </fieldset>
                            </div>
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
            const [image, setImage] = React.useState(
                store.item.image
                    ? [
                          {
                              ID: store.item.ID,
                              url: store.item.image,
                              main: 1,
                              order: 1,
                              isFile: 1,
                              isLoaded: 1,
                          },
                      ]
                    : []
            );
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            React.useEffect(() => {
                if (edit) {
                    setImage(
                        store.item.image
                            ? [
                                  {
                                      ID: store.item.ID,
                                      url: store.item.image,
                                      main: 1,
                                      order: 1,
                                      isFile: 1,
                                      isLoaded: 1,
                                  },
                              ]
                            : []
                    );
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

                if (!sendObject.text) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Описание должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.url) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Ссылка на документ должна быть заполнена."}
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
                sendObject["image"] = image;

                if (!checkForComplete(sendObject)) return;

                setSending(true);

                const result = await store.edit(sendObject);

                setSending(false);

                console.log(result);

                if (!result.error) {
                    setPopup(
                        <AlertPopup
                            title=''
                            text={"Меню успешно отредактировано"}
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
                                                    text={"Меню удалено"}
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

            const handleDeletePreviewPhoto = async (item) => {
                let sendObject = { ...item };

                sendObject["ID"] = id;

                const result = await store.removeFile(sendObject);
            };

            if (id && edit) {
                return (
                    <>
                        <TitleBlock title={`Редактирование ID: ${id}`} onBack={back} />
                        <form onSubmit={handleSubmit(onEdit)} className='admin-form'>
                            <div className='admin-form__two-columns'>
                                <fieldset className='admin-form__section'>
                                    <h2 className='admin-form__title'>Основная информация</h2>
                                    <FieldText
                                        label={"Название*"}
                                        required={true}
                                        placeholder={"Введите название"}
                                        {...register("title", {
                                            value: store.item.title,
                                        })}
                                    />
                                    <FieldTextArea
                                        label={"Описание*"}
                                        required={true}
                                        placeholder={"Введите описание"}
                                        {...register("text", {
                                            value: store.item.text,
                                        })}
                                    />
                                    <FieldUrl
                                        label={"Ссылка на документ*"}
                                        required={true}
                                        withFileSelect={true}
                                        placeholder={"https://..."}
                                        {...register("url", {
                                            value: store.item.url,
                                        })}
                                        onFileSelected={(file) => {
                                            setValue("url", process.env.REACT_APP_BASE_URL + file.url);
                                        }}
                                    />
                                </fieldset>
                                <fieldset className='admin-form__section'>
                                    <h2 className='admin-form__title'>Картинка для превью документа</h2>
                                    <ImageSelector
                                        items={image}
                                        onlyOneFile={true}
                                        multiFiles={false}
                                        orientation={"portrait"}
                                        onChange={(items) => setImage(items)}
                                        onDelete={handleDeletePreviewPhoto}
                                    />
                                </fieldset>
                            </div>
                            <div className='admin-form__controls'>
                                <Button type='submit' extraClass='admin-form__button' spinnerActive={sending}>
                                    Сохранить
                                </Button>
                                <Button
                                    type='button'
                                    extraClass='admin-form__button'
                                    theme='text'
                                    onClick={() => {
                                        setEdit(false);
                                    }}
                                    spinnerActive={sending}
                                >
                                    Отмена
                                </Button>
                                <Button
                                    type='button'
                                    iconName={AdminIcons.delete}
                                    theme='text-error'
                                    onClick={onDelete}
                                    spinnerActive={sending}
                                >
                                    Удалить
                                </Button>
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
                        <TitleBlock title={`Документ ID: ${store.item.ID}`} onBack={back}>
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
                                                    rel='noopener nofollow noreferer'
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

export default AdminFoodPage;
