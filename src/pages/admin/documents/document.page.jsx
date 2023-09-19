import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import createDOMPurify from "dompurify";
import { useForm } from "react-hook-form";

import useDocumentsStore from "../../../store/admin/documentsStore";

import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import ImageSelector from "../../../components/general/image.selector/image.selector.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FieldUrl from "../../../components/admin/field/field.url.component";
import { AdminIcons } from "../../../components/svgs";

const AdminDocumentPage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const DOMPurify = createDOMPurify(window);
    const { register, handleSubmit, reset, control, setValue, getValues } = useForm();

    const store = useDocumentsStore();

    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {
        await store.loadByID({ id });
    };

    React.useEffect(() => {
        fetchData();
    }, [id]);

    const back = () => navigate("/admin/documents");

    //Private component
    const Loading = () => {
        if (store.loading) {
            return <TitleBlock title={`Загрузка...`} />;
        }
    };

    const NotFound = () => {
        if (id && !store.loading && Object.keys(store.item).length === 0) {
            return <TitleBlock title={`Документ не найден`} onBack={back} />;
        }
    };

    const Article = () => {
        const Create = () => {
            const [image, setImage] = React.useState([]);
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            const checkForComplete = (sendObject) => {
                if (!sendObject.titleShort) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Краткое название должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

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
                            text={"Документ успешно добавлен"}
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
                                    label={"Название документа (кратко)*"}
                                    required={true}
                                    placeholder={"Введите название"}
                                    {...register("titleShort")}
                                />
                                <FieldText
                                    label={"Название документа (полностью)*"}
                                    required={true}
                                    placeholder={"Введите название"}
                                    {...register("title")}
                                />
                                <FieldUrl
                                    label={"Ссылка на документ*"}
                                    required={true}
                                    placeholder={"https://..."}
                                    {...register("url")}
                                />
                                <h2 className='admin-form__title'>Картинка для превью документа</h2>
                                <ImageSelector
                                    items={image}
                                    onlyOneImage={true}
                                    multiFiles={false}
                                    onChange={(items) => setImage(items)}
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
                if (!sendObject.titleShort) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Краткое название должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

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
                            text={"Документ успешно отредактирован"}
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
                                                    text={"Документ удален"}
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
                            <fieldset className='admin-form__section admin-form__section_width_one-col'>
                                <FieldText
                                    label={"Название документа (кратко)*"}
                                    required={true}
                                    placeholder={"Введите название"}
                                    {...register("titleShort", {
                                        value: store.item.titleShort,
                                    })}
                                />
                                <FieldText
                                    label={"Название документа (полностью)*"}
                                    required={true}
                                    placeholder={"Введите название"}
                                    {...register("title", {
                                        value: store.item.title,
                                    })}
                                />
                                <FieldUrl
                                    label={"Ссылка на документ*"}
                                    required={true}
                                    placeholder={"https://..."}
                                    {...register("url", {
                                        value: store.item.url,
                                    })}
                                />
                                <h2 className='admin-form__title'>Картинка для превью документа</h2>
                                <ImageSelector
                                    items={image}
                                    onlyOneImage={true}
                                    multiFiles={false}
                                    orientation={'portrait'}
                                    onChange={(items) => setImage(items)}
                                    onDelete={handleDeletePreviewPhoto}
                                />
                            </fieldset>
                            <div className='admin-form__controls'>
                                <Button type='submit' theme='primary' text='Сохранить' spinnerActive={sending} />
                                <Button type='button' theme='text' onClick={onDelete} spinnerActive={sending}>
                                    Удалить
                                </Button>
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
                            <ul className='admin-view-section__list'>
                                <li className='admin-view-section__item'>
                                    <h3 className='admin-view-section__label'>Название документа (кратко)</h3>
                                    <p className='admin-view-section__description'>{store.item.titleShort}</p>
                                </li>
                                <li className='admin-view-section__item'>
                                    <h3 className='admin-view-section__label'>Название документа (полностью)</h3>
                                    <p className='admin-view-section__description'>{store.item.title}</p>
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
                            <h2 className='admin-view-section__title'>Картинка для превью документа</h2>
                            <ImageGallery
                                items={[
                                    {
                                        url: store.item.image,
                                    },
                                ]}
                                orientation={'portrait'}
                                front={false}
                            />
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
        <>
            <Loading />
            <Article />
            <NotFound />
        </>
    );
};

export default AdminDocumentPage;
