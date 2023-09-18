import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import createDOMPurify from "dompurify";
import { useForm } from "react-hook-form";
import moment from "moment";

import useNewsStore from "../../../store/admin/newsStore";

import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import Tabs from "../../../components/general/tabs/tabs.component";
import Tab from "../../../components/general/tabs/tab.component";
import Editor from "../../../components/general/reach_editor/editor.component";
import ImageSelector from "../../../components/general/image.selector/image.selector.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldCheckbox from "../../../components/admin/field/field.checkbox.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FieldDate from "../../../components/admin/field/field.date.component";
import { AdminIcons } from "../../../components/svgs";

const AdminModePage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const DOMPurify = createDOMPurify(window);
    const { register, handleSubmit, reset, control, setValue, getValues } = useForm();

    const newsStore = useNewsStore();

    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {
        await newsStore.loadByID({ id });
    };

    React.useEffect(() => {
        fetchData();
    }, [id]);

    const back = () => navigate("/admin/item");

    //Private component
    const Loading = () => {
        if (newsStore.loading) {
            return <TitleBlock title={`Загрузка...`} />;
        }
    };

    const NotFound = () => {
        if (id && !newsStore.loading && Object.keys(newsStore.item).length === 0) {
            return <TitleBlock title={`Новость не найдена`} onBack={back} />;
        }
    };

    const MainBlock = () => {
        const NewNews = () => {
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

                const result = await newsStore.add(sendObject);

                setSending(false);

                if (!result.error) {
                    setPopup(
                        <AlertPopup
                            title=''
                            text={"Новость успешно добавлена"}
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
                        <TitleBlock title={"Создание новости"} onBack={back} />
                        <form onSubmit={handleSubmit(onAddNews)} className='admin-form'>
                            <Tabs>
                                <Tab title={"Основная информация"}>
                                    <fieldset className='admin-form__section admin-form__section_width_one-col'>
                                        <FieldCheckbox
                                            label={"Доступна для показа?"}
                                            {...register("active", {
                                                value: true,
                                            })}
                                        />
                                        <FieldCheckbox
                                            label={"Показывать на главной странице?"}
                                            {...register("mainPage")}
                                        />
                                        <FieldDate
                                            label='Дата и время'
                                            type='datetime-local'
                                            required={true}
                                            {...register("date")}
                                        />
                                    </fieldset>
                                    <fieldset className='admin-form__section'>
                                        <FieldText
                                            label={"Название новости*"}
                                            required={true}
                                            placeholder={"Введите название"}
                                            {...register("title")}
                                        />
                                        <FieldText
                                            label={"Название новости для анонса*"}
                                            required={true}
                                            placeholder={"Введите название"}
                                            {...register("previewTitle")}
                                        />
                                        <p className='admin-form__subtitle'>Описание для анонса</p>
                                        <Editor
                                            control={control}
                                            name='editorPreview'
                                            minHeight={250}
                                            buttons={{ link: true }}
                                        />
                                        <p className='admin-form__subtitle'>Детальное описание</p>
                                        <Editor
                                            control={control}
                                            name='editorReview'
                                            minHeight={250}
                                            buttons={{ link: true }}
                                        />
                                    </fieldset>
                                </Tab>
                                <Tab title={"Фотографии"}>
                                    <h2 className='admin-form__title'>Картинка для анонса</h2>
                                    <ImageSelector
                                        title='Картинка для анонса'
                                        items={photoPreview}
                                        onlyOneImage={true}
                                        multiFiles={false}
                                        onChange={(items) => setPhotoPreview(items)}
                                    />
                                    <h2 className='admin-form__title'>Детальная картинка</h2>
                                    <ImageSelector
                                        items={photoReview}
                                        onlyOneImage={true}
                                        multiFiles={false}
                                        onChange={(items) => setPhotoReview(items)}
                                    />
                                    <h2 className='admin-form__title'>Фото галерея</h2>
                                    <ImageSelector
                                        title='Фото галерея'
                                        items={photo}
                                        multiFiles={true}
                                        onChange={(items) => setPhoto(items)}
                                    />
                                </Tab>
                            </Tabs>
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

        const EditNews = () => {
            const [photo, setPhoto] = React.useState([]);
            const [photoPreview, setPhotoPreview] = React.useState([]);
            const [photoReview, setPhotoReview] = React.useState([]);
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            React.useEffect(() => {
                if (edit) {
                    setValue("editorPreview", newsStore.item.preview_text);
                    setValue("editorReview", newsStore.item.text);

                    setPhotoPreview(
                        newsStore.item.preview_image
                            ? [
                                  {
                                      ID: newsStore.item.ID,
                                      url: newsStore.item.preview_image,
                                      main: 1,
                                      order: 1,
                                      isFile: 1,
                                      isLoaded: 1,
                                  },
                              ]
                            : []
                    );

                    setPhotoReview(
                        newsStore.item.image
                            ? [
                                  {
                                      ID: newsStore.item.ID,
                                      url: newsStore.item.image,
                                      main: 1,
                                      order: 1,
                                      isFile: 1,
                                      isLoaded: 1,
                                  },
                              ]
                            : []
                    );

                    setPhoto(newsStore.item.images ? newsStore.item.images : []);
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

                const result = await newsStore.edit(sendObject);

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

                                        const result = await newsStore.remove(sendObject);

                                        if (!result.error) {
                                            setPopup(
                                                <AlertPopup
                                                    title=''
                                                    text={"Новость удалена"}
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
                        <TitleBlock title={`Редактирование новости ID: ${id}`} onBack={back} />
                        <form onSubmit={handleSubmit(onEditNews)} className='admin-form'>
                            <Tabs>
                                <Tab title={"Основная информация"}>
                                    <fieldset className='admin-form__section admin-form__section_width_one-col'>
                                        <FieldCheckbox
                                            label={"Доступна для показа?"}
                                            {...register("active", {
                                                value: newsStore.item.active === "Активен",
                                            })}
                                        />
                                        <FieldCheckbox
                                            label={"Показывать на главной странице?"}
                                            {...register("mainPage", {
                                                value: newsStore.item.show_on_main_page === "Активен",
                                            })}
                                        />
                                        <FieldDate
                                            label='Дата и время'
                                            type='datetime-local'
                                            required={true}
                                            {...register("date", {
                                                value: moment(newsStore.item.date).format("YYYY-MM-DD HH:mm"),
                                            })}
                                        />
                                    </fieldset>
                                    <fieldset className='admin-form__section'>
                                        <FieldText
                                            label={"Название новости*"}
                                            required={true}
                                            placeholder={"Введите название"}
                                            {...register("title", {
                                                value: newsStore.item.title,
                                            })}
                                        />
                                        <FieldText
                                            label={"Название новости для анонса*"}
                                            required={true}
                                            placeholder={"Введите название"}
                                            {...register("previewTitle", {
                                                value: newsStore.item.preview_title,
                                            })}
                                        />
                                        <p className='admin-form__subtitle'>Описание для анонса</p>
                                        <Editor
                                            control={control}
                                            name='editorPreview'
                                            minHeight={250}
                                            buttons={{ link: true }}
                                        />
                                        <p className='admin-form__subtitle'>Детальное описание</p>
                                        <Editor
                                            control={control}
                                            name='editorReview'
                                            minHeight={250}
                                            buttons={{ link: true }}
                                        />
                                    </fieldset>
                                </Tab>
                                <Tab title={"Фотографии"}>
                                    <h2 className='admin-form__title'>Картинка для анонса</h2>
                                    <ImageSelector
                                        items={photoPreview}
                                        onlyOneImage={true}
                                        multiFiles={false}
                                        onChange={(items) => setPhotoPreview(items)}
                                        onDelete={handleDeletePreviewPhoto}
                                    />
                                    <h2 className='admin-form__title'>Детальная картинка</h2>
                                    <ImageSelector
                                        items={photoReview}
                                        onlyOneImage={true}
                                        multiFiles={false}
                                        onChange={(items) => setPhotoReview(items)}
                                        onDelete={handleDeleteReviewPhoto}
                                    />
                                    <h2 className='Фото галерея'>Детальная картинка</h2>
                                    <ImageSelector
                                        items={photo}
                                        multiFiles={true}
                                        onChange={(items) => setPhoto(items)}
                                        onDelete={handleDeleteImages}
                                    />
                                </Tab>
                            </Tabs>
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

        const ViewNews = () => {
            if (id && !edit && !newsStore.loading && Object.keys(newsStore.item).length > 0) {
                return (
                    <>
                        <TitleBlock title={`Новость ID: ${newsStore.item.ID}`} onBack={back}>
                            <Button
                                type='submit'
                                isIconBtn='true'
                                theme='text'
                                iconName={AdminIcons.edit}
                                aria-label='Редактировать новость'
                                onClick={() => {
                                    setEdit(true);
                                }}
                            />
                        </TitleBlock>
                        <Tabs>
                            <Tab title={"Основные сведения"}>
                                <section className='admin-view-section'>
                                    <ul className='admin-view-section__list'>
                                        <li className='admin-view-section__item'>
                                            <h3 className='admin-view-section__label'>Доступна для показа?</h3>
                                            <p className='admin-view-section__description'>
                                                {newsStore.item.active === "Активен" ? "Да" : "Нет"}
                                            </p>
                                        </li>
                                        <li className='admin-view-section__item'>
                                            <h3 className='admin-view-section__label'>
                                                Показывать на главной странице?
                                            </h3>
                                            <p className='admin-view-section__description'>
                                                {newsStore.item.show_on_main_page === "Активен" ? "Да" : "Нет"}
                                            </p>
                                        </li>
                                        <li className='admin-view-section__item'>
                                            <h3 className='admin-view-section__label'>Публичная страница</h3>
                                            <p className='admin-view-section__description'>
                                                <NavLink
                                                    className='admin-view-section__link'
                                                    to={"/item/" + id}
                                                    target={"_blank"}
                                                    rel='noopener nofollow noreferer'
                                                >
                                                    На страницу {AdminIcons.open_in_new}
                                                </NavLink>
                                            </p>
                                        </li>
                                        <li className='admin-view-section__item'>
                                            <h3 className='admin-view-section__label'>Название новости для анонса</h3>
                                            <p className='admin-view-section__description'>
                                                {newsStore.item.preview_title}
                                            </p>
                                        </li>
                                        <li className='admin-view-section__item'>
                                            <h3 className='admin-view-section__label'>Название новости</h3>
                                            <p className='admin-view-section__description'>{newsStore.item.title}</p>
                                        </li>
                                        <li className='admin-view-section__item'>
                                            <h3 className='admin-view-section__label'>Дата новости</h3>
                                            <p className='admin-view-section__description'>
                                                {moment(newsStore.item.date).format("DD MMMM YYYY HH:mm")}
                                            </p>
                                        </li>
                                    </ul>
                                    <h2 className='admin-view-section__title'>Описание для анонса</h2>
                                    <div
                                        className='admin-view-section__editor'
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(newsStore.item.preview_text),
                                        }}
                                    />
                                    <h2 className='admin-view-section__title'>Детальное описание</h2>
                                    <div
                                        className='admin-view-section__editor'
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(newsStore.item.text),
                                        }}
                                    />
                                </section>
                            </Tab>
                            <Tab title={"Фотографии"}>
                                <h2 className='admin-view-section__title'>Картинка для анонса</h2>
                                <ImageGallery
                                    items={[
                                        {
                                            url: newsStore.item.preview_image,
                                        },
                                    ]}
                                    front={false}
                                />
                                <h2 className='admin-view-section__title'>Детальная картинка</h2>
                                <ImageGallery
                                    items={[
                                        {
                                            url: newsStore.item.image,
                                        },
                                    ]}
                                    front={false}
                                />
                                <h2 className='admin-view-section__title'>Фото галерея</h2>
                                <ImageGallery items={newsStore.item.images} front={false} />
                            </Tab>
                        </Tabs>
                    </>
                );
            }
        };

        return (
            <>
                <NewNews />
                <EditNews />
                <ViewNews />
            </>
        );
    };

    return (
        <>
            <Loading />
            <MainBlock />
            <NotFound />
        </>
    );
};

export default AdminModePage;
