import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import createDOMPurify from "dompurify";
import { useForm } from "react-hook-form";
import moment from "moment";

import useNewsStore from "../../../store/admin/newsStore";

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

    const newsStore = useNewsStore();

    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {
        await newsStore.loadNews({ id });
    };

    React.useEffect(() => {
        fetchData();
    }, [id]);

    const back = () => navigate("/admin/news");

    //Private component
    const Loading = () => {
        if (newsStore.loading) {
            return <TitleBlock title={`Загрузка...`} />;
        }
    };

    const NotFound = () => {
        if (id && !newsStore.loading && Object.keys(newsStore.news).length === 0) {
            return <TitleBlock title={`Новость не найдена`} onBack={back} />;
        }
    };

    const Article = () => {
        const Create = () => {
            const [photo, setPhoto] = React.useState([]);
            const [photoPreview, setPhotoPreview] = React.useState([]);
            const [photoReview, setPhotoReview] = React.useState([]);
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            const checkForComplete = (sendObject) => {
                if (!sendObject.previewTitle) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Название для анонса должно быть заполнено."}
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

                if (sendObject.date === "") {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Дата должна быть заполнена."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.editorPreview || sendObject.editorPreview === "<p><br></p>") {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Описание для анонса должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.editorReview || sendObject.editorReview === "<p><br></p>") {
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

            const onAddNews = async (params) => {
                const data = getValues();

                let sendObject = { ...data };

                sendObject["previewImage"] = photoPreview;
                sendObject["reviewImage"] = photoReview;
                sendObject["images"] = photo;

                if (!checkForComplete(sendObject)) return;

                setSending(true);

                const result = await newsStore.addNews(sendObject);

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
                        <form onSubmit={handleSubmit(onAddNews)} className='admin-form'>
                            <fieldset className='admin-form__section admin-form__section_width_one-col'>
                                <FieldText
                                    label={"Название документа (кратко)*"}
                                    required={true}
                                    placeholder={"Введите название"}
                                    {...register("title")}
                                />
                                <FieldText
                                    label={"Название документа (полностью)*"}
                                    required={true}
                                    placeholder={"Введите название"}
                                    {...register("previewTitle")}
                                />
                                <h2 className='admin-form__title'>Картинка для превью документа</h2>
                                <ImageSelector
                                    items={photoPreview}
                                    onlyOneImage={true}
                                    multiFiles={false}
                                    onChange={(items) => setPhotoPreview(items)}
                                />
                                <FieldUrl
                                    label={"Ссылка на документ*"}
                                    required={true}
                                    placeholder={"https://..."}
                                    {...register("previewTitle")}
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
            const [photo, setPhoto] = React.useState([]);
            const [photoPreview, setPhotoPreview] = React.useState([]);
            const [photoReview, setPhotoReview] = React.useState([]);
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            React.useEffect(() => {
                if (edit) {
                    setValue("editorPreview", newsStore.news.preview_text);
                    setValue("editorReview", newsStore.news.text);

                    setPhotoPreview(
                        newsStore.news.preview_image
                            ? [
                                  {
                                      ID: newsStore.news.ID,
                                      url: newsStore.news.preview_image,
                                      main: 1,
                                      order: 1,
                                      isFile: 1,
                                      isLoaded: 1,
                                  },
                              ]
                            : []
                    );

                    setPhotoReview(
                        newsStore.news.image
                            ? [
                                  {
                                      ID: newsStore.news.ID,
                                      url: newsStore.news.image,
                                      main: 1,
                                      order: 1,
                                      isFile: 1,
                                      isLoaded: 1,
                                  },
                              ]
                            : []
                    );

                    setPhoto(newsStore.news.images ? newsStore.news.images : []);
                }
            }, [edit]);

            const checkForComplete = (sendObject) => {
                if (!sendObject.previewTitle) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Название для анонса должно быть заполнено."}
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

                if (sendObject.date === "") {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Дата должна быть заполнена."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.editorPreview || sendObject.editorPreview === "<p><br></p>") {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Описание для анонса должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.editorReview || sendObject.editorReview === "<p><br></p>") {
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

            const onEditNews = async (params) => {
                const data = getValues();

                let sendObject = { ...data };

                sendObject["id"] = id;
                sendObject["previewImage"] = photoPreview;
                sendObject["reviewImage"] = photoReview;
                sendObject["images"] = photo;

                if (!checkForComplete(sendObject)) return;

                setSending(true);

                const result = await newsStore.editNews(sendObject);

                setSending(false);

                console.log(result);

                if (!result.error) {
                    setPopup(
                        <AlertPopup
                            title=''
                            text={"Новость успешно отредактирована"}
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
                                        sendObject["archive"] = 1;

                                        const result = await newsStore.removeNews(sendObject);

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
                                    button
                                </Button>
                            </>
                        }
                    />
                );
            };

            const handleDeleteImages = async (item) => {
                let sendObject = { ...item };

                sendObject["place"] = "images";
                sendObject["newsID"] = id;

                const result = await newsStore.removeFile(sendObject);
            };

            const handleDeletePreviewPhoto = async (item) => {
                let sendObject = { ...item };

                sendObject["place"] = "preview";
                sendObject["newsID"] = id;

                const result = await newsStore.removeFile(sendObject);
            };

            const handleDeleteReviewPhoto = async (item) => {
                let sendObject = { ...item };

                sendObject["place"] = "review";
                sendObject["newsID"] = id;

                const result = await newsStore.removeFile(sendObject);
            };

            if (id && edit) {
                return (
                    <>
                        <TitleBlock title={`Редактирование ID: ${id}`} onBack={back} />
                        <form onSubmit={handleSubmit(onEditNews)} className='admin-form'>
                            <fieldset className='admin-form__section admin-form__section_width_one-col'>
                                <FieldText
                                    label={"Название документа (кратко)*"}
                                    required={true}
                                    placeholder={"Введите название"}
                                    {...register("title", {
                                        value: newsStore.news.title,
                                    })}
                                />
                                <FieldText
                                    label={"Название документа (полностью)*"}
                                    required={true}
                                    placeholder={"Введите название"}
                                    {...register("previewTitle", {
                                        value: newsStore.news.preview_title,
                                    })}
                                />
                                <h2 className='admin-form__title'>Картинка для превью документа</h2>
                                <ImageSelector
                                    items={photoPreview}
                                    onlyOneImage={true}
                                    multiFiles={false}
                                    onChange={(items) => setPhotoPreview(items)}
                                    onDelete={handleDeletePreviewPhoto}
                                />
                                <FieldUrl
                                    label={"Ссылка на документ*"}
                                    required={true}
                                    placeholder={"https://..."}
                                    {...register("previewTitle")}
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
            if (id && !edit && !newsStore.loading && Object.keys(newsStore.news).length > 0) {
                return (
                    <>
                        <TitleBlock title={`Документ ID: ${newsStore.news.ID}`} onBack={back}>
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
                                    <p className='admin-view-section__description'>{newsStore.news.preview_title}</p>
                                </li>
                                <li className='admin-view-section__item'>
                                    <h3 className='admin-view-section__label'>Название документа (полностью)</h3>
                                    <p className='admin-view-section__description'>{newsStore.news.title}</p>
                                </li>
                                <li className='admin-view-section__item'>
                                    <h3 className='admin-view-section__label'>Ссылка на документ</h3>
                                    <p className='admin-view-section__description'>
                                        <NavLink
                                            className='admin-view-section__link'
                                            to={"/news/" + id}
                                            target={"_blank"}
                                            rel='noopener nofollow noreferer'
                                        >
                                            На страницу {AdminIcons.open_in_new}
                                        </NavLink>
                                    </p>
                                </li>
                            </ul>
                            <h2 className='admin-view-section__title'>Картинка для превью документа</h2>
                            <ImageGallery
                                items={[
                                    {
                                        url: newsStore.news.preview_image,
                                    },
                                ]}
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
