import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import createDOMPurify from "dompurify";
import { useForm } from "react-hook-form";
import moment from "moment";

import useNewsStore from "../../../store/admin/newsStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import Tabs from "../../../components/general/tabs/tabs.component";
import Tab from "../../../components/general/tabs/tab.component";
import Editor from "../../../components/general/reach.editor/editor.component";
import ImageSelector from "../../../components/general/image.selector/image.selector.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldCheckbox from "../../../components/admin/field/field.checkbox.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FieldDate from "../../../components/admin/field/field.date.component";
import { AdminIcons } from "../../../components/svgs";

const AdminNewsPage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const DOMPurify = createDOMPurify(window);
    const { register, handleSubmit, reset, control, setValue, getValues } = useForm();

    const store = useNewsStore();

    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {
        await store.loadByID({ id });
    };

    React.useEffect(() => {
        reset();
        fetchData();
    }, [id]);

    const back = () => navigate("/admin/news");

    //Private component
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

            const onAdd = async (params) => {
                const data = getValues();

                let sendObject = { ...data };

                sendObject["previewImage"] = photoPreview;
                sendObject["reviewImage"] = photoReview;
                sendObject["images"] = photo;

                if (!checkForComplete(sendObject)) return;

                setSending(true);

                const result = await store.add(sendObject);

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
                        <form onSubmit={handleSubmit(onAdd)} className='admin-form'>
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
                                            label={"Название новости для анонса*"}
                                            required={true}
                                            placeholder={"Введите название"}
                                            {...register("previewTitle")}
                                        />
                                        <FieldText
                                            label={"Название новости*"}
                                            required={true}
                                            placeholder={"Введите название"}
                                            {...register("title")}
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
                                        onlyOneFile={true}
                                        multiFiles={false}
                                        onChange={(items) => setPhotoPreview(items)}
                                    />
                                    <h2 className='admin-form__title'>Детальная картинка</h2>
                                    <ImageSelector
                                        items={photoReview}
                                        onlyOneFile={true}
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

        const Edit = () => {
            const [photo, setPhoto] = React.useState([]);
            const [photoPreview, setPhotoPreview] = React.useState([]);
            const [photoReview, setPhotoReview] = React.useState([]);
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            React.useEffect(() => {
                if (edit) {
                    setValue("editorPreview", store.item.preview_text);
                    setValue("editorReview", store.item.text);

                    setPhotoPreview(
                        store.item.preview_image
                            ? [
                                  {
                                      ID: store.item.ID,
                                      url: store.item.preview_image,
                                      main: 1,
                                      order: 1,
                                      isFile: 1,
                                      isLoaded: 1,
                                  },
                              ]
                            : []
                    );

                    setPhotoReview(
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

                    setPhoto(store.item.images ? store.item.images : []);
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

            const onEdit = async (params) => {
                const data = getValues();

                let sendObject = { ...data };

                sendObject["id"] = id;
                sendObject["previewImage"] = photoPreview;
                sendObject["reviewImage"] = photoReview;
                sendObject["images"] = photo;

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

                                        const result = await store.remove(sendObject);

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

                const result = await store.removeFile(sendObject);
            };

            const handleDeletePreviewPhoto = async (item) => {
                let sendObject = { ...item };

                sendObject["place"] = "preview";
                sendObject["newsID"] = id;

                const result = await store.removeFile(sendObject);
            };

            const handleDeleteReviewPhoto = async (item) => {
                let sendObject = { ...item };

                sendObject["place"] = "review";
                sendObject["newsID"] = id;

                const result = await store.removeFile(sendObject);
            };

            if (id && edit) {
                return (
                    <>
                        <TitleBlock title={`Редактирование новости ID: ${id}`} onBack={back} />
                        <form onSubmit={handleSubmit(onEdit)} className='admin-form'>
                            <Tabs>
                                <Tab title={"Основная информация"}>
                                    <fieldset className='admin-form__section admin-form__section_width_one-col'>
                                        <FieldCheckbox
                                            label={"Доступна для показа?"}
                                            {...register("active", {
                                                value: store.item.active === "Активен",
                                            })}
                                        />
                                        <FieldCheckbox
                                            label={"Показывать на главной странице?"}
                                            {...register("mainPage", {
                                                value: store.item.show_on_main_page === "Активен",
                                            })}
                                        />
                                        <FieldDate
                                            label='Дата и время'
                                            type='datetime-local'
                                            required={true}
                                            {...register("date", {
                                                value: moment(store.item.date).format("YYYY-MM-DD HH:mm"),
                                            })}
                                        />
                                    </fieldset>
                                    <fieldset className='admin-form__section'>
                                        <FieldText
                                            label={"Название новости для анонса*"}
                                            required={true}
                                            placeholder={"Введите название"}
                                            {...register("previewTitle", {
                                                value: store.item.preview_title,
                                            })}
                                        />
                                        <FieldText
                                            label={"Название новости*"}
                                            required={true}
                                            placeholder={"Введите название"}
                                            {...register("title", {
                                                value: store.item.title,
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
                                        onlyOneFile={true}
                                        multiFiles={false}
                                        onChange={(items) => setPhotoPreview(items)}
                                        onDelete={handleDeletePreviewPhoto}
                                    />
                                    <h2 className='admin-form__title'>Детальная картинка</h2>
                                    <ImageSelector
                                        items={photoReview}
                                        onlyOneFile={true}
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
                        <TitleBlock title={`Новость ID: ${store.item.ID}`} onBack={back}>
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
                                                {store.item.active === "Активен" ? "Да" : "Нет"}
                                            </p>
                                        </li>
                                        <li className='admin-view-section__item'>
                                            <h3 className='admin-view-section__label'>
                                                Показывать на главной странице?
                                            </h3>
                                            <p className='admin-view-section__description'>
                                                {store.item.show_on_main_page === "Активен" ? "Да" : "Нет"}
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
                                                {store.item.preview_title}
                                            </p>
                                        </li>
                                        <li className='admin-view-section__item'>
                                            <h3 className='admin-view-section__label'>Название новости</h3>
                                            <p className='admin-view-section__description'>{store.item.title}</p>
                                        </li>
                                        <li className='admin-view-section__item'>
                                            <h3 className='admin-view-section__label'>Дата новости</h3>
                                            <p className='admin-view-section__description'>
                                                {moment(store.item.date).format("DD MMMM YYYY HH:mm")}
                                            </p>
                                        </li>
                                    </ul>
                                    <h2 className='admin-view-section__title'>Описание для анонса</h2>
                                    <div
                                        className='admin-view-section__editor'
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(store.item.preview_text),
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
                            </Tab>
                            <Tab title={"Фотографии"}>
                                <h2 className='admin-view-section__title'>Картинка для анонса</h2>
                                <ImageGallery
                                    items={[
                                        {
                                            url: store.item.preview_image,
                                        },
                                    ]}
                                    front={false}
                                />
                                <h2 className='admin-view-section__title'>Детальная картинка</h2>
                                <ImageGallery
                                    items={[
                                        {
                                            url: store.item.image,
                                        },
                                    ]}
                                    front={false}
                                />
                                <h2 className='admin-view-section__title'>Фото галерея</h2>
                                <ImageGallery items={store.item.images} front={false} />
                            </Tab>
                        </Tabs>
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

export default AdminNewsPage;
